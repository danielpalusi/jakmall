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
  							<div>
  								<div class="delivery-left">Shipment</div>
  								<button type="button" class="buttons buttons1" @click="buttonShipment('GO SEND',15000)" v-model="userData.shipment_type">
  									GO-SEND 15000 <span v-if="userData.shipment_type === 'GO SEND'">✓</span>
  								</button>
  								<button type="button" class="buttons buttons2" @click="buttonShipment('JNE',9000)" v-model="userData.shipment_type">
  									JNE 9000 <span v-if="userData.shipment_type === 'JNE'">✓</span>
  								</button>
  								<button type="button" class="buttons buttons3" @click="buttonShipment('Personal Courier',29000)" v-model="userData.shipment_type">
  									PERSONAL CARIER <span v-if="userData.shipment_type === 'Personal Courier'">✓</span>
  								</button>
  							</div>
  							<div>
  								<div class="delivery-left">Payment</div>
  								<button type="button" class="buttons buttons1" @click="buttonPayment('e-Wallet')" v-model="userData.shipment_type">
  									e-Wallet <span v-if="userData.payment_type === 'e-Wallet'">✓</span>
  								</button>
  								<button type="button" class="buttons buttons2" @click="buttonPayment('Bank Transfer')" v-model="userData.shipment_type">
  									Bank Transfer <span v-if="userData.payment_type === 'Bank Transfer'">✓</span>
  								</button>
  								<button type="button" class="buttons buttons3" @click="buttonPayment('Virtual Account')" v-model="userData.shipment_type">
  									Virtual Account <span v-if="userData.payment_type === 'Virtual Account'">✓</span>
  								</button>
  							</div>
  					</div>
  					<div class="right">
  						<br>
  						<div class="summary">
  							<span class="summary-title">Summary</span>
  							<p>{{totItem}} Item purchased</p>
  						</div>
  						<div class="down">
  							<div class="right-left">
  								<p>Cost of goods: </p>
  								<p v-if="userData.isDropshipper">Dropshipping fee: </p>
  								<p v-if="userData.shipment_type">{{userData.shipment_type}}: </p>
  								<p>Total : </p>
  							</div>
  							<div class="right-right">
  								<p>{{userData.cost_of_goods}}</p>
  								<p v-if="userData.isDropshipper">{{userData.dropshipper_fee}}</p>
  								<p v-if="userData.shipment_type">{{userData.shipment_value}}</p>
  								<p>{{userData.total}}</p>
  							</div>
  							<div class="submit">
  								<input v-if="userData.payment_type" type="submit" class="Rectangle-51 button" :value="'Payment using '+ userData.payment_type">
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
	export default {
	data () {
		return {
			totItem: 10,
			userData: {
				shipment_type: false,
				shipment_value: 0,
				payment_type: null,
				isDropshipper: false,
				cost_of_goods: 0,
				dropshipper_fee: 0,
				total: 0
			}
		}
	},
	created () {
		const tokenData = JSON.parse(window.localStorage.getItem('authUser'))
		this.userData.cost_of_goods= tokenData.cost_of_goods
		this.userData.isDropshipper= tokenData.isDropshipper
		if (this.userData.isDropshipper) {
			this.userData.dropshipper_fee= tokenData.dropshipper_fee
			this.userData.total= this.userData.total + this.userData.cost_of_goods + this.userData.dropshipper_fee
		} else {
			this.userData.total= this.userData.total + this.userData.cost_of_goods
		}
	},
	methods: {
		buttonShipment (type,value) {
			this.userData.shipment_type= type
			this.userData.shipment_value= value
			if (this.userData.isDropshipper) {
				this.userData.total= this.userData.cost_of_goods + this.userData.shipment_value + this.userData.dropshipper_fee
			} else {
				this.userData.total= this.userData.cost_of_goods + this.userData.shipment_value
			}
		},
		buttonPayment (value) {
			this.userData.payment_type = value
		},
		handleUpdateFormSubmit(){
			const authUserStep2= {}
			authUserStep2.cost_of_goods= this.userData.cost_of_goods
			authUserStep2.isDropshipper= this.userData.isDropshipper
			if(this.userData.isDropshipper){
				authUserStep2.dropshipper_fee= this.userData.dropshipper_fee
			}
			authUserStep2.shipment_type= this.userData.shipment_type
			authUserStep2.shipment_value= this.userData.shipment_value
			authUserStep2.payment_type= this.userData.payment_type
			window.localStorage.setItem('authUserStep2', JSON.stringify(authUserStep2))
			this.$router.push({path: 'step3'})
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
