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
      <el-tab-pane label="基本信息" name="first">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="1" style="min-width: 180px">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col>
                  <el-form-item label="名称">
                    <el-input v-model="form.name" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="角色">
                    <el-select v-model="form.region" placeholder="请选择验证方式" style="width: 100%">
                      <el-option label="区域一" value="shanghai" />
                      <el-option label="区域二" value="beijing" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="权限:" class="postInfo-container-item">
                    <el-input v-model="input" placeholder="请输入内容" />
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item class="postInfo-container-item">
                    <el-input v-model="input" placeholder="请输入内容" />
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item class="postInfo-container-item">
                    <el-input v-model="input" placeholder="请输入内容" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item>
                    <el-button type="primary" @click="">保存</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

        </el-form>
      </el-tab-pane>

      <el-tab-pane label="密码设置" name="second">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="新密码">
                <el-input v-model="form.name" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="验证方式">
                <el-select v-model="form.region" placeholder="请选择验证方式" style="width: 100%">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="验证码">
                <el-input v-model="form.name" placeholder="请先添加手机或邮箱" />
              </el-form-item>
            </el-col>
            <el-col :span="4" style="padding-left:10px">
              <el-button type="primary">获取验证码</el-button>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" @click="">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
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
      imageUrl: ''
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
