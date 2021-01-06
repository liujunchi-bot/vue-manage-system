<template>
  <el-form :inline="inline" :model="tenderForm" :rules="rules" label-width=20% class="demo-ruleForm">
    <el-form-item
      v-for="item in formLabel"
      :prop="item.model"
      :key="item.model"
      :label="item.label"
    >
      <template v-if="item.model==='tender_block_sum'">
        <el-input
          v-model="tenderForm[item.model]"
          :placeholder="'请输入' + item.label"
          v-if="!item.type"
        >
        <template slot="append">万元</template>
        </el-input>
      </template>
      <template v-else-if="item.model==='tender_offer'">
        <el-input
          v-model="tenderForm[item.model]"
          :placeholder="'请输入' + item.label"
          v-if="!item.type"
        >
        <template slot="append">万元</template>
        </el-input>
      </template>
      <template v-else-if="item.model==='tender_ceiling'">
        <el-input
          v-model="tenderForm[item.model]"
          :placeholder="'请输入' + item.label"
          v-if="!item.type"
        >
        <template slot="append">万元</template>
        </el-input>
      </template>
      <template v-else>
        <el-input
          v-model="tenderForm[item.model]"
          :placeholder="'请输入' + item.label"
          v-if="!item.type"
        ></el-input>
      </template>
      
      <el-select
        v-model="tenderForm[item.model]"
        placeholder="请选择"
        v-if="item.type === 'select'"
      >
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-switch
        v-model="tenderForm[item.model]"
        v-if="item.type === 'switch'"
      ></el-switch>
      <el-date-picker
        v-model="tenderForm[item.model]"
        type="date"
        placeholder="选择日期"
        v-if="item.type === 'date'"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    inline: Boolean,
    tenderForm: Object,
    formLabel: Array,
    rules: Object,
  },
};
</script>

<style lang="scss" scoped></style>
