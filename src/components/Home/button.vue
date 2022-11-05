<template>
    <button>
        <span>{{ content }}</span>
    </button>
</template>

<script>
export default {
    name: 'btn',
    props: {
        content: String
    }
};

</script>

<style scoped lang="less">
button {
    position: relative;
    width: 130px;
    height: 45px;
    text-align: center;
    border-radius: 8px;
    cursor: pointer;
    letter-spacing: 3px;
    font-size: 17px;
    outline: none;
    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.04);
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.06);
    background-color: white;
    color: gray;
    border: 1px solid gray;

    &:hover {
        border: 2px solid #3284cf;
    }

    &:hover span {
        color: #3284cf;
    }

}
</style>