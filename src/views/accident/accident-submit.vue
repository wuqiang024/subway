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
              <el-select v-model="listQuery.routes" placeholder="请选择" clearable class="filter-item">
                <el-option v-for="item in routes" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="事故方向:" class="postInfo-container-item">
              <el-select v-model="listQuery.directions" placeholder="请选择" clearable class="filter-item">
                <el-option v-for="item in directions" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="事故类型:" class="postInfo-container-item">
              <el-select v-model="listQuery.accidentTypes" placeholder="请选择" clearable class="filter-item">
                <el-option v-for="item in accidentTypes" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="事故等级:" class="postInfo-container-item">
              <el-select v-model="listQuery.accidentLevels" placeholder="请选择" clearable class="filter-item">
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
              <el-input v-model="input" placeholder="请输入内容" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="受影响客流:" class="postInfo-container-item">
              <el-input v-model="input" placeholder="请输入内容" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="乘客反应时间:" class="postInfo-container-item">
              <el-input v-model="input" placeholder="请输入内容" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="中断反应时间:" class="postInfo-container-item">
              <el-input v-model="input" placeholder="请输入内容" />
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="中断类型:" class="postInfo-container-item">
              <el-select v-model="listQuery.interruptTypes" placeholder="请选择" clearable class="filter-item">
                <el-option v-for="item in interruptTypes" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="中断时长:" class="postInfo-container-item">
              <el-input v-model="input" placeholder="请输入内容" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="中断站点:" class="postInfo-container-item">
              <el-select v-model="listQuery.importance" placeholder="请选择" clearable class="filter-item">
                <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="事故时间:" class="postInfo-container-item">
              <el-select v-model="listQuery.importance" placeholder="请选择" clearable class="filter-item">
                <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="时间属性:" class="postInfo-container-item">
              <el-select v-model="listQuery.importance" placeholder="请选择" clearable class="filter-item">
                <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="日期属性:" class="postInfo-container-item">
              <el-select v-model="listQuery.importance" placeholder="请选择" clearable class="filter-item">
                <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-form-item prop="image_uri" style="margin-bottom: 30px;">
          <Upload v-model="listQuery.importance" />
        </el-form-item>
        <el-form-item prop="image_uri" style="margin-bottom: 30px;">
          <el-button @click="dialogFormVisible = false">
            Cancel
          </el-button>
          <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
            Confirm
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { searchUser } from '@/api/remote-search'
import Upload from '@/components/Upload/SingleImage3'
import { mixin } from '@/mixins'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0
}

export default {
  name: 'ComplexTable',
  components: { Pagination, Upload },
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
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      postForm: Object.assign({}, defaultForm),
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
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      userListOptions: [],
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.postForm.display_time))
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  created() {
    this.getList()
    this.getRoutes()
    this.getDirections()
    this.getAccidentTypes()
    this.getAccidentLevels()
    this.getInterruptTypes()
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
    getRemoteUserList(query) {
      searchUser(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
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
