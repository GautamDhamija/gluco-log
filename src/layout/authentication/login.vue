<template>
<div class="center m-3">


    <card class="container abcd">
    <form @submit.prevent>
      <base-input label="Email address"
                  type="email"
                  placeholder="Enter email"
                  v-model="email">
          <small slot="helperText" id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </base-input>
      <base-input label="Password"
                  type="password"
                  placeholder="Password"
                  v-model="password">
      </base-input>

     <base-button native-type="submit" type="primary" @click="login()">Login</base-button>
    </form>
</card>
</div>

</template>

<script>
import {auth} from "@/firebase/init"
export default {
    name:'login',
    data(){
        return{
            email:"",
            password:""
        }
    },
    created(){
        auth.onAuthStateChanged((user)=>{
            if(user){
            console.log("User Logged in ",user.email)
            this.$router.push({path:"/"})
            }
        })
    },
    methods:{
        login(){
            console.log(this.email,this.password)
            auth.signInWithEmailAndPassword(this.email,this.password).then((cred)=>{
                console.log(cred)
                this.$router.push({path:"/"})
            }).catch((error)=>{
                console.log(error)
            })
        }
    }
}
</script>

<style>
.center { 
  height: 200px;
  position: relative;
}

.center .abcd {
  
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0);
}

</style>