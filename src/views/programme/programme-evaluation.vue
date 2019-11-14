<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.routes" placeholder="事故线路" 
            clearable style="width: 150px" 
            class="filter-item" multiple collapse-tags>
            <el-option v-for="item in routes" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.directions" multiple collapse-tags placeholder="事故方向" clearable class="filter-item" style="width: 150px">
        <el-option v-for="item in directions" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.accidentTypes" placeholder="事故类型" clearable class="filter-item" multiple collapse-tags style="width: 170px">
        <el-option v-for="item in accidentTypes" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.accidentLevels" placeholder="事故等级" clearable class="filter-item" multiple collapse-tags style="width: 150px">
        <el-option v-for="item in accidentLevels" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        开始仿真
      </el-button>
    </div>

    <el-row>
      <el-col :span="12" style="text-align: left;">
        <el-tag
          type="danger"
          effect="dark"
        >
          实时显示站点客流
        </el-tag>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <el-tag>仿真计时: 30.00</el-tag>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="margin:15px auto"
    >
      <el-table-column label="下行\上行" prop="from" align="center" />
      <template v-for="v in platforms">
        <el-table-column :label="v" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row['to'][v] || '--' }}</span>
            <!-- {{ v }} -->
          </template>
        </el-table-column>
      </template>

    </el-table>
    <el-row>
      <el-col :span="24" style="text-align: right;">
        <el-tag>仿真总计: 30.00</el-tag>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mixin } from '@/mixins'

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  mixins: [mixin],
  data() {
    return {
      list: null,
      listLoading: true,
    }
  },
  created() {
    this.getList()
    this.getRoutes()
    this.getDirections()
    this.getAccidentTypes()
    this.getAccidentLevels()
    this.getDataTable()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>
