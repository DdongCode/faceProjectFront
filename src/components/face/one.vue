<template>
  <div class="bgImage">

    <div class="parent">
      <!--      摄像头画面位置，覆盖图片方框-->
      <video v-show="toggle" class="video" id="video" ref="video" autoplay></video>
      <canvas v-show="!toggle" class="video" ref="canvas"></canvas>
      <!-- 覆盖图片开始按钮-->
      <div class="start" @click="snap"></div>
    </div>
  </div>

  <!-- 性别确认弹出框 -->
  <el-dialog v-model="centerDialogVisible" title="提示"
             width="80%"
             custom-class="el-dialog"
             class="el-dialog"
             center
             :show-close="false"
             :close-on-press-escape="false"
             :close-on-click-modal="false">
    <p style="text-align: center;font-size: x-large">请选择您的性别</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" size="large" @click="handleMale">男</el-button>
        <el-button type="primary" size="large" @click="handleFemale">女</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>

import axios from 'axios'
import {ElLoading} from 'element-plus'
import bg from '../../assets/img/other/bg4.jpg'

export default {
  name: "one",
  data() {
    return {
      toggle: true,
      centerDialogVisible: false,
      formData: {},
      canvas: null,
      bg
    }
  },
  mounted() {
    sessionStorage.removeItem("name")
    let _this = this
    setTimeout(() => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
          _this.$refs.video.srcObject = stream;
          _this.$refs.video.play();
        });
      }
    }, 500)
    this.centerDialogVisible = false
    this.formData = {}
    this.canvas = null
  },
  methods: {
    handleMale() {
      this.formData.append("sex", "男")
      this.doSearch()
    },
    handleFemale() {
      this.formData.append("sex", "女")
      this.doSearch()
    },
    snap() {
      if (!this.toggle) {
        this.toggle = !this.toggle
        return
      }
      let scale = 0.3;

      this.canvas = this.$refs.canvas
      let context = this.canvas.getContext('2d');
      let video = this.$refs.video

      this.canvas.width = video.videoWidth * scale
      this.canvas.width = video.videoWidth * scale

      context.translate(this.canvas.width, 0);//画布 X轴 向右移 this.canvas.width
      context.scale(-1, 1);//以 X轴 左右翻转
      context.drawImage(video, 0, 0, this.canvas.width, this.canvas.height);
      context.setTransform(1, 0, 0, 1, 0, 0);  //恢复画布到初始状态
      this.toggle = !this.toggle
      this.formData = new FormData();
      this.centerDialogVisible = true
    },

    doSearch() {
      const loading = ElLoading.service({
        lock: true,
        text: '识别中',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      let img = this.canvas.toDataURL("image/jpeg", 0.9)
      let blob = this.dataURItoBlob(img);
      this.formData.append("file", blob)

      axios.post("/api/image/faceSearch", this.formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }).then(res => {
        let {result} = res.data
        let name = result[0].extraData
        sessionStorage.setItem("name", name)
        loading.close()
        this.$router.push('/two')
      }).catch(e => {
        this.toggle = !this.toggle
        this.centerDialogVisible = false
        this.formData = {}
        this.canvas = null
        alert("未识别到人脸，请重新拍摄");
        loading.close()
      })
    },
    dataURItoBlob(base64Data) {
      let byteString;
      if (base64Data.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(base64Data.split(',')[1]);
      else
        byteString = unescape(base64Data.split(',')[1]);
      let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
      let ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], {type: mimeString});
    }
  },
}
</script>

<style scoped>

.parent {
  position: relative;
  width: 100%;
  height: 100%;
}

.video {
  position: absolute;
  top: 30%;
  left: 18%;
  width: 64%;
  height: 44%;
  background: #646cff;
}

#video {
  transform: rotateY(180deg);
}

.start {
  position: absolute;
  bottom: 12%;
  left: 40%;
  width: 20%;
  height: 15%;
  /*background: red;*/
}

.el-dialog{
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}

</style>
