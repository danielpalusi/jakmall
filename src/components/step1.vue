<template>
    <div>
      <div class="containers">
        <div class="header">
          <div class="steps">
            <span class="red">1</span>&nbsp&nbsp&nbspDelivery&nbsp&nbsp&nbsp〉&nbsp&nbsp&nbsp
            <span class="red">2</span>&nbsp&nbsp&nbspPayment&nbsp&nbsp&nbsp〉&nbsp&nbsp&nbsp
            <span class="red">3</span>&nbsp&nbsp&nbspFinish
          </div>
        </div>
        <div class="container">
          <form enctype="multipart/form-data" v-on:submit.prevent="handleUpdateFormSubmit()">
            <div class="main">
              <div class="middle">
                <span class="cart">← <a href="#">Back to Cart</a></span>
                <div class="delivery">
                  <span class="delivery-left">Delivery details</span>
                  <span class="delivery-right"><input type="checkbox" id="checkbox" v-model="userData.isDropshipper"> Send as dropshipper</span>
                  <br>
                  <div class="middle-left">
                    <p>
                      <input class="form-control" type="text" placeholder="Name" v-model="userData.name" required="">
                    </p>
                    <p>
                      <input type="tel" pattern="^\d{4}-\d{4}-\d{4}$" placeholder="Phone (format: xxxx-xxx-xxxx)" v-model="userData.phone" required>
                    </p>
                    <p class="full-width">
                      <textarea name="" id="" cols="30" rows="5" v-model="userData.delivery_address" placeholder="Delivery Address" required></textarea>
                    </p>
                  </div>
                  <div class="middle-right" v-if="userData.isDropshipper == 1">
                    <p>
                      <input class="form-control" type="text" v-model="userData.dropshipper_name" placeholder="Dropshipper Name" required="">
                    </p>
                    <p>
                      <input type="tel" pattern="^\d{4}-\d{4}-\d{4}$" v-model="userData.dropshipper_phone" placeholder="Phone (format: xxxx-xxx-xxxx)" required>
                    </p>
                  </div>
                </div>
              </div>
              <div class="right">
                <br>
                <div class="summary">
                  <span class="summary-title">Summary</span>
                  <p>{{userData.totalItem}} Item purchased</p>
                </div>
                <div class="down">
                  <div class="right-left">
                    <p>Cost of goods</p>
                    <p v-if="userData.isDropshipper == 1">Dropshipping fee: </p>
                    <p class="total">Total</p>
                  </div>
                  <div class="right-right">
                    <p>{{userData.cost_of_goods}}</p>
                    <p v-if="userData.isDropshipper == 1">{{userData.dropshipper_fee}}</p>
                    <p class="value">{{cost_computed}}</p>
                  </div>
                  <div class="submit">
                    <input type="submit" value="Continue to Payment">
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        userData: {
          name: '',
          phone: '',
          delivery_address: '',
          dropshipper_phone: '',
          dropshipper_name: '',
          isDropshipper: false,
          cost_of_goods: 500000,
          totalItem: 10,
          dropshipper_fee: 5900
        },
        isActive: 1,
      }
    },
    methods: {
      handleUpdateFormSubmit () {
        const authUser= {}
        authUser.nama= this.userData.name
        authUser.phone= this.userData.phone
        authUser.delivery_address= this.userData.delivery_address
        if(this.userData.isDropshipper){
          authUser.dropshipper_phone= this.userData.dropshipper_phone
          authUser.dropshipper_name= this.userData.dropshipper_name
          authUser.dropshipper_fee= this.userData.dropshipper_fee
        }
        authUser.cost_of_goods= this.userData.cost_of_goods
        authUser.isDropshipper= this.userData.isDropshipper
        window.localStorage.setItem('authUser', JSON.stringify(authUser))
        this.$router.push({path: 'step2'})
      }
    },
    computed: {
      cost_computed: function () {
        return this.userData.isDropshipper ? this.userData.cost_of_goods + this.userData.dropshipper_fee : this.userData.cost_of_goods
      }
    }
  }
