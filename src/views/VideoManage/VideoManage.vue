<template>
  <div>
    <el-row>
      <el-col :span="2">
        <el-button type="primary">上传</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary">下载</el-button>
      </el-col>
      <el-col :span="15">
        <el-button type="primary">删除</el-button>
      </el-col>
      <el-col :span="5">
        <el-input placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="150"> </el-table-column>
      <el-table-column prop="name" label="合同名称" width="220">
      </el-table-column>
      <el-table-column prop="address" label="合同编号" width="180">
      </el-table-column>
      <el-table-column prop="version" label="合同版本" width="180">
      </el-table-column>
      <el-table-column prop="project" label="所属项目" width="180">
      </el-table-column>
      <el-table-column prop="uploding" label="上传日期" width="180">
      </el-table-column>
      <el-table-column prop="update" label="更新日期" width="180">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="190">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {

  data () {
    return {
      tableData: [
        { name: '合同1', address: '001', version: '1', project: '项目1', uploding: '2020-11-11', update: '2020-11-11' },
        { name: '合同2', address: '002', version: '1', project: '项目1', uploding: '2020-11-01', update: '2020-11-03' },
        { name: '合同3', address: '003', version: '2', project: '项目2', uploding: '2020-11-03', update: '2020-11-05' },
        { name: '合同4', address: '004', version: '5', project: '项目1', uploding: '2020-02-03', update: '2020-04-01' }
      ],
      multipleSelection: []
    }
  }


}
</script>

<style lang="scss" scoped></style>
