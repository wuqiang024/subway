<style scoped>
.table-bordered {
    border-collapse: collapse;
    margin-top: 10px;
}
.table-bordered td {
    border: 1px solid #eee;
    line-height: 48px;
    height: 48px;
    text-align: center;
}
</style>
<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" /> -->
      <el-select v-model="listQuery.importance" placeholder="事故线路" clearable style="width: 110px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="事故方向" clearable class="filter-item" style="width: 110px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="事故类型" clearable class="filter-item" style="width: 110px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="事故等级" clearable class="filter-item" style="width: 110px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>

      <el-row>
        <el-col :span="12" style="text-align: left;">
          事故信息
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-checkbox label="选择发送" name="type" />
        </el-col>
      </el-row>
      <table width="100%" class="table-bordered">
        <tbody>
          <tr>
            <td>事故时间</td>
            <td>2019-08-19 09:30:30</td>
            <td>事故线路</td>
            <td>1号线</td>
            <td>事故方向</td>
            <td>上下行</td>
          </tr>
          <tr>
            <td>事故类型</td>
            <td>运营类，道岔故障</td>
            <td>事故等级</td>
            <td>II 级</td>
            <td>事故区间</td>
            <td>农讲所</td>
          </tr>
          <tr>
            <td>处理措施</td>
            <td>封闭站点</td>
            <td>中断时长</td>
            <td>1小时</td>
            <td />
            <td />
          </tr>
        </tbody>
      </table>

      <el-row style="margin-top: 20px">
        <el-col :span="12" style="text-align: left;">
          行车方案
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-checkbox label="选择发送" name="type" />
        </el-col>
      </el-row>
      <el-table
        :data="tableData2"
        border
        fit
        highlight-current-row
        style="width: 100%; margin-top: 10px"
      >
        <el-table-column
          prop="address"
          label="行车区间"
          width="180"
        />
        <el-table-column
          prop="type"
          label="区间类型"
          width="180"
        />
        <el-table-column
          prop="back"
          label="折返站点"
        />
        <el-table-column
          prop="programme"
          label="行车方案"
        />
      </el-table>

      <el-row style="margin-top: 20px">
        <el-col :span="12" style="text-align: left;">
          客流分析
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-checkbox label="选择发送" name="type" />
        </el-col>
      </el-row>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        border
        fit
        highlight-current-row
        style="width: 100%;margin:15px auto"
        @sort-change="sortChange"
      >
        <el-table-column label="下行\上行" prop="from" align="center" width="120" />
        <template v-for="v in platforms">
          <el-table-column :label="v" width="120px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row[v] || '--' }}</span>
            </template>
          </el-table-column>
        </template>
      </el-table>

      <el-row style="margin-top: 20px">
        <el-col :span="12" style="text-align: left;">
          接驳方案
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-checkbox label="选择发送" name="type" />
        </el-col>
      </el-row>
      <el-table
        :data="tableData2"
        border
        fit
        highlight-current-row
        style="width: 100%; margin-top: 10px"
      >
        <el-table-column
          prop="address"
          label="行车区间"
          width="180"
        />
        <el-table-column
          prop="type"
          label="区间类型"
          width="180"
        />
        <el-table-column
          prop="back"
          label="折返站点"
        />
        <el-table-column
          prop="programme"
          label="行车方案"
        />
      </el-table>

      <el-row style="margin-top: 20px">
        <el-col :span="12" style="text-align: left;">
          用车最少
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-checkbox label="选择发送" name="type" />
        </el-col>
      </el-row>

      <el-row style="margin-top: 20px">
        <el-col :span="12" style="text-align: left;">
          仿真评估
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-checkbox label="选择发送" name="type" />
        </el-col>
      </el-row>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        border
        fit
        highlight-current-row
        style="width: 100%;margin:15px auto"
        @sort-change="sortChange"
      >
        <el-table-column label="下行\上行" prop="from" align="center" width="120" />
        <template v-for="v in platforms">
          <el-table-column :label="v" width="120px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row[v] || '--' }}</span>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>

  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import tabPane from './components/TabPane'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

const tableData = [{
  from: '西门口',
  '西门口': 0,
  '公园前': 23,
  '农讲所': 29,
  '烈士陵园': 39,
  '东山口': 53
}, {
  from: '公园前',
  '西门口': 20,
  '公园前': 0,
  '农讲所': 32,
  '烈士陵园': 35,
  '东山口': 68
}, {
  from: '农讲所',
  '西门口': 0,
  '公园前': 23,
  '农讲所': 29,
  '烈士陵园': 39,
  '东山口': 53
}, {
  from: '烈士陵园',
  '西门口': 0,
  '公园前': 23,
  '农讲所': 29,
  '烈士陵园': 39,
  '东山口': 53
}, {
  from: '东山口',
  '西门口': 0,
  '公园前': 23,
  '农讲所': 29,
  '烈士陵园': 39,
  '东山口': 53
}
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { tabPane },
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
  data() {
    return {
      tableKey: 0,
      list: null,
      tableData: tableData,
      total: 0,
      listLoading: true,
      tableData2: [{
        address: '西塱至西门口',
        type: '非故障',
        back: '西门口',
        programme: '小交路'
      }, {
        address: '西塱至西门口',
        type: '非故障',
        back: '西门口',
        programme: '小交路'
      }, {
        address: '西塱至西门口',
        type: '非故障',
        back: '西门口',
        programme: '小交路'
      }
      ],
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
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
      activeName: 'CN',
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  computed: {
    platforms() {
      const arr = []
      if (this.tableData && this.tableData.length > 0) {
        this.tableData.forEach(v => {
          arr.push(v.from)
        })
      }
      return arr
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    this.getList()
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