</script>

<style scoped>
*{
  
  box-sizing: border-box;
}

body{
  background: #dedede;
  font-family: 'Helvetica', arial, sans-serif;
  font-size: 15px;
}

p{
  margin-bottom: 20px;
  line-height: 1.5em;
}
h3{
  margin-bottom: 20px;
  border-bottom: 1px solid #aaa;
}

a{
  text-decoration: none;
  color: #333;
}
a:hover{
  color: #666;
}

.containers{
  max-width: 1200px;
  max-height: 700px;
  margin: 20px auto;
  background: #fffae6;
  overflow: hidden;
  padding: 10px;
  position: relative;
}


.container{
  max-width: 1100px;
  max-height: 550px;
  background: #fff;
  overflow: hidden;
  padding: 10px;
  margin-left: 4.17%;
  margin-top: 7.86%;
  margin-bottom: 13.57%;

  background: #FFFFFF;
  box-shadow: 2px 10px 20px rgba(255, 138, 0, 0.1);
  border-radius: 4px;
}

.middle{
  width: 760px;
  padding: 10px;
  margin: 10px;
  float: left;
}

.summary-title{
  height: 44px;
  padding-left: 0%;
  padding-right: 2.67%;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 44px;
  color: #FF8A00;
}

.right-left,.middle-left{
  float: left;
}

.right-right,.middle-right{
  float: right;
}

.right-right, .right-left, .summary, .cart{
  font-family: Montserrat;
}

.down{
  padding-right: 5.83%;
  padding-top: 56.57%;
  padding-bottom: 29.29%;
}

.total, .value{
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  color: #FF8A00;
}

input[type=submit] {
    width: 15.50em;
    height: 3.750em;
    color: #fff;
    font-size: 18px;
    background-color: #FF8A00;
}

.right{
  width: 280px;
  border-left: 1px solid #dedede;
  padding: 10px;
  margin: 10px;
  float: right;
}

.header{
  border: 1px solid #dedede;
  background: #fffae6;
  width: 500px;
  height: 66px;
  border-radius: 35px;
  left: 29.17%;
  right: 29.17%;
  top: 9.57%;
  bottom: 87%;
  position: absolute;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.steps{
  position: absolute;
  margin-right: 55.25%;
  margin-top: 3.71%;
  width: 500px;
  text-align: center;
  color: #FF8A00
}

span.red {
  background: #FF8A00;
  border-radius: 0.8em;
  color: #ffffff;
  display: inline-block;
  font-weight: bold;
  line-height: 1.6em;
  text-align: center;
  width: 1.6em;
  padding: 0;
}

.delivery-left {
  height: 44px;
  margin-left: 0%;
  margin-right: 2.67%;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 44px;
  color: #FF8A00;
}

.delivery-right {
  font-family: Montserrat;
  float: right;
  margin-top: 15px;
}

.middle-left input, textarea{
  width: 350px;
  height: 60px;
}

.middle-right input{
  width: 350px;
  height: 60px;
}
/* untuk ukuran 1200px kebawah */
@media screen and (max-width: 1200px) {
  
  .container {
    width: 100%;
  }

  .steps {
    width: 100%;
  }

  .header {
    width: auto;
  }

  .span-red{
    width: auto;
  }

  .middle {
    width: 75%;
    float: left;
  }
  
  .right {
    clear: both;
    width: auto;
    float: none;
  }

  /*span.red {
    width: auto;
  }*/
}


/* untuk ukuran layar 820px kebawah */
@media screen and (max-width: 820px) {

  .steps {
    width: 100%;
  }

  .header {
    width: auto;
  }

  .span-red{
    width: auto;
  }

  .middle {
    width: auto;
    float: none;
  }
  
  .right {
    width: auto;
    float: none;
  }

  /*span.red {
    width: auto;
  }*/

}
</style>
