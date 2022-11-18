<template>
  <div class="layout">
    <el-row type="flex">
      <el-col :span="3" class="left">
        <my-menu></my-menu>
      </el-col>
      <el-col :span="21" class="right">
        <div class="layout-header">
          <div class="layout-header-title">管理系统</div>
          <el-dropdown hide-on-click="true">
            <div class="user-info">
              <span class="avatar"></span>
              <span class="name">{{ this.name }}<i class="el-icon-caret-bottom el-icon--right"></i></span>
            </div>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="admininfo" >个人信息</el-dropdown-item>
              <el-dropdown-item @click.native="logout" divided>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>


          <el-dialog
            title="编辑"
            :visible.sync="detailVisible"
            width="60%"
            :before-close="handleClose"
            append-to-body>
            <el-form :model="form"  label-width="150px">
              <div class="updateinfo">
                <div class="left">
                  <el-form-item label="头像" prop="avatar">
                    <img style="width:150px;height:110px" :src="form.avatar"></img>
                  </el-form-item>

                  <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="form.name" ></el-input>
                  </el-form-item>

                  <!--            <el-form-item label="性别" prop="sex">
                                <el-switch
                                  v-model="form.sex"
                                  active-color="#13ce66"
                                  inactive-color="#ff4949"
                                  active-text="男"
                                  inactive-text="女"
                                  :active-value= "1"
                                  :inactive-value= "0"
                                >
                                </el-switch>
                              </el-form-item>-->
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" ></el-input>
                  </el-form-item>
                </div>
                <div class="right">
                  <el-form-item label="手机号码" prop="mobilePhoneNumber">
                    <el-input v-model="form.mobilePhoneNumber" ></el-input>
                  </el-form-item>
                  <el-form-item label="创建时间" prop="createDate">
                    <el-input v-model="form.createDate" disabled></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
<!--    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="submit">提 交</el-button>-->
              <el-button type="primary" @click="change()" >提交修改</el-button>
            </span>
          </el-dialog>


        </div>
        <div class="layout-content">
          <router-view></router-view>
          <div class="layout-copy">
            2022~ &copy; zqs
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import myMenu from 'common/Menu'
  import {updateUser} from '@/api/user'
  export default {
    data() {
      return {
        detailVisible:false,
         name:this.$store.state.name,
         form:{}
      }
    },
    components: {
      myMenu
    },
    created() {
      console.info(this.$store.state)

    },
    methods: {
      logout() {
        let that = this
        this.$store.dispatch('logout').then(() => {
          this.$router.push({path: '/'})
        }).catch((error) => {
          if (error !== 'error') {
            that.$message({message: error, type: 'error', showClose: true});
          }
        })
      },
      //个人信息显示
      admininfo(){
          this.detailVisible = true;
          this.form = this.$store.state
      },
      change(){
        updateUser(this.form).then(data => {
          if(data.code === 200){
            this.$message({message: '修改成功!', type: 'success', showClose: true});
            this.detailVisible=false
          }else{
            this.$message({message: '修改失败!', type: 'error', showClose: true});

          }
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.layout
  .left
    position fixed
    top 0
    bottom 0
    left 0
  .right
    position fixed
    top 0
    right 0
    bottom 0
    background-color #f5f7f9
    .layout-header
      position absolute
      width 100%
      height 60px
      background #fff
      box-shadow 0 2px 2px rgba(7, 17, 27, .1)
      .layout-header-title
        position absolute
        height 60px
        line-height 60px
        left 20px
        font-size 20px
        font-weight bold
      .el-dropdown
        position absolute
        right 50px
        .user-info
          cursor pointer
          .avatar
            float left
            margin-top 10px
            margin-right 5px
            display inline-block
            width 40px
            height 40px
            border-radius 50%
            background url("../../assets/img/avatar.jpg") no-repeat center
            background-size 100%
            border 1px solid #ccc
          .name
            display inline-block
            font-size 15px
            font-weight bold
            color #666
            line-height 60px
            height 60px
    .layout-content
      position fixed
      top 60px
      bottom 0
      width 87.5%
      border-radius 4px
      box-sizing border-box
      & > div:first-child
        height calc(100% - 27px)
        .el-breadcrumb
          padding 10px 15px 0
        .main
          margin 15px
          padding 0 10px 15px 10px
          max-height calc(100% - 75px)
          min-height 200px
          background #fff
          overflow auto
          box-shadow 0 2px 2px 0 rgba(7, 17, 27, .1)
          .header
            height 60px
            line-height 60px
          .page
            margin-top 10px
            text-align right
      .layout-copy
        position absolute
        top calc(100% - 27px)
        width 100%
        padding 0 0 15px
        text-align center
        color #9ea7b4
        font-size 12px
</style>
