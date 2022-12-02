<template>
    <ul class="container" ref="container">
        <li class="first">
            <div>
                <span>文件名称</span>
                <span>最近修改时间</span>
                <span>文件类型</span>
            </div>
        </li>
        <li v-for="(item, index) in files" :key="item.id">
            <div>
                <p class="iconfont fileP" @mousedown.self="setMenu($event, item, index)"
                    @dblclick.prevent="getNextFile(item.id)">
                    <img :src="item.children ? require('@/assets/images/folder.png')
                    : require('@/assets/images/md.png')" alt="">
                    <span>
                        {{ " " + item.name }}
                    </span>
                </p>
                <p>{{ item.time }}</p>
                <p>{{ item.children ? '文件夹' : '文件' }}</p>
            </div>
        </li>
        <menuList :operate="operate" :to="container" class="menuList" v-show="isShow"
            :style="{ top: `${point.y}px`, left: `${point.x}px` }" @click="selectItem($event)">
        </menuList>
    </ul>
</template>

<script>
import { onMounted, ref, watchEffect, getCurrentInstance, watch, reactive, onBeforeUnmount, nextTick } from 'vue';
import { getNext, newFolder, deleteFile, updateFolderName } from '@/api/fileService';
import userStore from '@/store/userStore';
import menuList from '@/components/menu.vue'
import { searchFolder } from '@/utils/search';
import { toRaw } from '@vue/reactivity'
export default {
    name: 'perFile',
    components: {
        menuList
    },
    setup() {
        const { proxy } = getCurrentInstance();
        const uStore = userStore();
        let files = ref([]);
        let point = reactive({
            x: 0,
            y: 0
        });
        let isShow = ref(false);
        const container = ref();
        onMounted(async () => {
            const temp = toRaw(uStore.getFolderList[0]);
            if (temp?.length === 0) {
                const { data: { folderList } } = await getNext(uStore.getUser.userId);
                files.value = folderList;
                uStore.setFolderList(folderList);
            }
            // watchEffect(() => files.value = uStore.getFolderList);
            // 针对新建的情况
            watch(() => [uStore.folderList, uStore.articleList], newValue => {
                // files.value = newValue;
            }, { deep: true })

            container.value.oncontextmenu = e => e.button === 2 ? e.preventDefault() : null;
            container.value.onmousedown = e => {
                if (e.button === 2) {
                    isShow.value = true;
                    point.x = e.offsetX;
                    point.y = e.offsetY;
                } else {
                    isShow.value = false;
                }
            }
        })
        // usePoint(container.value);
        // 针对关键词,上下级查找的情况
        const updateFolder = () => {
            proxy.$bus.on('updateFolder', newFolder => {
                files.value = newFolder;
                proxy.$bus.off('updateFolder');
            })
        }

        const getNextFile = async folderId => {
            const { data: folderList } = await getNext(folderId);
            // files.value = nextFile;
        }
        const setMenu = (e, item, i) => {
            // 文件夹有children属性,children属性为空时就是空文件夹
            // && item.children
            if (e.button === 2) {
                e.target.oncontextmenu = ev => ev.preventDefault();
                const allP = document.querySelectorAll('.fileP');
                allP.forEach((ele, index) => {
                    ele.children[2].classList.contains('show') ?
                        ele.children[2].classList.remove('show') : null;
                    index === i ? ele.children[2].classList.add('show') : null;
                })
            }
            const body = document.querySelector('body');
            body.onclick = () => e.target.children[2].classList.remove('show');
        }

        const newFile = id => {
            proxy.$bus.emit('setDisposition', {
                isShow: true,
                title: '新建文件',
                input: true,
                placeHolder: '请输入文件名',
                type: 'file'
            })
            proxy.$bus.on('inputContent', async ({ type, value }) => {
                if (type === 'file') {
                    const { message, data } = await newFolder({
                        folderId: id,
                        folderName: value,
                    })
                    const { folderId } = JSON.parse(data);
                    // 不知道这种方法有没有触发更新且持久化呢
                    searchFolder(id, uStore.getFolderList, {
                        id: folderId,
                        name: value,
                        time: new Date().toLocaleTimeString()
                    });
                    proxy.$bus.success(message);
                }
            })
        }

        const newFolders = id => {
            proxy.$bus.emit('setDisposition', {
                isShow: true,
                title: '新建文件夹',
                input: true,
                placeHolder: '请输入文件夹名称',
                type: 'folder'
            })
            proxy.$bus.on('inputContent', async ({ type, value }) => {
                if (type === 'folder') {
                    const { message, data } = await newFolder({
                        fatherFolderId: id,
                        folderName: value,
                    })
                    const { folderId } = JSON.parse(data);
                    searchFolder(id, uStore.getFolderList, {
                        id: folderId,
                        name: value,
                        time: new Date().toLocaleTimeString(),
                        children: []
                    });
                    proxy.$bus.success(message);
                }
            })
        }

        const resetName = id => {
            proxy.$bus.emit('setDisposition', {
                isShow: true,
                title: '重命名',
                input: true,
                placeHolder: '请输入新名称',
                type: 'resetName'
            })
            proxy.$bus.on('inputContent', async ({ value, type }) => {
                if (type === 'resetName') {
                    const res = await updateFolderName({
                        folderId: id,
                        folderName: value,
                    })
                    console.log(res);
                }
            })
        }

        const deleteFolder = async () => {
            const res = await deleteFile();
            console.log(res);
        }

        const saveTo = () => alert('敬请期待');

        const selectItem = async (e, id) => {
            switch (parseInt(e.target.getAttribute('num'))) {
                case 0:
                    newFile(id); break;
                case 1:
                    newFolders(id); break;
                case 2:
                    resetName(id); break;
                case 3:
                    deleteFolder(); break;
                case 4:
                    saveTo();
            }
        }
        const operate = [
            { name: '新建文件' },
            { name: '新建文件夹' },
            { name: '重命名' },
            { name: "删除" },
            { name: "另存为" }
        ];
        return {
            files,
            operate,
            container,
            point,
            isShow,
            setMenu,
            getNextFile,
            newFile,
            newFolders,
            resetName,
            saveTo,
            deleteFolder,
            selectItem
        }
    }
}
</script>
<style lang="less" scoped>
ul {
    width: 100%;
    height: 100%;
    display: grid;
    padding: 20px 0px;
    position: relative;

    li {
        width: inherit;
        height: 50px;

        div {
            width: inherit;
            display: flex;
            justify-content: center;

            span,
            p {
                display: inline-flex;
                width: 30%;
                font-size: 15px;
                letter-spacing: 1px;
                text-align: center;
                position: relative;
                justify-content: center;

                &:nth-child(1) {
                    width: 40%;
                    cursor: default;
                    user-select: none;
                    position: relative;
                    text-align: left;
                }

                img {
                    width: 25px;
                }
            }
        }
    }
}

.menuList {
    width: 120px;
    height: 200px;
    position: absolute;
    padding: 0 !important;
    border-radius: 8px;
    overflow: hidden;
    transition: all .4s;
    z-index: 999999;
}

.show {
    display: block !important;
}
</style>