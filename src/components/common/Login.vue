<style lang="stylus" rel="stylesheet/stylus">
  .login
    position fixed
    display flex
    top 0
    right 0
    bottom 0
    left 0
    background-color #0099C3
    /*background url("../../assets/img/login-bg.jpg") no-repeat 100% 100%*/
    canvas
      position fixed
    .login-box
      margin auto
      width 420px
      height 300px
      border-radius 10px
      background-color #ffffff
      padding 30px
      .login-box-title
        margin-bottom 30px
        font-size 23px
        font-weight 500
        text-align center
      .el-form
        .el-input__inner
          border-radius 0
        .captcha
          width 100%
          height 36px
    .login-box-button
      margin-top 15px
      width 100%
</style>

<template>
  <div class="login">
    <div class="login-box">

      <h2 class="login-box-title">CMS系统</h2>

      <el-form :model="userForm" :rules="rules" ref="userForm">
        <el-row type="flex" justify="center">
          <el-col :span="18">
            <el-form-item prop="account">
              <el-input v-model="userForm.account" size="large" placeholder="账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :span="18">
            <el-form-item prop="password">
              <el-input v-model="userForm.password" size="large" placeholder="密码" type="password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
<!--        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item prop="captcha">
              <el-input v-model="login.captcha" placeholder="验证码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
              <img class="captcha" src="" alt="验证码不见了">
          </el-col>
        </el-row>-->
      </el-form>
      <el-row type="flex" justify="center">
        <el-col :span="18">
          <el-button class="login-box-button" type="primary" @click.native.prevent="login('userForm')">
            登录
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'Login',
    data() {
      return {
        userForm: {
          account: '',
          password: ''
        },
        rules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            {min: 5,max: 10, message: '请正确输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'},
            {min: 3,message: '不能小于3个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      login(formName) {
        console.info("=====")
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$store.dispatch('login', that.userForm).then(() => {
              that.$router.push({path: 'layout'})
            }).catch((error) => {
              if (error !== 'error') {
                that.$message({message: error, type: 'error', showClose: true});
              }
            })
          } else {
            return false;
          }
        });
      },
      back(){
        this.$router.go(-1)
      }
    }
  }
</script>

