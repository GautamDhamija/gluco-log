<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <card>
                    <form @submit.prevent>
                    <base-input label="First Name"
                                type="text"
                                placeholder="First Name"
                                v-model="fname">
                    </base-input>
                    <base-input label="Last Name"
                                type="text"
                                placeholder="Last Name"
                                v-model="lname">
                    </base-input>
                    <base-input label="Email address"
                                type="email"
                                placeholder="Enter email"
                                v-model="email">
                        <small slot="helperText" id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </base-input>
                    <base-input label="Phone Number"
                                type="number"
                                placeholder="Phone Number"
                                v-model="phone">
                    </base-input>
                    <base-input label="Password"
                                type="password"
                                placeholder="Password"
                                v-model="password">
                    </base-input>
                    <base-input label="re-Enter Password"
                                type="password"
                                placeholder="re-Enter Password"
                                v-model="rpassword">
                    </base-input>
                    <base-input label="Date of Birth"
                                type="date"
                                placeholder="Enter DOB"
                                v-model="DOB">
                    </base-input>
                    <base-input label="Diabetes type">
                    <select id="" class="form-control" v-model="diabetes_type">
                        <option selected>Choose...</option>
                        <option>Type 1</option>
                        <option>Type 2</option>
                    </select>
                    </base-input>
                    <base-input label="Height(in cm)"
                                type="number"
                                placeholder="Enter Height"
                                v-model="height">
                    </base-input>
                    <base-input label="Weight(in kg)"
                                type="number"
                                placeholder="Enter Height"
                                v-model="weight">
                    </base-input>
                    <base-input label="Food Intolerance"
                                type="text"
                                placeholder="Food Intolerance"
                                v-model="food_intolerance">
                    </base-input>
                    <base-input label="Medications You've Been Taking(Seprated By ',')"
                                type="text"
                                placeholder="Medications"
                                v-model="medications">
                    </base-input>
                    <base-input label="Other Treatments"
                                type="text"
                                placeholder="Other Treatments"
                                v-model="other_treatments">
                    </base-input>
                    <base-button native-type="submit" type="primary" @click="createUser()">Signup</base-button>
                    </form>
                </card>
            </div>
        </div>
    </div>
</template>

<script>
import {db,auth} from '@/firebase/init'
export default { 
    name:'signup',
    data(){
        return{
            fname:null,
            lname:null,
            phone:null,
            email:null,
            password:null,
            rpassword:null,
            DOB:null,
            diabetes_type:null,
            weight:null,
            height:null,
            food_intolerance:null,
            medications:null,
            other_treatments:null
        }
    },
    created(){

    },
    methods:{
    createUser(){
        if(this.password==this.rpassword){
                auth.createUserWithEmailAndPassword(this.email,this.password).then((cred)=>{
                //add email verification
                 console.log(cred)

                                //save user records
                                 db.collection('users').add({
                                    fname:this.fname,
                                    lname:this.lname,
                                    phone:this.phone,
                                    email:this.email,
                                    DOB:this.DOB,
                                    diabetes_type:this.diabetes_type,
                                    weight:this.weight,
                                    height:this.height,
                                    food_intolerance:this.food_intolerance,
                                    medications:this.medications,
                                    other_treatments:this.other_treatments
                                }).then(()=>{
                                    console.log('User Data Saved')
                                    this.$router.push({path:"/login"})
                                }).catch((error)=>{
                                    console.log(error)
                                })


                }).catch((error)=>{
                    console.log(error)
                })
        }else{
            alert("Passwords Doesnt Match")
        }

  
        console.log("hello")
    },
    // saveUserData(){
    //     db.collection('Users').add({
    //         fname:this.fname,
    //         lname:this.lname,
    //         phone:this.phone,
    //         email:this.email,
    //         DOB:this.DOB,
    //         diabetes_type:this.diabetes_type,
    //         weight:this.weight,
    //         height:this.height,
    //         food_intolerance:this.food_intolerance,
    //         medications:this.medications,
    //         other_treatments:this.other_treatments
    //     }).then(()=>{
    //         console.log('User Data Saved')
    //     }).catch((error)=>{
    //         console.log(error)
    //     })
    //     console.log("hello")
    // },
    // submit(){
    //     createUser()
    //     saverUserData()
    // }
    }

}
</script>

<style scoped>
.container{
    margin-top:20vh;
}
</style>