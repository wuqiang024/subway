<style scoped>
    .el-select { display: block; }
</style>
<template>
  <div class="app-container" style="padding:40px 45px 20px 50px">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-width="120px">
      <div class="postInfo-container">
        <el-row>
          <el-col :span="6">
            <el-form-item label="事故路线:" class="postInfo-container-item">
              <el-select v-model="postForm.lineId" placeholder="请选择" clearable class="filter-item">
                <el-option v-for="item in routes" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="线路方向:" class="postInfo-container-item">
              <el-select v-model="postForm.direction" placeholder="请选择" clearable class="filter-item">
                <el-option v-for="item in directions" :key="item.id" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="事故类型:" class="postInfo-container-item">
              <el-select v-model="postForm.accidentType" placeholder="请选择" clearable class="filter-item">
                <el-option v-for="item in accidentTypes" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="事故等级:" class="postInfo-container-item">
              <el-select v-model="postForm.accidentLevel" placeholder="请选择" clearable class="filter-item">
                <el-option v-for="item in accidentLevels" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>

          <!-- <el-col :span="6">
                <el-form-item label-width="120px" label="Publish Time:" class="postInfo-container-item">
                <el-date-picker v-model="displayTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Select date and time" />
                </el-form-item>
                </el-col> -->

          <!-- <el-col :span="6">
                <el-form-item label-width="90px" label="事故等级:" class="postInfo-container-item">
                <el-rate
                  v-model="postForm.importance"
                  :max="3"
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                  :low-threshold="1"
                  :high-threshold="3"
                  style="display:inline-block"
                />
                </el-form-item>
                </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="处理措施:" class="postInfo-container-item">
              <el-input v-model="postForm.treatmentDescription" placeholder="请输入内容" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="受影响客流:" class="postInfo-container-item">
              <el-input v-model="postForm.passengersAmount" type="number" placeholder="请输入内容" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="乘客反应时间:" class="postInfo-container-item">
              <el-input v-model="postForm.passengers" type="number" placeholder="请输入内容" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="中断反应时间:" class="postInfo-container-item">
              <el-input v-model="postForm.interruptionTime" type="number" placeholder="请输入内容" />
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="中断类型:" class="postInfo-container-item">
              <el-select v-model="postForm.interruptType" placeholder="请选择" clearable class="filter-item">
                <el-option v-for="item in interruptTypes" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="中断时长:" class="postInfo-container-item">
              <el-input v-model="postForm.interruptionDuration" type="number" placeholder="请输入内容" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="中断站点:" class="postInfo-container-item">
              <el-select v-model="postForm.staId" placeholder="请选择" clearable class="filter-item">
                <el-option v-for="item in stations" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="事故时间:" class="postInfo-container-item">
              <el-date-picker v-model="postForm.startTime" type="datetime" placeholder="选择日期" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="星期属性:" class="postInfo-container-item">
              <el-select v-model="postForm.accidentWeekday" placeholder="请选择" clearable class="filter-item">
                <el-option v-for="item in accidentWeekdays" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="节日属性:" class="postInfo-container-item">
              <el-select v-model="postForm.accidentFestival" placeholder="请选择" clearable class="filter-item">
                <el-option v-for="item in accidentFestivals" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="事故状态:" class="postInfo-container-item">
              <el-select v-model="listQuery.processStatus" placeholder="请选择" clearable class="filter-item">
                <el-option v-for="item in processStatus" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <!-- <el-form-item prop="image_uri" style="margin-bottom: 30px;">
          <Upload v-model="listQuery.importance" />
        </el-form-item> -->
        <el-form-item prop="image_uri" style="margin-bottom: 30px;">
          <el-button @click="resetTemp">
            取消
          </el-button>
          <el-button type="primary" @click="handleSubmit">
            提交
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { submit, getAccidentById } from '@/api/accident'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
// import Upload from '@/components/Upload/SingleImage3'
import { mixin } from '@/mixins'

const defaultForm = {
  lineId: undefined, // 所属线路ID
  staId: undefined, // 中断站点ID
  directionName: undefined, // 线路方向
  accidentType: undefined, // 事故类型ID
  accidentLevel: undefined, // 事故等级
  interruptType: undefined, // 中断类型
  treatmentDescription: undefined, // 处理措施
  passengersAmount: undefined, // 受影响客流数
  passengers: undefined, // 乘客反应时间
  interruptionTime: undefined, // 中断反应时间
  interruptionDuration: undefined, // 中断时长
  startTime: undefined, // 起始时间
  processStatus: undefined, // 事故状态（0：未处理  1：处理中  2：处理完毕）
  accidentWeekday: undefined, // 星期数
  accidentFestival: undefined // 节假日
}

export default {
  name: 'ComplexTable',
  // components: { Upload },
  directives: { waves },
  mixins: [mixin],
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      postForm: Object.assign({}, defaultForm),
      dialogFormVisible: false,
      dialogStatus: '',
      dialogPvVisible: false,
      pvData: [],
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        // title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      opts: {},
      date: undefined
    }
  },
  created() {
    this.getRoutes()
    this.getDirections()
    this.getAccidentTypes()
    this.getAccidentLevels()
    this.getInterruptTypes()
    this.getProcessStatus()
    this.getAccidentWeekdays()
    this.getFestivals()
    this.getStations()

    const vm = this
    const id = this.$route.query.id

    if (id) {
      getAccidentById(id).then(response => {
        vm.postForm = Object.assign({}, response.data)
      })
    }
  },
  methods: {
    // getList() {
    //   this.listLoading = true
    //   fetchList(this.listQuery).then(response => {
    //     this.list = response.data.items
    //     this.total = response.data.total
    //     setTimeout(() => {
    //       this.listLoading = false
    //     }, 1.5 * 1000)
    //   })
    // },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.postForm = Object.assign({}, defaultForm)
    },
    handleSubmit() {
      submit(this.postForm).then(res => {
        if (res.status !== 0 && res.status !== 200) {
          this.$notify({
            title: '错误',
            message: res.message,
            type: 'error',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '成功',
            message: '数据提交成功',
            type: 'success',
            duration: 2000
          })
        }
      }).catch(error => {
        this.$notify({
          title: '错误',
          message: '数据提交错误' || error.message,
          type: 'error',
          duration: 2000
        })
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
