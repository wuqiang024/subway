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

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="序号" prop="id" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日期" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="事故线路" align="center">
        <template>
          <span>{{ '1号线' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="事故方向" align="center">
        <template slot-scope="scope">
          <span>{{ '上下行双向' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="事故类型" align="center">
        <template slot-scope="scope">
          <span>运营故障、信号</span>
        </template>
      </el-table-column>
      <el-table-column label="接驳车站" align="center">
        <template slot-scope="scope">
          <span>西门口、公园前、农讲所</span>
        </template>
      </el-table-column>
      <el-table-column label="行车调整方案" align="center">
        <template slot-scope="scope">
          <span>西门口至农讲所，公园前至农讲所，农讲所至广州东站小交路</span>
        </template>
      </el-table-column>
      <el-table-column label="接驳耗时" align="center">
        <template slot-scope="scope">
          <span>60分钟</span>
        </template>
      </el-table-column>
      <el-table-column label="接驳人数" align="center">
        <template slot-scope="scope">
          10000
        </template>
      </el-table-column>
      <el-table-column label="选择" align="center" width="80">
        <template slot-scope="scope">
          <el-checkbox label="" name="type" />
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" style="margin-top:0" />

    <div>
      <el-table
        :data="platformStatus"
        border
        fit
        style="margin:15px auto"
      >
        <el-table-column label="站点" prop="status" align="center" />
        <template v-for="v in platformArr">
          <el-table-column :label="v" align="center">
            <template slot-scope="scope" style="background: red">
              <span style="position: absolute; left:0; top: 0; bottom: 0; right: 0" :style="{'background':scope.row['platforms'][v]?'red':'#fff'}"></span>
              <!-- {{ v }} -->
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
    }
  },
  mixins: [mixin],
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
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
      downloadLoading: false,
      platformStatus: undefined,
      platformArr: []
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

    this.platformStatus = [{
      status: '非故障站',
      platforms: {
        '西陇': 1,
        '坑口': 1,
        '花地湾': 1,
        '芳村': 1,
        '黄沙': 1,
        '长寿路': 1,
        '烈士陵园': 1
      }
    },{
      status: '故障站',
      platforms: {
        '西门口': 1,
        '公园前': 1,
      }
    },{
      status: '折返站',
      platforms: {
        '陈家祠': 1,
        '农讲所': 1,
      }
    }]

    this.platformArr = ['西陇', '坑口', '花地湾', '芳村', '黄沙', '长寿路', '陈家祠', '西门口', '公园前', '农讲所', '烈士陵园'];
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.limit = 5
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
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
