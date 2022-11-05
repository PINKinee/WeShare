<template>
    <div class="header">
        <ul>
            <li>
                <img src="@/assets/images/share.png" alt="">
            </li>
            <li>
                <span>WeShare</span>
            </li>
        </ul>
        <div>
            <span>
                <img src="@/assets/images/tui.png" alt="" title="回到首页">
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'perHeader',
}

</script>

<style scoped lang="less">
.header {
    width: 100%;
    height: 15%;
    box-sizing: border-box;
    border-bottom: 1px solid gray;

    ul {
        float: left;

        li {
            float: left;

            img {
                width: 60px;
                margin: 12px 0px 0px 20px;
                cursor: pointer;
            }

            span {
                display: inline-block;
                font-size: 24px;
                margin: 32px 0px 0px 12px;
                font-style: italic;
                letter-spacing: 1px;
            }
        }
    }

    div {
        float: right;
        overflow: hidden;
        vertical-align: middle;

        span {
            display: inline-block;

            img {
                width: 40px;
                cursor: pointer;
                margin: 20px 25px 0px 0px;
            }
        }
    }
}
</style>