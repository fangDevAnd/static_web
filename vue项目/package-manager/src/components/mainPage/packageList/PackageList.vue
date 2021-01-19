<template>
  <div style="width: 100%">


    <el-page-header style="margin: 5px" @back="$router.back(-1)" v-bind:content="selectProject">
    </el-page-header>

    <div style="margin-top: 20px" class="card-contain">
      <div class="item-file" v-for="file in selectProjectFile">

        <span style="margin-left: 20px">{{file}}</span>
        <div style="margin-right: 20px">
          <el-link :underline="false" type="normal" icon="el-icon-download" @click="download(file)">
            下载
          </el-link>
          <el-link :underline="false" type="normal" icon="el-icon-picture-outline"
                   @click="getQrCode(file)">生成二维码
          </el-link>
        </div>
      </div>
    </div>


    <!--
 弹出
 -->
    <el-dialog
      title="扫码下载"
      :visible.sync="dialogVisible"
      width="30%">

      <el-image :src="downSrcUrl" style="width: 200px;height: 200px"></el-image>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>


  </div>
</template>

<script>


  import axios from 'axios'
  import Urls from "../../../util/Urls";


  export default {
    name: "PackageList",

    data() {

      return {

        //选中的项目名称
        selectProject: "",
        /**
         * 选中的项目的项目文件列表
         */
        selectProjectFile: [],

        dialogVisible: false,
        downSrcUrl: "",
      }

    },

    methods: {

      getProjectFile() {
        axios.get(Urls.urlRoot + "pm/list/file?project=" + this.selectProject).then((res) => {
          this.selectProjectFile = res.data.data;
        })
      },


      download(url) {
        let path = this.selectProject + "/" + url;
        location.href = Urls.urlRoot + "pm/file/down" + "?path=" + path;
      },


      getQrCode(url) {
        let path = this.selectProject + "/" + url;
        this.downSrcUrl = Urls.urlRoot + "pm/qrimage" + "?url=" + path;
        this.dialogVisible = true;
      }

    },


    mounted() {
      this.selectProject = this.$route.query.proName;

      this.getProjectFile();
    }


  }
</script>

<style scoped>

  .item-file {
    display: flex;
    width: 400px;
    flex-direction: row;
    height: 100px;
    margin-left: 20px;
    border-bottom: 1px solid rgba(199, 199, 199, 0.14);
    border-radius: 5px;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
    background: rgb(84, 92, 100);
    opacity: 0.7;
    color: #fff;
  }

  .card-contain {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    padding-left: 20px;
    padding-right: 20px;
  }


</style>
