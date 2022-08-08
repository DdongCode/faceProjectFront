<template>
  <div class="bgImage2">
    <div class="parent">
      <img class="titleImage" :src="title" alt="not found">
      <img class="person1" :src="person1" alt="not found">
      <img class="person2" :src="person2" alt="not found">
      <img class="restart" :src="restart" alt="not found">

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
    </div>
  </div>
</template>

<script>

import title from '../../assets/img/other/title_black.png'
import restart from '../../assets/img/other/restart.png'

import guanyu1 from '../../assets/img/person/guanyu1.png'
import guanyu2 from '../../assets/img/person/guanyu2.png'

export default {
  name: "two",
  data() {
    return {
      title,
      person1: '',
      person2: '',
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
    this.person1 = guanyu1
    this.person2 = guanyu2
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

.person1 {
  width: 50%;
  position: absolute;
  left: 5%;
  top: 21%;
}

.person2 {
  width: 30%;
  right: 9%;
  bottom: 21%;
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
  /*background: #213547;*/
}

.priceBox {
  width: 50%;
  height: 20%;
  left: 5%;
  bottom: 5%;
  position: absolute;

  /*background: #213547;*/
}

.introHead {
  margin-left: 20px;
  color: white;
  font-size: small;
  margin-bottom: 25px;
}

.introText {
  color: white;
  transform: scale(0.7, 0.7);
  text-indent: 2rem;
  font-size: 1px;
  margin: -24px;
  font-weight: lighter;
  line-height: 1rem;
}

.priceTop {
  text-align: center;
  font-size: small;
  color: #db0001;
  font-weight: bolder;
  letter-spacing: 2px;
}

.price {
  text-align: center;
  font-size: xx-large;
  margin: 15px;
  color: #db0001;
  font-style: italic;
  font-weight: bolder;
}

.priceTip {
  text-align: center;
  color: #db0001;
  font-weight: bolder;
  font-size: xx-small;
  line-height: 1rem;
}

.infoBox{
  width: 20%;
  height: 10%;
  right: 21%;
  bottom: 7%;
  position: absolute;
  /*background: #213547;*/
}

.infoBox>p{
  color: #db0001;
  font-size: x-small;
  font-weight: bold;
  line-height: 1.1em;
}

.titleText{
  position: absolute;
  color: white;
  font-size: xx-small;
  top: 18%;
  left: 11%;
}
</style>
