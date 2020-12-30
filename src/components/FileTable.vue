<template>
  <div class="common-table">
    <el-table 
    :data="tableData.slice((this.config.currentPage-1)*this.config.pageSize,this.config.currentPage*this.config.pageSize)" 
    height="90%" 
    stripe v-loading="this.config.loading">
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
        :width="item.width ? item.width : 100"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px"  v-if="!item.type && scope.row[item.prop] != 'null'">{{ scope.row[item.prop] }}</span>
          <span style="margin-left: 10px"  v-if="!item.type && scope.row[item.prop] == 'null'">-</span>

          <span
            style="margin-left: 10px"
            v-if="item.prop === 'checker' && scope.row['shen_he_ren'] != 0"
          >
            {{ scope.row[item.prop] }}
          </span>

          <span
            style="margin-left: 10px"
            v-if="item.prop === 'checker' && scope.row['shen_he_ren'] === 0"
          >
            -
          </span>

          <a
            :href="scope.row[item.prop]"
            v-if="item.type === 'link' && scope.row[item.prop] != 'NULL'"
          >
            <el-button size="mini" type="primary">文件下载</el-button>
          </a>

          <el-button
            size="mini"
            type="info"
            v-if="item.type === 'link' && scope.row[item.prop] === 'NULL'"
            disabled
            >暂无文件</el-button
          >
        </template>
      </el-table-column>

      <el-table-column label="操作" min-width="80" fixed="right">
        <template slot-scope="scope">
          <div>
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)"
              v-if="scope.row['if_submit'] === '0'"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)"
              v-else-if="scope.row['if_issued'] === '1'"
              >编辑</el-button
            >
            <el-button size="mini" type="info" v-else disabled>编辑</el-button>
          </div>
          <div>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              v-if="scope.row['if_submit'] === '0'"
              >删除</el-button
            >
            <el-button size="mini" type="info" v-else disabled>删除</el-button>
          </div>
          <div>
            <el-button
              size="mini"
              type="success"
              @click="handleSubmit(scope.row)"
              v-if="scope.row['if_submit'] === '0'"
              >提交</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="handleSubmit(scope.row)"
              v-else-if="scope.row['if_issued'] === '1'"
              >提交</el-button
            >
            <el-button size="mini" type="info" v-else disabled>提交</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:10px;">
      <el-pagination
        class="pager"
        layout="total, sizes, prev, pager, next, jumper"
        :total="config.total"
        :current-page.sync="config.currentPage"
        @current-change="changePage"
        @size-change="changeSize"
        :page-size.sync="config.pageSize"
        :page-sizes="[5,10,20,40,100]"
      >
      </el-pagination>
    </div>
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
    handleSubmit (row) {
      this.$emit('submit', row)
    },
    changePage (page) {
      this.$emit('changePage', page)
    },
    changeSize(size){
      this.$emit('changeSize',size)
    }
  }
}
</script>

<style lang="scss" scoped>
.common-table {
  height: calc(100% - 30px);
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>
