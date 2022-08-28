<template>
  <div class="bgImage2">
    <div class="parent">
      <img class="titleImage" :src="title" alt="not found">
      <img class="nameImage" :src="nameImage" alt="not found">
      <img class="person1" :src="person1" alt="not found">
      <img class="person2" :src="person2" alt="not found">
      <img class="restart" @click="doAgain" :src="restart" alt="not found">

      <p class="titleText">{{titleText}}</p>

      <div class="introBox">
        <p class="introHead">人物简介:</p>
        <p class="introText">{{ introText1 }}</p>
        <p class="introText">{{ introText2 }}</p>
      </div>

      <div class="priceBox">
        <p class="priceTop">带走前世的你&nbsp;&nbsp;存温一生荆楚情</p>
        <p class="price">仅{{ price }}元</p>
        <p class="priceTip">扫码支付即可带走<br>你的专属纪念玩偶--{{ name }}</p>
      </div>

      <div class="infoBox">
        <p class="info1">材质：{{ texture }}</p>
        <p class="info2">价格：{{ price }}元</p>
      </div>
      <img class="qrCodeImageBox" :src="qrCodeImageBox"  alt="not found">

    </div>
  </div>
</template>

<script>
import axios from "axios";
import title from '../../assets/img/other/title_black.png'
import restart from '../../assets/img/other/restart.png'

export default {
  name: "two",
  data() {
    return {
      title,
      person1: '',
      person2: '',
      nameImage:'',
      qrCodeImageBox:'',
      restart,
      price: 69,
      name: '关羽',
      texture: 'PVC',
      titleText:'事君不忘其本，天下义士也。',
      introText1: '本字长生，后改为云长，河东解良人，蜀汉开国功臣，名列“五虎上将”之首，使用青龙偃月刀。为《三国演义》三绝中的“义绝”。与张飞一同被称为万人敌。',
      introText2: '汉末亡命涿郡，逢黄巾起义爆发，结识刘备、张飞二人，从此兄弟同心，颠沛流离各处，最终在蜀地建立根据地。刘备收江南诸郡，任命关羽为襄阳太守、荡寇将军。刘备西定益州，使关羽镇守荆州。后又拜为前将军，斩将军庞德，威震华夏，后败走麦城，与儿子关平同为吴军俘杀。关羽去世后，历代朝廷多有褒封，宗教文化身居神位，民间尊为“关公”、”武圣”。关羽善待卒伍而骄于士大夫，以忠义见称于后世。'
    }
  },
  mounted() {
    if (!sessionStorage.getItem("name")) {
      this.$router.replace('/one')
    }
    let name = sessionStorage.getItem("name")
    axios.get(`/api/person/selectByName/${name}`).then(resp=>{
      let person = resp.data.obj
      this.person1 = person.personImage
      this.person2 = person.dollImage
      this.nameImage = person.nameImage
      this.qrCodeImageBox = person.qrCode
      this.titleText = person.titleText
      this.introText1 = person.personInfoOne
      this.introText2 = person.personInfoTwo
      this.texture = person.material
      this.price = person.price
      this.name = name
    })
  },
  methods:{
    doAgain(){
      this.$router.replace('/one')
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

.titleImage {
  position: absolute;
  top: 2%;
  right: 4%;
  width: 40%;

}

.nameImage{
  position: absolute;
  top: 10%;
  left: 14%;
  width: 30%;
}

.person1 {
  width: 50%;
  position: absolute;
  left: 5%;
  top: 23%;
}

.person2 {
  width: 30%;
  right: 9%;
  bottom: 24%;
  position: absolute;

}

.restart {
  width: 40%;
  left: 30%;
  bottom: -7%;
  position: absolute;
}

.introBox {
  width: 50%;
  height: 40%;
  left: 5%;
  bottom: 8%;
  position: absolute;
  text-align: left;
  color: white;
  /*background: #213547;*/
}

.introHead {
  margin-left: 20px;
  font-size: xx-large;
  margin-bottom: 25px;
}

.introText {
  text-indent: 2rem;
  font-weight: lighter;
}

.priceBox {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 15%;
  left: 5%;
  bottom: 10%;
  position: absolute;
  color: #db0001;
  /*background: #213547;*/
}

.priceTop {
  text-align: center;
  font-size: xx-large;
  font-weight: bolder;
  letter-spacing: 2px;
}

.price {
  text-align: center;
  font-size: xxx-large;
  margin: 15px;
  font-style: italic;
  font-weight: bolder;
}

.priceTip {
  text-align: center;
  font-weight: bolder;
  font-size: medium;
  line-height: 2rem;
}

.infoBox{
  width: 20%;
  height: 11.5%;
  right: 21%;
  bottom: 8%;
  position: absolute;
  /*background: #213547;*/
}

.qrCodeImageBox{
  width: 10%;
  height: 5%;
  right: 11%;
  bottom: 14%;
  position: absolute;
  /*background: #213547;*/
}

.infoBox>p{
  color: #db0001;
  font-size: x-large;
  font-weight: bolder;
  line-height: 1em;
}

.titleText{
  position: absolute;
  color: white;
  font-size: xx-large;
  top: 20%;
  left: 11%;
}
</style>
