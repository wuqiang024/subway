<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: 500px;
}
</style>
<template>
  <div class="app-container">
    <div>
      <el-row>
        <el-col :span="24" style="text-align: left; margin-right: 10px" :lg="8">
          <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;" @row-click="handleClick">
            <el-table-column label="序号" prop="id" align="center" width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="事故时间" align="center">
              <template slot-scope="scope">
                <span style="white-space: nowrap;">{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="事故等级" align="center">
              <template slot-scope="scope">
                <svg-icon v-for="n in +scope.row.accidentLevel" :key="n" icon-class="star" class="meta-item__icon" />
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <span style="white-space: nowrap;">{{ scope.row.treatmentDescription }}</span>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" style="padding-top:0; padding-left:0; margin-top: 10px" @pagination="getAccidentList" />
        </el-col>
        <el-col :span="24" :lg="15">
          <!-- <div id="container" style="height: 484px" /> -->
          <div class="filter-container">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
            <el-select
              v-model="listQuery.accidentWeekday"
              placeholder="日期属性"
              clearable
              style="width: 150px; margin-bottom: 0"
              class="filter-item"
              collapse-tags
            >
              <el-option v-for="item in accidentWeekdays" :key="item.id" :label="item.name" :value="item.name" />
            </el-select>
            <el-select
              v-model="listQuery.accidentFestival"
              placeholder="节日属性"
              clearable
              style="width: 150px; margin-bottom: 0"
              class="filter-item"
              collapse-tags
            >
              <el-option v-for="item in accidentFestivals" :key="item.id" :label="item.name" :value="item.name" />
            </el-select>
          </div>
          <div class="filter-container">
            <el-time-select v-model="startTime" placeholder="起始时间" :picker-options="{ start: '00:00',step: '01:00',end: '24:00'}" />
            <el-time-select v-model="endTime" placeholder="结束时间" :picker-options="{ start: '00:00',step: '01:00',end: '24:00',minTime: startTime}" />
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom: 2px" @click="handleFilter">
              查找
            </el-button>
          </div>

          <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="OD客流估算" name="first" />
            <el-tab-pane label="历史同期客流" name="second" />
            <el-tab-pane label="断面客流估算" name="three" />
            <el-tab-pane label="OD客流比率估算" name="four" />
            <el-tab-pane label="列车时刻表" name="five" />
          </el-tabs>
        </el-col>
      </el-row>
    </div>
    <!-- <el-tabs v-model="connectLine" style="margin-top:15px;" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="站内滞留客流" name="first">
      </el-tab-pane>
      <el-tab-pane label="列车滞留客流" name="second">
      </el-tab-pane>
    </el-tabs> -->

    <!-- <el-tabs v-model="connectChart" style="margin-top:15px;" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="站台受影响客流" name="first">
      </el-tab-pane>
      <el-tab-pane label="列车受影响客流" name="second">
      </el-tab-pane>
    </el-tabs>
    <div class="chart-container" style="padding-top: 20px">
      <StackLine height="100%" width="100%" v-if="connectChart=='first'" />
      <StackChart height="100%" width="100%" v-if="connectChart=='second'" />
    </div> -->
  </div>
</template>
<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import { search } from '@/api/accident'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
// import StackChart from '@/components/Charts/StackChart'
// import StackLine from '@/components/Charts/StackLine'
import { mixin } from '@/mixins'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

// arr to obj, such as { CN : "China", US : "USA" }

export default {
  name: 'ComplexTable',
  directives: { waves },
  components: { Pagination },
  mixins: [mixin],
  data() {
    return {
      activeName: 'first',
      // connectLine: 'first',
      // connectChart: 'first',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      }
    }
  },
  watch: {
    'listQuery.orderBy': function(n, o) {
      this.listQuery.page = 1
      this.getAccidentList()
    }
  },
  created() {
    this.getAccidentList()
    this.getRoutes()
    this.getFileTypes()
    this.getAccidentWeekdays()
    this.getFestivals()
    this.getDataTable()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getAccidentList() {
      this.listLoading = true
      search(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.count

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      console.log(this.listQuery)
      this.getAccidentList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    }
  }
}

</script>
