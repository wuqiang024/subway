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
      <el-select v-model="listQuery.routes" placeholder="事故线路" clearable style="width: 150px" class="filter-item" multiple collapse-tags>
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
        查找
      </el-button>
    </div>

    <el-row style="margin-top: 20px">
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
    <el-table :data="tableData2" border fit highlight-current-row style="width: 100%; margin-top: 10px">
      <el-table-column
        prop="address"
        label="行车区间"
      />
      <el-table-column
        prop="type"
        label="区间类型"
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

    <el-row style="margin-top: 20px">
      <el-col :span="12" style="text-align: left;">
        接驳方案
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <el-checkbox label="选择发送" name="type" />
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="12" style="text-align: left;">
        用时最短
      </el-col>
    </el-row>
    <el-table :data="tableData2" border fit highlight-current-row style="width: 100%; margin-top: 10px">
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

    <el-row style="text-align: center;">
      <el-button type="danger">方案通报</el-button>
    </el-row>
  </div>
</template>

<script>
import { fetchList, fetchPv } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import { mixin } from '@/mixins'

export default {
  name: 'ComplexTable',
  directives: { waves },
  mixins: [mixin],
  data() {
    return {
      tableKey: 0,
      list: null,
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
      pvData: [],
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
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
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
    }
  }
}
</script>
