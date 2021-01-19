<template>

  <!--
    项目包的管理模块
  -->

  <div style="width: 100%">


    <el-row :gutter="20">
      <el-col :span="6" v-for="(project,index) in projects">
        <el-card class="box-card" shadow="hover">
          <div class="item-card" align="center" @click="getFileList(project)">
            <span>{{project}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>

</template>

<script>


  import axios from 'axios'
  import Urls from "../../util/Urls";

  export default {
    name: "ProjectPackage",

    data() {

      return {

        projects: [],
      }

    },


    methods: {

      all() {
        axios.get(Urls.urlRoot + "pm/list/dir", {}).then((res) => {
          this.projects = res.data.data;
        })
      },

      getFileList(project) {
        this.$router.push({path: "/pkgList", query: {proName: project}})
      },





    },

    created() {

      this.all();
    }


  }
</script>

<style scoped>


  .box-card {

    color: #fff;
    margin-top: 20px;
    size: 16px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-image: linear-gradient(#243949, #515777);
    opacity: 0.7;
  }

</style>
