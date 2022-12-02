<template>
    <div class="header">
        <ul>
            <li>
                <img src="@/assets/images/share.png" alt="" title="WeShare">
            </li>
            <li>
                <span>WeShare</span>
            </li>
        </ul>
        <input type="text" @change="search($event)">
        <div>
            <span @click="back">
                <img src="@/assets/images/back.png" alt="" title="返回上一级">
            </span>
            <span @click="chooseSortWay">
                <img src="@/assets/images/paixu.png" alt="" title="选择排序方式">
            </span>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance, watchEffect } from 'vue';
import { searchFile, newFolder } from '@/api/fileService';
import userStore from '@/store/userStore'
export default {
    name: 'perHeader',
    setup() {
        const { proxy } = getCurrentInstance();
        const uStore = userStore();
        const { user } = uStore;
        // const addFile = () => {
        //     proxy.$bus.emit('setDisposition', {
        //         isShow: true,
        //         title: '新建文件夹',
        //         input: true,
        //         placeHolder: '请输入文件夹名称',
        //         type: 'folder'
        //         // 出现的动画也可以加入配置
        //     })
        //     proxy.$bus.on('inputContent', async ({ value, type }) => {
        //         if (type == 'folder') {
        //             const { message, data } = await newFolder({
        //                 userId: userId,
        //                 folderName: value,
        //                 // 后端时间
        //             })
        //             // 返回一个folderId,这个需要自己拼凑
        //             const { folderId } = JSON.parse(data);
        //             // 这个是根目录，要展示在首页的
        //             uStore.setFolderList({
        //                 userId: uStore.getUser.userId,
        //                 folderId: folderId,
        //                 time: new Date().toLocaleString(),
        //                 name: value,
        //                 depth: 1,
        //                 children: []
        //             });
        //             proxy.$msg.success(message);
        //         }
        //         proxy.$bus.off('inputContent');
        //     })
        // }
        const search = async e => {
            const { data: { folderList } } = await searchFile(e.target.value);
            proxy.$bus.emit('updateFolder', folderList);
        }
        const back = () => {

        }

        const chooseSortWay = () => {

        }
        return {
            search,
            back,
            chooseSortWay
        }
    }
}

</script>

<style scoped lang="less">
.header {
    width: 100%;
    height: 15%;
    box-sizing: border-box;
    border-bottom: 1px solid gray;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ul {
        li {
            float: left;

            img {
                width: 60px;
                margin: 10px 0px 0px 20px;
                cursor: pointer;
            }

            span {
                display: inline-block;
                font-size: 24px;
                margin: 28px 0px 0px 12px;
                font-style: italic;
                letter-spacing: 1px;
            }
        }
    }

    input {
        width: 350px;
        height: 30px;
        border-radius: 10px;
        padding-left: 10px;
    }

    div {
        overflow: hidden;
        vertical-align: middle;

        span {
            display: inline-block;

            img {
                width: 40px;
                cursor: pointer;
                margin: 15px 30px 0px 0px;
            }
        }
    }
}
</style>