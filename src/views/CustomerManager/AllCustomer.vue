<template>
  <div>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="客户编号">
          <el-input v-model="editObject.client_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="editObject.client_name"></el-input>
        </el-form-item>
        <el-form-item label="客户地址">
          <el-input v-model="editObject.client_work_address"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人">
          <el-input v-model="editObject.client_representative"></el-input>
        </el-form-item>
        <el-form-item label="注册资本">
          <el-input v-model="editObject.client_registered_capital"></el-input>
        </el-form-item>
        <el-form-item label="公司类型">
          <el-input v-model="editObject.client_type"></el-input>
        </el-form-item>
        <el-form-item label="经营范围">
          <el-input v-model="editObject.client_business"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button @click="handleClickConfirm">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增" :visible.sync="dialogFormAddVisable">
      <el-form>
        <el-form-item label="客户编号">
          <el-input v-model="newObject.client_id"></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="newObject.client_name"></el-input>
        </el-form-item>
        <el-form-item label="客户地址">
          <el-input v-model="newObject.client_work_address"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人">
          <el-input v-model="newObject.client_representative"></el-input>
        </el-form-item>
        <el-form-item label="注册资本">
          <el-input v-model="newObject.client_registered_capital"></el-input>
        </el-form-item>
        <el-form-item label="公司类型">
          <el-input v-model="newObject.client_type"></el-input>
        </el-form-item>
        <el-form-item label="经营范围">
          <el-input v-model="newObject.client_business"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddVisable = false">取消</el-button>
        <el-button @click="handleClickConfirmAdd">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisibleShow">
      <el-form>
        <el-form-item label="客户编号">
          <el-input v-model="showObject.client_id"></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="showObject.client_name"></el-input>
        </el-form-item>
        <el-form-item label="客户地址">
          <el-input v-model="showObject.client_work_address"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人">
          <el-input v-model="showObject.client_representative"></el-input>
        </el-form-item>
        <el-form-item label="注册资本">
          <el-input v-model="showObject.client_registered_capital"></el-input>
        </el-form-item>
        <el-form-item label="公司类型">
          <el-input v-model="showObject.client_type"></el-input>
        </el-form-item>
        <el-form-item label="经营范围">
          <el-input v-model="showObject.client_business"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleShow = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-row>
      <el-col :span="2">
        <el-button type="primary" @click="dialogFormAddVisable = true"
          >新增客户</el-button
        >
      </el-col>
      <el-col :span="5">
        <!-- <el-input placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input> -->
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="state"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        >
          <i class="el-icon-edit el-input__icon" slot="suffix"> </i>
          <template slot-scope="{ item }">
            <div class="name items-container">{{ item.client_name }}</div>
            <!-- <span class="addr">{{ item.address }}</span> -->
          </template>
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <!-- @selection-change="handleSelectionChange" -->
      <!-- <el-table-column type="selection" width="150"> </el-table-column> -->
      <el-table-column
        prop="client_id"
        label="客户编号"
        :rules="rules"
        width="220"
      >
      </el-table-column>
      <el-table-column
        prop="client_name"
        label="客户名称"
        :rules="rules"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="client_work_address"
        label="客户地址"
        :rules="rules"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="client_representative"
        label="法定代表人"
        :rules="rules"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="client_registered_capital"
        label="注册资本"
        :rules="rules"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="client_type"
        label="公司类型"
        :rules="rules"
        width="180"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.row)" type="text" size="small"
            >删除</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="handleClickChange(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      state: "",
      tableData: [
        /* {
          client_id: "914301007700936299",
          client_name: "长沙市国有资产置业有限公司",
          client_work_address: "长沙市开福区浏阳河路412号",
          client_representative: "张阳",
          client_registered_capital: "20,000.00万元",
          client_type: "有限责任公司(非自然人投资或控股的法人独资)",
          client_business:
          "经中国移动通信集团公司授权，按照经营许可证载明的内容经营基础电信业务、增值电信业务；移动通信、IP电话和互联网等网络的建设和投资（不得从事吸收存款、集资收款、受托贷款、发行票据、发放贷款等国家金融监管及财政信用业务）；移动通信、IP电话和互联网等网络工程勘察、设计、安装、工程施工和维修；经营与移动通信、IP电话和互联网业务相关的系统集成、漫游结算清算、技术开发、技术服务、设备销售等；出售、出租移动电话终端设备、IP电话设备、互联网设备及其备件，并提供售后服务；广告设计、制作及户外广告、自有媒体广告的发布，代理电视、广播、报刊及印刷品、礼品广告。（依法须经批准的项目，经相关部门批准后方可开展经营活动)"
        }, */
      ],
      rules: {
        client_id: [
          { required: true, message: '客户编号不能为空', trigger: 'blur' },
        ],
        client_name: [
          { retuqired: true, message: '客户名称不能为空', trigger: 'blur' },
        ],
        /*  client_registered_capital:[
           {pattern:/(^[\d]|^[1-9][\d]*)($|[\.][\d]{0,2}$)/,message:'请输入金额',trigger:'blur'},
         ], */
      },
      multipleSelection: [],
      dialogFormVisible: false,
      dialogFormAddVisable: false,
      dialogFormVisibleShow: false,
      editObject: {},
      newObject: {},
      showObject: {},
    };
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      let params = {

      };
      let url = 'http://8.129.86.121:8080/readAllClient'
      this.$axios
        .post(url, qs.stringify(params))
        .then(successResponse => {
          // alert('请求成功')
          this.tableData = successResponse.data
        })
        .catch(failResponse => {
          alert('请求失败')
        })
    },
    handleDelete (rowInfo) {
      this.tableData.forEach((item, index) => {
        if (item.client_id == rowInfo.client_id) {
          if (confirm("确定删除吗？")) {
            /* this.tableData.splice(index, 1);
            this.$message.success("删除成功");  */
            let params = {
              client_id: item.clidentid
            }
            let url = 'http://8.129.86.121:8080/client/delete'
            this.$axios
              .post(url, qs.stringify(params))
              .then(successResponse => {
                this.tableData.splice(index, 1);
                this.$message.success("删除成功");
              }).catch(() => {
                this.$message.success("删除失败");
              })
          }
        }
      });
    },
    handleClickChange (rowInfo) {
      this.tableData.forEach((item, index) => {
        if (item.client_id == rowInfo.client_id) {
          this.editObject = this.tableData[index];
          console.log(this.editObject);
        }
      });
      this.dialogFormVisible = true;
    },
    handleClickConfirm () {
      this.dialogFormVisible = false;
      if (confirm("确定修改吗？")) {
        this.tableData.forEach((item) => {
          if (item.client_id == this.editObject.client_id) {
            let params = {
              client_id: item.client_id,
              client_name: item.client_name,
              client_work_address: item.client_work_address,
              client_representative: item.client_representative,
              client_registered_capital: item.client_registered_capital,
              client_type: item.client_type,
              client_business: item.client_business
            };
            let url = "http://8.129.86.121:8080/client/update"
            this.$axios
              .post(url, qs.stringify(params))
              .then(successResponse => {
                item = this.editObject;
                alert('修改成功')
              })
              .catch(failResponse => {
                alert('修改失败')
              })
          }
        });
      }
    },
    handleClickConfirmAdd () {
      this.dialogFormAddVisable = false;
      if (confirm("确定新增吗？")) {
        let params = {
          client_id: this.newObject.client_id,
          client_name: this.newObject.client_name,
          client_work_address: this.newObject.client_work_address,
          client_representative: this.newObject.client_representative,
          client_registered_capital: this.newObject.client_registered_capital,
          client_type: this.newObject.client_type,
          client_business: this.newObject.client_business
        };
        let url = "http://8.129.86.121:8080/client/add"
        this.$axios
          .post(url, qs.stringify(params))
          .then(successResponse => {
            this.tableData.push(this.newObject);
            alert('新增成功')
          })
          .catch(failResponse => {
            alert('新增失败')
          })
      }
    },
    querySearch (queryString, cb) {
      let items = this.tableData;
      let results = queryString
        ? items.filter(this.createFilter(queryString))
        : items;
      cb(results);
    },
    createFilter (queryString) {
      return (item) => {
        return (
          item.client_name.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect (item) {
      this.showObject = item;
      console.log(this.showObject);
      this.dialogFormVisibleShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.items-container {
  width: 170px;
}
</style>