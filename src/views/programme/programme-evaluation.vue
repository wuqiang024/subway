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

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

const tableData = [{
  from: '西门口',
  to: {
    '西门口': 0,
    '公园前': 23,
    '农讲所': 29,
    '烈士陵园': 39,
    '东山口': 53
  }
}, {
  from: '公园前',
  to: {
    '西门口': 20,
    '公园前': 0,
    '农讲所': 32,
    '烈士陵园': 35,
    '东山口': 68
  }
}, {
  from: '农讲所',
  to: {
    '西门口': 0,
    '公园前': 23,
    '农讲所': 29,
    '烈士陵园': 39,
    '东山口': 53
  }
}, {
  from: '烈士陵园',
  to: {
    '西门口': 0,
    '公园前': 23,
    '农讲所': 29,
    '烈士陵园': 39,
    '东山口': 53
  }
}, {
  from: '东山口',
  to: {
    '西门口': 0,
    '公园前': 23,
    '农讲所': 29,
    '烈士陵园': 39,
    '东山口': 53
  }
}
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

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
  data() {
    return {
      list: null,
      tableData: tableData,
      listLoading: true,
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
      // return this.tableData;
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
  }
}
</script>
