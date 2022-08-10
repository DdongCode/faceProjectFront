<template>
  <div class="body">
    <div class="add_div">
      <el-button style="margin-bottom: 10px" type="primary" @click="showAdd">点击添加人物</el-button>
      <el-button style="margin-bottom: 10px" type="danger" @click="batchDelete" :disabled="selectedRows.length === 0">
        批量删除
      </el-button>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="姓名:">
          <el-input @keydown.enter.native="searchPersonByName" v-model="searchName" placeholder="请输入人物姓名进行搜索..."/>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchPersonByName" type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main_div">
      <el-table
          border
          stripe
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column label="序号" width="55" type="index">
        </el-table-column>
        <el-table-column label="姓名" width="180">
          <template #default="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="180">
          <template #default="scope">
            <span>{{ scope.row.price }}元</span>
          </template>
        </el-table-column>
        <el-table-column label="添加时间" width="180">
          <template #default="scope">
            <span>{{ scope.row.createdTime }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template #default="scope">
            <el-button size="small" type="success" @click="handleDetail(scope.row.id)">详情</el-button>
            <el-button size="small" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination style="margin-top: 10px" background layout="prev, pager, next"
                     :total="pagination.total"
                      v-model:current-page="pagination.curPage"
                      />

      <el-dialog @opened="handleOpened"  v-model="dialogFormVisible" :title="dialogTitle" @close="handleDialogCancel">
        <el-form :disabled="!isShowConfirm" :model="person" :rules="rules" ref="person">
          <el-form-item prop="name" label="人物姓名:" :label-width="formLabelWidth">
            <el-input :disabled="editInputName" v-model="person.name" placeholder="请输入人物姓名..."/>
          </el-form-item>
          <el-form-item prop="material" label="材质:" :label-width="formLabelWidth">
            <el-input v-model="person.material" placeholder="请输入人物玩偶材质..."/>
          </el-form-item>
          <el-form-item prop="price" label="价格:" :label-width="formLabelWidth">
            <el-input v-model="person.price" placeholder="请输入人物玩偶价格..."/>
          </el-form-item>
          <el-form-item prop="personInfoOne" label="第一段人物简介:" :label-width="formLabelWidth">
            <el-input v-model="person.personInfoOne" placeholder="请输入第一段人物简介..."/>
          </el-form-item>
          <el-form-item prop="personInfoTwo" label="第二段人物简介:" :label-width="formLabelWidth">
            <el-input v-model="person.personInfoTwo" placeholder="请输入第二段人物简介..."/>
          </el-form-item>
          <el-form-item prop="nameImage" label="人物艺术字:" :label-width="formLabelWidth">
            <el-upload
                class="avatar-uploader"
                action="xxx"
                :show-file-list="false"
                :on-success="handleAvatarSuccess('nameImage')">
              <img v-if="person.nameImage" :src="person.nameImage" class="avatar"/>
              <el-icon v-else class="avatar-uploader-icon">
                <Plus/>
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item prop="personImage" label="人物卡通图:" :label-width="formLabelWidth">
            <el-upload
                class="avatar-uploader"
                action="xxx"
                :show-file-list="false"
                :on-success="handleAvatarSuccess('personImage')">
              <img v-if="person.personImage" :src="person.personImage" class="avatar"/>
              <el-icon v-else class="avatar-uploader-icon">
                <Plus/>
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item prop="dollImage" label="人物玩偶图片:" :label-width="formLabelWidth">
            <el-upload
                class="avatar-uploader"
                action="xxx"
                :show-file-list="false"
                :on-success="handleAvatarSuccess('dollImage')">
              <img v-if="person.dollImage" :src="person.dollImage" class="avatar"/>
              <el-icon v-else class="avatar-uploader-icon">
                <Plus/>
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item prop="qrCode" label="二维码:" :label-width="formLabelWidth">
            <el-upload
                class="avatar-uploader"
                action="xxx"
                :show-file-list="false"
                :on-success="handleAvatarSuccess('qrCode')">
              <img v-if="person.qrCode" :src="person.qrCode" class="avatar"/>
              <el-icon v-else class="avatar-uploader-icon">
                <Plus/>
              </el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleDialogCancel">取消</el-button>
        <el-button type="primary" v-if="isShowConfirm" @click="handleDialogConfirm">确定</el-button>
      </span>
        </template>
      </el-dialog>
    </div>

  </div>
</template>

<script>

import axios from "axios";
import { ElMessage, ElMessageBox } from 'element-plus'


export default {
  name: "Home",
  data() {
    return {
      editInputName:false,
      isShowConfirm:true,
      selectedRows: [],
      dialogTitle: '',
      searchName: '',
      dialogFormVisible: false,
      person: {
        name: '',
        nameImage: '',
        personImage: '',
        personInfoOne: '',
        personInfoTwo: '',
        dollImage: '',
        material: 'PVC',
        price: '',
        qrCode: ''
      },
      formLabelWidth: '140px',
      tableData: [],
      rules: {
        name: [{required: true, message: '人物姓名不能为空', trigger: 'blur'},{required: true,validator: this.checkName,message: '该人物已存在，不可添加',trigger: 'blur'}],
        nameImage: [{required: true, message: '人物艺术字图片未上传', trigger: 'blur'}],
        personImage: [{required: true, message: '人物卡通图片未上传', trigger: 'blur'}],
        personInfoOne: [{required: true, message: '第一段人物简介不能为空', trigger: 'blur'}],
        personInfoTwo: [{required: true, message: '第二段人物简介不能为空', trigger: 'blur'}],
        dollImage: [{required: true, message: '人物玩偶图片为上传', trigger: 'blur'}],
        material: [{required: true, message: '材质不能为空', trigger: 'blur'}],
        price: [{required: true, message: '价格不能为空', trigger: 'blur'}],
        qrCode: [{required: true, message: '商品二维码图片未上传', trigger: 'blur'}]
      },
      pagination:{
        total:110,
        curPage:1
      }
    }
  },
  watch:{
    'pagination.curPage'(newValue){
        this.initData(newValue)
    }
  },
  methods: {
    checkName(rule, value, callback){
      axios.get('/api/person/checkname/',{
        params:{
          name:this.person.name
        }
      }).then(resp=>{
        if( resp.data.code === 200){
          callback()
        }else {
          callback(new Error());
        }
      })
    },
    searchPersonByName(){
      this.initData(1)
    },
    showAdd() {
      this.isShowConfirm = true
      this.editInputName = false
      this.dialogTitle = '添加人物'
      this.dialogFormVisible = true
    },
    handleAvatarSuccess(type) {

    },
    handleSelectionChange(e) {
      this.selectedRows = []
      e.forEach(item=>{
        this.selectedRows.push(item.id)
      })
    },
    batchDelete() {
      ElMessageBox.confirm(
          '此操作将永久删除['+this.selectedRows.length+']个人物，是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .then(() => {
            let url = '/api/person/delete/?'
            this.selectedRows.forEach(item=>{
              url += 'ids='+ item + '&'
            })
            url = url.slice(0,url.length-1)
            axios.delete(url).then(resp=>{
              this.initData(1)
              this.$message.success(resp.data.message)
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消',
            })
          })
    },
    handleDetail(id) {

      axios.get(`/api/person/${id}`).then(resp=>{
        this.person = resp.data.obj
        this.dialogTitle = '人物详情'
        this.isShowConfirm = false
        this.dialogFormVisible = true
      })
    },
    handleEdit(id) {
      this.dialogTitle = '人物编辑'
      this.editInputName = true
      this.isShowConfirm = true
      axios.get(`/api/person/${id}`).then(resp=>{
        this.person = resp.data.obj
      })
      this.dialogFormVisible = true
    },
    handleDelete(person) {
      ElMessageBox.confirm(
          '此操作将永久删除['+person.name+']这个人物，是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .then(() => {
            axios.delete(`/api/person/${person.id}`).then(resp=>{
              this.initData(1)
              this.$message.success(resp.data.message)
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消',
            })
          })
    },
    handleDialogConfirm() {
      console.log(this.person)
      if(this.dialogTitle === '添加人物'){
        this.$refs.person.validate((valid)=>{
          if(valid){
            axios.post('/api/person/',
                this.person
            ).then(resp=>{
              if(resp.data.code === 200){
                this.$message.success(resp.data.message)
              }else {
                this.$message.error(resp.data.message)
              }
              this.dialogFormVisible = false
              this.initData(1)
            })
          }else {
            this.$message.error("有字段未填写，不能提交！")
          }
        })
      }
      if(this.dialogTitle === '人物编辑'){
/*        this.$refs.person.validate((valid)=>{
          if(valid){*/
            axios.put('/api/person/',
                this.person
            ).then(resp=>{
              if(resp.data.code === 200){
                this.$message.success(resp.data.message)
              }else {
                this.$message.error(resp.data.message)
              }
              this.dialogFormVisible = false
              this.initData(1)
            })
     /*     }else {
            this.$message.error("有字段未填写，不能提交！")
          }
        })*/
      }
    },
    handleDialogCancel() {
      this.dialogFormVisible = false
      this.person = {
        material: 'PVC'
      }
    },
    initData(currentPage) {
      axios.get('/api/person/list', {
        params: {
          name: this.searchName,
          currentPage,
          size: 10
        }
      }).then(resp => {
        let {list, total} = resp.data.obj
        this.tableData = list
        this.pagination.total = total

      })
    },
    handleOpened(){
      if (this.dialogTitle !== '添加人物'){
        this.$refs.person.validate()
      }

    }
  },
  mounted() {
    this.initData(1)
  }
}
</script>

<style>

.body {
}

.add_div {
  margin-top: 30px;
  margin-left: 50px;
  text-align: left;
}

.main_div {
  margin-top: 10px;
  margin-left: 50px;
}
</style>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>