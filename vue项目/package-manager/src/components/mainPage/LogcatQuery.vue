<template>
  <div class="rootContainer">
    <div>
      <span>项目名称</span>
      <el-select v-model="projectVal" placeholder="项目">
        <el-option
          v-for="item in projects"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>

      <!--
       手机型号
      -->
      <span>手机型号</span>
      <el-select v-model="phoneVal" placeholder="手机型号">
        <el-option
          v-for="item in phones"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>

      <!--
       android 版本
      -->
      <span>版本号码</span>
      <el-select v-model="versionVal" placeholder="版本号">
        <el-option
          v-for="item in versions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>

      <!--
      imei, 附加账号,
     -->
      <span>附加查询</span>
      <el-select v-model="additionKey" placeholder="附加查询">
        <el-option
          v-for="item in additionies"
          :key="item.val"
          :label="item.label"
          :value="item.val">
        </el-option>
      </el-select>
      <el-input v-model="additionVal" placeholder="附加内容"/>

      <br><br>

      <span class="demonstration">开始时间</span>
      <el-date-picker
        v-model="startTime"
        type="datetime"
        placeholder="选择开始时间">
      </el-date-picker>

      <span class="demonstration">结束时间</span>
      <el-date-picker
        v-model="endTime"
        type="datetime"
        placeholder="选择开始时间">
      </el-date-picker>

      <span class="demonstration">日志等级</span>
      <el-select v-model="levelVal" placeholder="日志等级">
        <el-option
          v-for="item in levels"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <!--      标记-->
      <span class="demonstration">日志标记</span>
      <el-input v-model="tagVal" placeholder="日志标记"></el-input>

      <el-button type="primary" @click="list">查询</el-button>
    </div>

    <br>
    <!--
    查询table
    -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="project"
        label="项目"
        width="180">
      </el-table-column>
      <el-table-column
        prop="imei"
        label="设备号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="additionNumber"
        width="180"
        label="客户端编号">
      </el-table-column>
      <el-table-column
        prop="createTime"
        width="200"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="levelInfo"
        label="日志级别">
      </el-table-column>

      <el-table-column
        prop="phone"
        width="160"
        label="手机型号">
      </el-table-column>


      <el-table-column
        prop="version"
        label="系统版本">
      </el-table-column>


      <el-table-column
        prop="brand"
        label="品牌">
      </el-table-column>

      <el-table-column
        prop="tag"
        width="160"
        label="日志标签">
      </el-table-column>

      <el-table-column
        prop="info"
        width="300"
        label="日志信息">
      </el-table-column>

    </el-table>

    <div class="block" align="right">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :page-size="size"
        :total="total">
      </el-pagination>
    </div>


  </div>
</template>

<script>
  import axios from "axios";
  import Urls from "../../util/Urls";

  export default {
    name: "LogcatQuery",

    data() {
      return {

        //配置参数
        size: 8,

        projects: [],
        versions: [],
        additionies: [{label: "设备号", val: "imei"}, {label: "cid账号", val: "additionNumber"}],


        levels: ['verbose', 'debug', 'info', 'warn', 'error'],
        phones: [],
        //变量
        projectVal: null,
        versionVal: null,
        additionKey: '设备号',
        additionVal: null,
        tagVal: null,
        levelVal: 'verbose',
        phoneVal: null,

        startTime: null,
        endTime: null,
        page: 0,


        //查询数据
        tableData: [],
        total: 0,
      }
    },

    created() {
      this.getLogcatOption();
      this.list();
    },

    methods: {

      //项目
      //版本
      //手机型号
      getLogcatOption() {
        axios.get(Urls.urlRoot + "logcat/option").then((res) => {
          this.projects = res.data.data.project;
          this.phones = res.data.data.phone;
          this.versions = res.data.data.version;
        })
      },

      list() {

        let param = {
          project: this.projectVal,
          size: this.size,
          page: this.page,
          version: this.versionVal,
          startTime: this.startTime,
          endTime: this.endTime,
          level: this.levelVal.substr(0, 1),
          tag: this.tagVal !== '' ? this.tagVal : null,
        };
        param[this.additionKey] = this.additionVal !== '' ? this.additionVal : null;


        axios.post(Urls.urlRoot + "logcat/list", param).then((res) => {
          console.log(res.data)
          this.total = res.data.total;
          let that = this;
          res.data.data.forEach((value, index) => {
            value.levelInfo = that.getLevel(value.level)
          });

          this.tableData = res.data.data;


        })
      },
      getLevel(val) {
        for (let i = 0; i < this.levels.length; i++) {
          if (this.levels[i].startsWith(val)) {
            return this.levels[i];
          }
        }
      },

      handleCurrentChange(val) {
        this.page = val - 1;
        this.list();
      }


    },


  }
</script>

<style scoped>

  >>> .el-input {
    width: 200px
  }

  >>> .el-input__inner {
    width: 200px;
  }


  .rootContainer {
    padding: 20px;
  }

</style>
