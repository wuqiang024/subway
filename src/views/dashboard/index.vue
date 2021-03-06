<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 0;">
      <el-select v-model="listQuery.routes" placeholder="事故线路" clearable style="width: 150px" class="filter-item">
        <el-option v-for="item in routes" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.directions" multiple collapse-tags placeholder="事故方向" clearable class="filter-item" style="width: 150px">
        <el-option v-for="item in directions" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.accidentTypes" placeholder="事故类型" clearable class="filter-item" multiple collapse-tags style="width: 170px;">
        <el-option v-for="item in accidentTypes" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.accidentLevels" placeholder="事故等级" clearable class="filter-item" multiple collapse-tags style="width: 150px; margin-right: 10px">
        <el-option v-for="item in accidentLevels" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-radio v-for="item in orderBy" :key="item.key" v-model="listQuery.orderBy" :label="item.key">{{ item.name }}</el-radio>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>
    <div class="filter-container">
      <el-date-picker v-model="date" type="date" placeholder="选择日期" />
      <el-select v-model="listQuery.accidentWeekday" placeholder="日期属性" clearable style="width: 150px; margin-bottom: 0" class="filter-item" multiple collapse-tags>
        <el-option v-for="item in accidentWeekdays" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.accidentFestival" placeholder="节日属性" clearable style="width: 150px; margin-bottom: 0" class="filter-item" multiple collapse-tags>
        <el-option v-for="item in accidentFestivals" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.interruptTypes" placeholder="中断类型" clearable style="width: 150px; margin-bottom: 0" class="filter-item">
        <el-option v-for="item in interruptTypes" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </div>
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
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" style="margin-top:0" @pagination="getList" />
        </el-col>
        <el-col :span="24" :lg="15">
          <div id="container" style="height: 484px" />
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
      date: undefined,
      activeName: 'first',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true
    }
  },
  created() {
    this.getList()
    this.getRoutes()
    this.getDirections()
    this.getAccidentTypes()
    this.getAccidentLevels()
    this.getAccidentWeekdays()
    this.getFestivals()
    this.getInterruptTypes()
    this.getDataTable()
  },
  mounted() {
    this.handleClick()
  },
  methods: {
    handleClick(tab, event) {
      var map = new window.AMap.Map('container', {
        resizeEnable: true
      })
      map.setFitView()
    },
    getList() {
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
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
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
