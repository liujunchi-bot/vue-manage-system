<template>
  <div>
    <el-dialog
      title="新增"
      v-bind="$attrs"
      v-on="$listeners"
      @open="onOpen"
      @close="onClose"
    >
      <el-row :gutter="15">
        <el-form
          ref="ApplicationForm"
          :model="formData"
          :rules="rules"
          size="medium"
          label-width="100px"
        >
          <el-col :span="12">
            <el-form-item label="投标编号" prop="id">
              <el-input
                v-model="formData.id"
                placeholder="自动编码"
                :disabled="true"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投标时间" prop="tender_date">
              <el-date-picker
                v-model="formData.tender_date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :style="{ width: '100%' }"
                placeholder="请输入投标时间"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="project_name">
              <el-input
                v-model="formData.project_name"
                placeholder="请输入项目名称"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投标类型" prop="audit_type">
              <el-input
                v-model="formData.audit_type"
                placeholder=""
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标段" prop="tender_block">
              <el-input
                v-model="formData.tender_block"
                placeholder=""
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投标报价" prop="tender_offer" :rules="rules">
              <el-input
                v-model="formData.tender_offer"
                placeholder="请输入投标报价"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="标段预估金额(含税)(万元)"
              prop="tender_block_sum"
            >
              <el-input
                v-model="formData.tender_block_sum"
                placeholder="标段预估金额(含税)(万元)"
                controls-position="right"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="中标份额" prop="tender_share">
              <el-input
                v-model="formData.tender_share"
                placeholder="请输入中标份额"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否中标" prop="tender_flag">
              <el-radio-group v-model="formData.tender_flag" size="medium">
                <el-radio
                  v-for="(item, index) in tender_flagOptions"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled"
                  >{{ item.label }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="中标合同上限(含税)" prop="tender_ceiling">
              <el-input
                v-model="formData.tender_ceiling"
                placeholder="请输入中标合同上限(含税)"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="中标折扣" prop="tender_discount">
              <el-input
                v-model="formData.tender_discount"
                placeholder="请输入中标折扣"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经办人" prop="jing_ban_ren">
              <el-input
                v-model="formData.jing_ban_ren"
                :disabled="true"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核人" prop="shen_he_ren">
              <el-input
                v-model="formData.shen_he_ren"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="招标联系人" prop="tender_contact">
              <el-input
                v-model="formData.tender_contact"
                placeholder="请输入招标联系人"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招标联系人电话" prop="tender_contact_phone">
              <el-input
                v-model="formData.tender_contact_phone"
                placeholder="请输入招标联系人电话"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招标机构联系人" prop="tender_agency_contact">
              <el-input
                v-model="formData.tender_agency_contact"
                placeholder="请输入招标机构联系人"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="招标代理机构联系人电话"
              prop="tender_agency_contact_phone"
            >
              <el-input
                v-model="formData.tender_agency_contact_phone"
                placeholder="请输入招标代理机构联系人电话"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招标具体类别" prop="tender_specific_type">
              <el-select
                v-model="formData.tender_specific_type"
                placeholder="请选择招标具体类别"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in tender_specific_typeOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账户" prop="tender_account">
              <el-input
                v-model="formData.tender_account"
                placeholder="请输入账户"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户行" prop="bank_deposit">
              <el-input
                v-model="formData.bank_deposit"
                placeholder="请输入开户行"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">保存</el-button>
        <el-button type="primary" @click="handelSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {
  name: "addForm",
  inheritAttrs: false,
  components: {},
  props: {
    Submit: Function,
    current_role: String,
  },
  data() {
    var isLessTenDigits = (rule, value, callback) => {
      setTimeout(() => {
        if (!value) {
          return callback();
        }
        if (!Number(value)) {
          callback(new Error('请输入正数(无需+号)'));
        } else {
          const re = /^\d{0,1}(\d{0,9})\.{0,1}(\d*)?$/;
          const rsCheck = re.test(value);
          if (!rsCheck) {
            callback(new Error('小数点前最多10位数字(无需+号)'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var isLessOneDigits = (rule, value, callback) => {
      setTimeout(() => {
        if (!value) {
          return callback();
        }
        if (!Number(value)) {
          callback(new Error('请输入正数(无需+号)'));
        } else 
        if(value > 1.0){
          callback(new Error('请输入小于1的正数(无需+号)'));
        }else{
          const re = /^\d{0,1}(\d{0,1})\.{0,1}(\d*)?$/;
          const rsCheck = re.test(value);
          if (!rsCheck) {
            callback(new Error('小数点前最多1位数字'));
          } else {
            callback();
          }
        }
      }, 1000);
    };

    return {
      formData: {
        id: undefined,
        tender_date: undefined,
        project_name: undefined,
        audit_type: undefined,
        tender_block: undefined,
        tender_offer: undefined,
        tender_block_sum: undefined,
        tender_share: undefined,
        tender_flag: undefined,
        tender_ceiling: undefined,
        tender_discount: undefined,
        jing_ban_ren: undefined,
        shen_he_ren: undefined,

        tender_contact: undefined,
        tender_contact_phone: undefined,
        tender_agency_contact: undefined,
        tender_agency_contact_phone: undefined,
        tender_specific_type: undefined,
        tender_account: undefined,
        bank_deposit: undefined,
      },
      rules: {
        id: [],
        tender_date: [
          {
            required: true,
            message: "请输入投标时间",
            trigger: "blur",
          },
        ],
        project_name: [
          {
            required: true,
            message: "请输入项目名称",
            trigger: "blur",
          },
          { min: 4, max: 255, message: '项目名称长度需要在 4 到 255 个字符', trigger: 'blur' }
        ],
        audit_type:[
          { max: 255, message: '投标类型长度最高255 个字符', trigger: 'blur' }
        ],
        tender_block: [
          { max: 255, message: '标段长度最高255 个字符', trigger: 'blur' }
        ],
        tender_offer: [
          { max: 255, message: '投标报价最高255 个字符', trigger: 'blur' }
        ],
        tender_block_sum: [
          { validator: isLessTenDigits, trigger: 'blur' }
        ],
        tender_share: [
          { validator: isLessOneDigits, trigger: 'blur' }
        ],
        tender_flag: [],
        tender_ceiling: [],
        tender_discount: [
          { validator: isLessOneDigits, trigger: 'blur' }
        ],
        jing_ban_ren: [],
        shen_he_ren: [
          {
            required: true,
            message: "请输入审核人",
            trigger: "blur",
          },
        ],
      },
      tender_contact: [],
      tender_contact_phone: [],
      tender_agency_contact: [],
      tender_agency_contact_phone: [],
      tender_specific_type: [],
      tender_account: [],
      bank_deposit: [],

      tender_flagOptions: [
        {
          label: "是",
          value: "是",
        },
        {
          label: "否",
          value: "否",
        },
      ],
      tender_specific_typeOptions: [
        {
          label: "金融资产评估",
          value: "金融资产评估",
        },
        {
          label: "单项资产评估",
          value: "单项资产评估",
        },
        {
          label: "无形资产评估",
          value: "无形资产评估",
        },
        {
          label: "房地产评估",
          value: "房地产评估",
        },
        {
          label: "企业价值评估",
          value: "企业价值评估",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {
      this.formData.jing_ban_ren = this.current_role;
    },
    onClose() {
      this.$refs["ApplicationForm"].resetFields();
    },
    close() {
      this.$emit("update:visible", false);
    },
    handelConfirm() {
      this.$refs["ApplicationForm"].validate((valid) => {
        if (!valid) return;
        if (confirm("确定保存吗？")) {
          let data = {
            id: undefined,
            tender_date: undefined,
            project_name: undefined,
            audit_type: undefined,
            tender_block: undefined,
            tender_offer: undefined,
            tender_block_sum: undefined,
            tender_share: undefined,
            tender_flag: undefined,
            tender_ceiling: undefined,
            tender_discount: undefined,
            jing_ban_ren: this.current_role,
            shen_he_ren: undefined,

            tender_contact: undefined,
            tender_contact_phone: undefined,
            tender_agency_contact: undefined,
            tender_agency_contact_phone: undefined,
            tender_specific_type: undefined,
            tender_account: undefined,
            bank_deposit: undefined,
          };
          for (var key in this.formData) {
            data[key] = this.formData[key];
          }
          // console.log(data)
          this.$emit("addData", data);
          // this.$message.success("保存成功");
        }
      });
    },
    handelSubmit() {
      this.$refs["ApplicationForm"].validate((valid) => {
        if (!valid) return;
        if (confirm("确定提交吗？")) {
          let data = {
            id: undefined,
            tender_date: undefined,
            project_name: undefined,
            audit_type: undefined,
            tender_block: undefined,
            tender_offer: undefined,
            tender_block_sum: undefined,
            tender_share: undefined,
            tender_flag: undefined,
            tender_ceiling: undefined,
            tender_discount: undefined,
            jing_ban_ren: undefined,
            shen_he_ren: undefined,

            tender_contact: undefined,
            tender_contact_phone: undefined,
            tender_agency_contact: undefined,
            tender_agency_contact_phone: undefined,
            tender_specific_type: undefined,
            tender_account: undefined,
            bank_deposit: undefined,
          };
          for (var key in this.formData) {
            data[key] = this.formData[key];
          }
          // console.log('editData',data)
          this.Submit(data);
          // this.close();
          // this.$message.success("提交成功");
        }
      });
    },
  },
};
</script>
<style>
</style>
