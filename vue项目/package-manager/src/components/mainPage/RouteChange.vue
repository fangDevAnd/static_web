<template>

  <div style="width: 100%">

    <el-button type="info" style="margin: 5px" @click="addProject" icon="el-icon-plus">添加</el-button>


    <el-table
      :data="projectList"
      style="width: 100%">
      <el-table-column
        prop="createTime"
        label="创建日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="proName"
        label="项目名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mainUrl"
        label="项目主路径">
      </el-table-column>
      <el-table-column
        prop="descri"
        label="描述说明">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button @click="publishVersionClick(scope.row)" type="text" size="small">发行版本</el-button>
          <el-button @click="editPro(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <div class="block" align="right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="size"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>


    <!--
      编辑项目额弹窗
    -->
    <el-dialog
      title="编辑项目"
      :visible.sync="editDialogVisible"
      width="30%">
      <el-form ref="form" :model="edit" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="edit.proName"></el-input>
        </el-form-item>
        <el-form-item label="主路径">
          <el-input v-model="edit.mainUrl"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitEdit">确 定</el-button>
  </span>
    </el-dialog>


    <!--
      添加项目的弹窗
    -->
    <el-dialog
      title="编辑项目"
      :visible.sync="addDialogVisible"
      width="30%">
      <el-form ref="form" :model="add" label-width="80px">

        <el-form-item label="英文名称">
          <el-input v-model="add.engName"></el-input>
        </el-form-item>

        <el-form-item label="项目名称">
          <el-input v-model="add.proName"></el-input>
        </el-form-item>
        <el-form-item label="主路径">
          <el-input v-model="add.mainUrl"></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input type="textarea" v-model="add.descri"></el-input>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitAddPro">确 定</el-button>
  </span>
    </el-dialog>


  </div>


</template>

<script>

  import Axios from '../../util/Axios'

  export default {
    name: "RouteChange",

    methods: {


      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);

        this.page = val - 1;

        this.getAll();

      },


      publishVersionClick(row) {
        //路由到版本发布页面
      },

      editPro(row) {
        //编辑弹窗
        this.edit = {
          proName: row.proName,
          mainUrl: row.mainUrl
        };
        this.editDialogVisible = true;
      },

      submitEdit() {

        Axios.postReal("pro/update", "post", this.edit, resp => {

          if (resp.data.result > 0) {
            this.getAll();
          } else {
            this.$message(resp.data.msg);
          }

        });

      },


      del(row) {
        //弹窗删除

        this.$alert(`将会删除 ${row.proName} 项目`, '删除', {
          confirmButtonText: '确定',
          callback: action => {

            let delObj = {
              proName: row.proName,
            }

            Axios.postReal("pro/del", "post", delObj, resp => {
              if (resp.result >= 0) {
                this.getAll();
              }

            });

          }
        });


      },


      addProject() {

        this.addDialogVisible = true;

      },

      submitAddPro() {

        Axios.postReal("pro/add", "post", this.add, resp => {

          if (resp.result > 1) {
            this.addDialogVisible = false;
            this.getAll();
          }

        });


      },


      getAll() {
        Axios.getReal("pro/all", `page=${this.page}&size=${this.size}`, resp => {
          this.total = resp.data.total;
          this.projectList = resp.data.data;
        });


      }


    },
    data() {
      return {
        projectList: [],

        total: 0,
        size: 10,
        page: 0,

        edit: {},
        editDialogVisible: false,
        addDialogVisible: false,

        add: {}
      }
    },


    created() {

      this.getAll();

    }


  }
</script>

<style scoped>


</style>
