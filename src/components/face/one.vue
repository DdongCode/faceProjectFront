<template>
  <div class="bgImage">
      <img :src="bg" class="bg">
      <video v-show="toggle" class="video" ref="video" autoplay></video>
      <canvas v-show="!toggle" class="video" ref="canvas"></canvas>
      <div class="start" @click="snap"></div>
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
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.toggle = !this.toggle
      let img = canvas.toDataURL("image/jpeg", 0.9)
      let blob = this.dataURItoBlob(img);
      let formData = new FormData();
      formData.append("file", blob)
      axios.post("https://www.jamscoco.top/image/faceSearch", formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }).then(res => {
        let {result} = res.data
        let name = result[0].extraData
        sessionStorage.setItem("name",name)
        this.$router.replace('/two')
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
.video {
  position: absolute;
  top: 23%;
  width: 62%;
  height: 44%;
  background: #646cff;
}

.start {
  position: absolute;
  top: 23%;
  left: 40%;
  width: 20%;
  height: 15%;
  background: red;
}

.bg{
  position: absolute;
  width: 1080px;
  height: 1920px;
}


</style>
