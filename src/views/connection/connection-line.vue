<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: 500px;
}
</style>
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.fileTypes" placeholder="文件类型" 
            clearable style="width: 180px; margin-bottom: 0" 
            class="filter-item">
            <el-option v-for="item in fileTypes" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.routes" placeholder="地铁线路" 
            clearable style="width: 150px; margin-bottom: 0" 
            class="filter-item">
            <el-option v-for="item in routes" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" style="margin-bottom: 2px">
        查找
      </el-button>
    </div>
    <div class="filter-container">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-select v-model="listQuery.dateTypes" placeholder="日期属性" 
            clearable style="width: 150px; margin-bottom: 0" 
            class="filter-item" multiple collapse-tags>
            <el-option v-for="item in dateTypes" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.festivalTypes" placeholder="节日属性" 
            clearable style="width: 150px; margin-bottom: 0" 
            class="filter-item" multiple collapse-tags>
            <el-option v-for="item in festivalTypes" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-time-select v-model="startTime" placeholder="起始时间" :picker-options="{ start: '00:00',step: '01:00',end: '24:00'}" />
      <el-time-select v-model="endTime" placeholder="结束时间" :picker-options="{ start: '00:00',step: '01:00',end: '24:00',minTime: startTime}" />
    </div>

    <el-row style="margin-top: 20px">
      <el-col :span="24" style="text-align: left;">
        接驳区间滞留客流
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
    <div class="chart-container">
      <BarChart height="100%" width="100%" />
    </div>
    <div style="width: 100%; height: 300px">
      <ArrowChart height="100%" width="100%" />
    </div>

    <el-row style="margin-top: 20px">
      <el-col :span="24" style="text-align: left;">
        站站之间公交出行时长(最大时长/最小时长)
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
  </div>
</template>
<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import { mixin } from '@/mixins'
import BarChart from '@/components/Charts/BarChart'
import ArrowChart from '@/components/Charts/ArrowChart'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
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
  components: { BarChart, ArrowChart },
  mixins: [mixin],
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      calendarTypeOptions,
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  watch: {
    'listQuery.orderBy': function(n, o) {
      this.listQuery.page = 1
      this.getList()
    }
  },
  created() {
    this.getList()
    this.getRoutes()
    this.getFileTypes()
    this.getDateTypes()
    this.getFestivalTypes()
    this.getDataTable()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      console.log(this.listQuery)
      this.getList()
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
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
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
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
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
