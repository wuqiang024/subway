<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="接收者列表" name="first">
        <el-row style="margin-top: 20px">
          <el-col :span="12" style="text-align: left;">
            <el-button type="primary" size="big" @click="">
              添加接收者
            </el-button>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          border
          fit
          highlight-current-row
          style="width: 100%;margin:15px auto"
        >
          <el-table-column label="序号" prop="id" align="center" width="120" />
          <el-table-column label="收件人名称" prop="name" align="center" width="120" />
          <el-table-column label="收件人邮箱" prop="email" align="center" width="120" />
          <el-table-column label="手机号码" prop="mobile" align="center" width="120" />
          <el-table-column label="更新日期" prop="update" align="center" min-width="120" />
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="{row}">
              <el-button type="primary" size="mini" @click="">
                编辑
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="{row}">
              <el-button type="danger" size="mini" @click="">
                删除
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="选择" align="center" width="120">
            <template slot-scope="{row}">
              <el-checkbox label="" name="type" />
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col :span="24" style="text-align: right;">
            <el-button type="primary" size="big" @click="">
              发送
            </el-button>
            <el-button type="success" size="big" @click="">
              取消
            </el-button>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="已通报历史" name="second">
        <el-table
          :data="tableData"
          border
          fit
          highlight-current-row
          style="width: 100%;margin:15px auto"
        >
          <el-table-column label="序号" prop="id" align="center" width="120" />
          <el-table-column label="收件人名称" prop="name" align="center" />
          <el-table-column label="收件人邮箱" prop="email" align="center" />
          <el-table-column label="手机号码" prop="mobile" align="center" />
          <el-table-column label="更新日期" prop="update" align="center" />
          <el-table-column label="操作" align="center">
            <template slot-scope="{row}">
              <el-button type="primary" size="mini" @click="">
                编辑
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="{row}">
              <el-button type="danger" size="mini" @click="">
                删除
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="选择" align="center" width="120">
            <template slot-scope="{row}">
              <el-checkbox label="" name="type" />
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col :span="24" style="text-align: right;">
            <el-button type="primary" size="big" @click="">
              发送
            </el-button>
            <el-button type="success" size="big" @click="">
              取消
            </el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      form: {},
      tableData: [{
        id: 1,
        name: '非故障',
        email: '西门口',
        mobile: '小交路',
        update: '2018-09-20'
      },
      {
        id: 1,
        name: '非故障',
        email: '西门口',
        mobile: '小交路',
        update: '2018-09-20'
      },
      {
        id: 1,
        name: '非故障',
        email: '西门口',
        mobile: '小交路',
        update: '2018-09-20'
      },
      {
        id: 1,
        name: '非故障',
        email: '西门口',
        mobile: '小交路',
        update: '2018-09-20'
      }
      ]
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
