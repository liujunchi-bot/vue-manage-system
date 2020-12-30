<template>
  <div class="common-table">
    <el-table :data="tableData" height="90%" stripe v-loading="config.loading">
      <el-table-column
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <!-- <el-table-column label="序号" width="85">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            (config.page - 1) * 20 + scope.$index + 1
          }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px"  v-if="!item.type && scope.row[item.prop] != 'null'">{{ scope.row[item.prop] }}</span>
          <span style="margin-left: 10px"  v-if="!item.type && scope.row[item.prop] == 'null'">-</span>
          <span
            style="margin-left: 10px"
            v-if="
              item.prop === 'project_state' && scope.row['if_submit'] === '0'
            "
            >待提交</span
          >
          <span
            style="margin-left: 10px"
            v-if="
              item.prop === 'project_state' &&
              scope.row['if_submit'] === '1' &&
              scope.row['if_issued'] === '0'
            "
            >待审核</span
          >
          <span
            style="margin-left: 10px"
            v-if="
              item.prop === 'project_state' &&
              scope.row['if_issued'] === '1' &&
              scope.row['if_submit'] === '1'
            "
            >已审核</span
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="360" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
          <el-button size="mini" type="primary" @click="handleSubmit(scope.row)"
            >提交</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePage"
      :page-size="20"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object
  },
  methods: {
    handleEdit (row) {
      this.$emit('edit', row)
    },
    handleDelete (row) {
      this.$emit('del', row)
    },
    changePage (page) {
      this.$emit('changePage', page)
    },
    handleSubmit (row) {

      this.$emit('sub', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.common-table {
  height: calc(100% - 62px);
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>
