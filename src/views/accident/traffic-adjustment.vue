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
          <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="自定义行车路线" name="first" />
            <el-tab-pane label="根据历史调整行车路线" name="second" />
          </el-tabs>
          <el-row style="margin-top: 20px">
            <el-col>
              <el-select
                v-model="listQuery.accidentWeekday"
                placeholder="请选择"
                clearable
                style="width: 150px; margin-bottom: 0"
                class="filter-item"
                collapse-tags
              >
                <el-option v-for="item in accidentWeekdays" :key="item.id" :label="item.name" :value="item.name" />
              </el-select>
              <span>至</span>
              <el-select
                v-model="listQuery.accidentWeekday"
                placeholder="请选择"
                clearable
                style="width: 150px; margin-bottom: 0"
                class="filter-item"
                collapse-tags
              >
                <el-option v-for="item in accidentWeekdays" :key="item.id" :label="item.name" :value="item.name" />
              </el-select>
              <el-select v-model="listQuery.directionName" placeholder="行车方案" clearable class="filter-item">
                <el-option v-for="item in directions" :key="item.id" :label="item.name" :value="item.name" />
              </el-select>
              <el-button>
                新增
              </el-button>
              <el-button type="primary" style="margin-left: 0">
                删除
              </el-button>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col>
              <el-select
                v-model="listQuery.accidentWeekday"
                placeholder="场景选择"
                clearable
                style="width: 150px; margin-bottom: 0"
                class="filter-item"
                collapse-tags
              >
                <el-option v-for="item in accidentWeekdays" :key="item.id" :label="item.name" :value="item.name" />
              </el-select>
              <el-button>
                新增
              </el-button>
              <el-button type="primary" style="margin-left: 0">
                删除
              </el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { search } from '@/api/accident'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mixin } from '@/mixins'

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  mixins: [mixin],
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      showReviewer: false,
      activeName: 'first',
      dialogFormVisible: false,
      dialogStatus: '',
      dialogPvVisible: false,
      pvData: [],
      downloadLoading: false,
      platformStatus: undefined,
      platformArr: []
    }
  },
  watch: {
    'listQuery.orderBy': function(n, o) {
      this.listQuery.page = 1
      this.getList()
      this.getDirections()
    }
  },
  created() {
    this.getAccidentList()
    this.getRoutes()
    this.getFileTypes()
    this.getAccidentWeekdays()
    this.getFestivals()
    this.getDataTable()
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
    }, {
      status: '故障站',
      platforms: {
        '西门口': 1,
        '公园前': 1
      }
    }, {
      status: '折返站',
      platforms: {
        '陈家祠': 1,
        '农讲所': 1
      }
    }]

    this.platformArr = ['西陇', '坑口', '花地湾', '芳村', '黄沙', '长寿路', '陈家祠', '西门口', '公园前', '农讲所', '烈士陵园']
  },
  methods: {
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
    handleClick() {},
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
