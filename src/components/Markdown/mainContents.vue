<template>
  <div class="richText">
    <div class="filesArea">
      <filesManageVue :files="files"></filesManageVue>
    </div>
    <div class="mainEdiPlace">
      <div class="richText-left" ref="l" contentEditable="true"></div>
      <div class="richText-middle" ref="m"></div>
      <div class="richText-right" ref="r">
        <syntaxDes></syntaxDes>
      </div>
    </div>
  </div>
</template>

<script>
import syntaxDes from "./syntaxDes.vue";
import filesManageVue from "./filesManage.vue";
export default {
  name: "richText",
  components: { syntaxDes, filesManageVue },
  setup() {
    const files = [
      {
        id: 1,
        name: 'f1',
        children: [
          {
            id: 11,
            name: 'f11',
            children: [
              {
                id: 111,
                name: 'f111',
              }, {
                id: 112,
                name: 'f112'
              }
            ]
          },
          {
            id: 12,
            name: 'f12'
          }
        ]
      },
      {
        id: 2,
        name: 'f2',
        children: [
          {
            id: 21,
            name: 'f21',
            children: [
              {
                id: 211,
                name: 'f211',
              },
            ]
          }
        ]
      },
      {
        id: 3,
        name: 'f3',
        children: [
          {
            id: 31,
            name: 'f31'
          },
          {
            id: 32,
            name: 'f32'
          }
        ]
      }
    ]
    return {
      files
    }
  },
};
</script>

<style lang="less" scoped>
.richText {
  position: relative;
  width: 100%;
  height: calc(100vh - 160px);

  .filesArea {
    position: absolute;
    left: -20%;
    top: 0;
    width: 20%;
    height: 100%;
    background-color: #fff;
    transition: all 0.5s;
  }

  .mainEdiPlace {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0%;
    display: flex;
    transition: all 0.5s;

    .richText-left {
      height: 100%;
      width: 40%;
      font-size: 30px;
      outline: none;
      background: #eee;
      color: #555;
      padding: 20px;
      transition: all 0.5s;
    }

    .richText-middle {
      height: 100%;
      width: 40%;
      font-size: 30px;
      color: #555;
      border-right: 2px solid #eee;
      padding: 20px;
      transition: all 0.5s;
    }

    .richText-right {
      width: 20%;
      height: 100%;
      padding: 20px;
      transition: all 0.5s;
    }
  }
}
</style>