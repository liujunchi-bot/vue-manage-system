<template>
  <div class="contract-table2">
    <el-table :data="tableData" height="650px" stripe v-loading="config.loading">
      <el-table-column label="序号" width="85">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ (config.page - 1) * 20 + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop" :label="item.label" :width="item.width ? item.width : 125">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="220">
        <template slot-scope="scope">
          <el-button size="mini" @click="handlePass()">通过</el-button>
          <el-button size="mini" @click="handleRefuse(scope.row)">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pager" layout="prev, pager, next" :total="config.total" :current-page.sync="config.page" @current-change="changePage" :page-size="20">
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
      handleEdit(row) {
        this.$emit('edit', row)
      },
      handleDownload(){
        this.$emit('download')
      },
      handleDelete(row) {
        this.$emit('del', row)
      },
      changePage(page) {
        this.$emit('changePage', page)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .contract-table {
    height: 690px;
    background-color: #fff;
    position: relative;
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
</style>
