<style lang="stylus" rel="stylesheet/stylus"></style>

<template>
  <div class="user">
    <el-breadcrumb>
      <el-breadcrumb-item :to="'/layout/index'">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <el-table
        :data="tableData.filter(data => !search || data.nickname.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          label="昵称"
          prop="nickname">
        </el-table-column>
        <el-table-column
          label="头像"
          prop="avatar">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" width="80"/>
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱"
          prop="email">
        </el-table-column>
        <el-table-column
          label="手机号码"
          prop="mobilePhoneNumber">
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createDate">{{this.tableData.createDate | dataFormat }}
        </el-table-column>

        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentpage"
        :page-size="pagesize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
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
                <el-input v-model="form.nickname" ></el-input>
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
                <el-input v-model="form.createDate " disabled=""></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
<!--    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="submit">提 交</el-button>-->
          <el-button type="primary" @click="change()" >完成</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {getAllUsers,updateUser,deleteUserById} from '@/api/user'

export default {
  data() {
    return {
      detailVisible:false,
      form:{},
      tableData: {
        nickname: '王小虎',
        avatar:'https://scpic.chinaz.net/files/pic/pic9/202101/apic30145.jpg',
        email:'1111',
        mobilePhoneNumber:'123',
        createDate:''
      },
      total: 0,  //总数据条数
      currentpage: 1,  //当前所在页默认是第一页
      pagesize: 10,  //每页显示多少行数据 默认设置为10
      ticket: [],  //这里是从后端获取的所有数据
      pageTicket: [],//分页后的当前页数据
      search: ''
    }
  },
  created() {
      this.getAll()
    this.doQuery()
  },
  methods: {
    doQuery() {
      getAllUsers().then(data => {
        this.ticket = data.data
        this.total = data.data.length
        this.getPageInfo()
      })
    },
    getPageInfo(){
      //清空pageTicket中的数据
      this.pageTicket=[];
      // 获取当前页的数据
      for(let i=(this.currentpage-1)*this.pagesize;i<this.total;i++){
        //把遍历的数据添加到pageTicket里面
        this.pageTicket.push(this.ticket[i]);
        //判断是否达到一页的要求
        if(this.pageTicket.length===this.pagesize) break;
      }
    },
    //分页时修改每页的行数,这里会自动传入一个size
    handleSizeChange(size){
      //修改当前每页的数据行数
      this.pagesize=size;
      //数据重新分页
      this.getPageInfo();
    },
    //调整当前的页码
    handleCurrentChange(pageNumber){
      //修改当前的页码
      this.currentpage=pageNumber;
      //数据重新分页
      this.getPageInfo()
    },


    getAll(){
      getAllUsers().then(result => {
        console.info(result)
        this.tableData = result.data
      })
    },
    change(){
      console.info(this.form)
      updateUser(this.form).then(result => {
          if(result.code === 200){
              this.$message({message:"修改成功!",type:"success",showClose: true});
              this.detailVisible = false;
          }else{
            this.$message({message:"修改失败!",type:"error",showClose: true});
          }
      })
    },
    handleClose() {
      this.detailVisible = false;
      this.$emit("flesh");
    },
    handleEdit(index, row) {
      this.detailVisible = true;
      this.form = row;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      console.info(row.id);
      deleteUserById(row.id).then(result => {
        if(result.code === 200){
          this.$message({message:"删除成功!",type:'success',showClose: true});
          this.getAll()
        }else{
          this.$message({message:"姗迟失败!",type:'error', showClose: true})
        }
      })
    }
  },
}
</script>
<style>
.updateinfo {
  height: 350px;
  overflow: auto;
}
</style>
