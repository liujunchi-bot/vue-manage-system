<template>
  <el-form :inline="inline" :model="fileForm" :rules="rules" label-width="145px" class="demo-ruleForm">
    <el-form-item
      v-for="item in formLabel"
      :prop="item.model"
      :key="item.model"
      :label="item.label"
    >
      <el-input
        v-model="fileForm[item.model]"
        :placeholder="'请输入' + item.label"
        v-if="!item.type"
      ></el-input>
      <el-select
        v-model="fileForm[item.model]"
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
        v-model="fileForm[item.model]"
        v-if="item.type === 'switch'"
      ></el-switch>
      <el-date-picker
        v-model="fileForm[item.model]"
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
    fileForm: Object,
    formLabel: Array,
    rules: Object,
  }
}
</script>

<style lang="scss" scoped></style>
