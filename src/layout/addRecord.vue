<template>
   <card>
       <h2>Log A Record</h2>
    <form @submit.prevent>
      <base-input label="Enter Date"
                  type="date"
                  placeholder="Enter date"
                  v-model="date">
      </base-input>
      <base-input label="Time"
                  type="time"
                  placeholder="Enter Time"
                  v-model="time">
      </base-input>
        <base-input label="Category" >
                  <select id="" class="form-control" v-model="category">
                  <option selected>Choose...</option>
                  <option>Fasting Glucose</option>
                  <option>Snack</option>
                  <option>Before Breakfast</option>
                  <option>Breakfast</option>
                  <option>After Breakfast</option>
                  <option>Before Lunch</option>
                  <option>Lunch</option>
                  <option>After Lunch</option>
                  <option>Before Dinner</option>
                  <option>Dinner</option>
                  <option>After Dinner</option>
                  <option>Before Bed</option>
                  <option>Night</option>
                  <option>Before Excercise</option>
                  <option>After Excercise</option>
                </select>
      </base-input>
      <base-input label="Blood Glucose Level"
                  type="number"
                  placeholder="Enter Glucoe Level"
                  v-model="bloodGlucoseLevel">
      </base-input>
      <base-input label="Carbs"
                  type="number"
                  placeholder="Enter Carbs Taken"
                  v-model="carbs">
      </base-input>
        <base-input label="Insulin Type"
                  type="text"
                  placeholder="Enter Type"
                  v-model="insulinType">
      </base-input>
    <base-input label="Insulin Taken"
                  type="number"
                  placeholder="Insulin Taken"
                  v-model="insulin">
      </base-input>
      <base-input label="Extra Medications"
                    type="text"
                    placeholder="..."
                    v-model="extraMedication">
      </base-input>
        <base-input label="Any Notes"
                    type="text"
                    placeholder="..."
                    v-model="notes">
      </base-input>

     <base-button native-type="submit" type="primary" @click="add()">Add Record</base-button>
    </form>
</card>
    
</template>

<script>
import {db,auth} from "@/firebase/init";
export default {
    name:'addRecord',
    data(){
        return{
            user:{},
            date:null,
            time:null,
            category:null,
            bloodGlucoseLevel:null,
            carbs:null,
            insulinType:null,
            insulin:null,
            extraMedication:null,
            notes:null,
            timestamp:Date.now(),

        }
    },
    created(){
      // console.log(this.$authObject.email)
      auth.onAuthStateChanged((user)=>{
        this.user=user
        // console.log(user.email)
      })
      
    },
    methods:{
      add(){
          const upload={
            date:this.date,
            time:this.time,
            category:this.category,
            bloodGlucoseLevel:this.bloodGlucoseLevel,
            carbs:this.carbs,
            insulinType:this.insulinType,
            insulin:this.insulin,
            extraMedication:this.extraMedication,
            notes:this.notes,
            timestamp:this.timestamp,
            owner:this.user.email
          }
          db.collection('records').add(upload).then(()=>{
            console.log("Record Added Successfully")
            this.$notify({verticalAlign: 'bottom',type: 'success', message: 'Record Successfully Logged'})
            this.$router.push({path:'/viewRecord'})
            // clearing out inputs
            this.date=this.time=this.category=this.bloodGlucoseLevel=this.carbs=this.insulinType=this.insulin=this.extraMedication=this.notes=null
            this.timestamp=Date.now()
          }).catch((error)=>{
            console.log(error)
          })
          console.log(upload)
      }
    }
}
</script>

<style>
    option{
        color:black;
    }
</style>