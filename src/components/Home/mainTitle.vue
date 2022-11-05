<template>
    <div class="titleBox">
        <p>WeShare</p>
        <p>多人协作编辑的共享文档</p>
    </div>
</template>

<script>
export default {
    name: 'mainTitle',
};

</script>

<style scoped lang="less">
.titleBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
        font-size: 30px;
        letter-spacing: 4px;
        padding: 8px;
    }
}
</style>