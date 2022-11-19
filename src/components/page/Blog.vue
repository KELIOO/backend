<style lang="stylus" rel="stylesheet/stylus">

</style>

<template>
  <div class="user">
    <el-breadcrumb>
      <el-breadcrumb-item :to="'/layout/index'">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="main">
      <el-table
        :data="pageTicket"
        style="width: 100%">
        <el-table-column
          label="标题"
          width="180"
          prop="title">
        </el-table-column>
        <el-table-column
          label="作者"
          width="180"
        prop="authorId">
        </el-table-column>

          <el-table-column
            label="内容"
            width="180"
            prop="body">
            <template slot-scope="scope">
              {{ scope.row.body.content}}
            </template>
          </el-table-column>


        <el-table-column
          label="标签"
          width="180"
          prop="categoryId">
          <template slot-scope="scope">
              <el-tag
                size="small"
                type="primary"
                v-for=" tag in scope.row.tags"
              >{{tag.tagName}}</el-tag>
          </template>

        </el-table-column>
        <el-table-column
          label="观看次数"
          width="180"
        prop="viewCounts"
          sortable  >
        </el-table-column>
        <el-table-column
          label="评论数"
          width="180"
        prop="commentCounts"
          sortable>
        </el-table-column>
        <el-table-column
          label="地址"
          width="180"
        prop="authorIp">
        </el-table-column>
        <el-table-column
          label="发布时间"
          width="180"
        prop="createDate"
          sortable>
          {{ this.logData.createDate | dataFormat}}
        </el-table-column>







        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)" disabled="">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentpage"
        :page-sizes="[5,10,15,20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

  </div>
  </div>
</template>

<script>
import {getAllArticles,deleteById} from '@/api/article'
  export default {
    data() {
      return {
        logData:{},
        total: 0,  //总数据条数
        currentpage: 1,  //当前所在页默认是第一页
        pagesize: 5,  //每页显示多少行数据 默认设置为10
        ticket: [],  //这里是从后端获取的所有数据
        pageTicket: [],//分页后的当前页数据
      }
    },
    created() {
      this.AllArticles()
    },
    methods: {
        AllArticles(){
          getAllArticles().then(data => {
            console.info(data)
            this.ticket = data.data
            this.total = data.data.length
            this.getPageInfo()
            console.info(this.logData)
            console.info(this.pageTicket + "=================")
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
      handleDelete(index, row) {
        console.log(index, row);
        console.info(row.id);
        deleteById(row.id).then(result => {
          if(result.code === 200){
            this.$message({message:"删除成功!",type:'success',showClose: true});
            this.getAll()
          }else{
            this.$message({message:"姗迟失败!",type:'error', showClose: true})
          }
        })
      }
    }
  }
</script>
