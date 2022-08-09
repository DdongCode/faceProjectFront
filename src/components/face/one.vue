<template>
  <div class="bgImage">
    <div class="parent">
      <video v-show="toggle" class="video" id="video" ref="video" autoplay></video>
      <canvas v-show="!toggle" class="video" ref="canvas"></canvas>
      <div class="start" @click="snap"></div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import bg from '../../assets/img/other/bg4.jpg'

export default {
  name: "one",
  data() {
    return {
      toggle: true,
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
  },
  methods: {
    snap() {
      if (!this.toggle) {
        this.toggle = !this.toggle
        return
      }
      let scale = 0.3;

      let canvas = this.$refs.canvas
      let context = canvas.getContext('2d');
      let video = this.$refs.video

      canvas.width = video.videoWidth * scale
      canvas.width = video.videoWidth * scale

      context.translate(canvas.width, 0);//画布 X轴 向右移 canvas.width
      context.scale(-1, 1);//以 X轴 左右翻转
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      context.setTransform(1, 0, 0, 1, 0, 0);  //恢复画布到初始状态
      this.toggle = !this.toggle

      let img = canvas.toDataURL("image/jpeg", 0.9)
      let blob = this.dataURItoBlob(img);
      let formData = new FormData();
      formData.append("file", blob)
      axios.post("/api/image/faceSearch", formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }).then(res => {
        let {result} = res.data
        let name = result[0].extraData
        sessionStorage.setItem("name",name)
        this.$router.push('/two')
      }).catch(e=>{
        this.toggle = !this.toggle
        alert("未识别到人脸，请重新拍摄");
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
  }
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

#video{
  transform: rotateY(180deg);
}

.start {
  position: absolute;
  bottom: 10%;
  left: 40%;
  width: 20%;
  height: 15%;
  background: red;
}


</style>
