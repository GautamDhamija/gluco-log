<template>
     <card>
       <h2>Edit A Record</h2>
    <form @submit.prevent>
      <base-input label="Enter Date"
                  type="date"
                  placeholder="Enter date"
                  v-model="record.date">
      </base-input>
      <base-input label="Time"
                  type="time"
                  placeholder="Enter Time"
                  v-model="record.time">
      </base-input>
        <base-input label="Category" >
                  <select id="" class="form-control" v-model="record.category">
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
                  v-model="record.bloodGlucoseLevel">
      </base-input>
      <base-input label="Carbs"
                  type="number"
                  placeholder="Enter Carbs Taken"
                  v-model="record.carbs">
      </base-input>
        <base-input label="Insulin Type"
                  type="text"
                  placeholder="Enter Type"
                  v-model="record.insulinType">
      </base-input>
    <base-input label="Insulin Taken"
                  type="number"
                  placeholder="Insulin Taken"
                  v-model="record.insulin">
      </base-input>
      <base-input label="Extra Medications"
                    type="text"
                    placeholder="..."
                    v-model="record.extraMedication">
      </base-input>
        <base-input label="Any Notes"
                    type="text"
                    placeholder="..."
                    v-model="record.notes">
      </base-input>

     <base-button native-type="submit" type="primary" @click="updateRecord()">Update Record</base-button>
    </form>
</card>

</template>


<script>
import {db} from "@/firebase/init";

export default {
    name:'editRecord',
    data(){
        return{
           record:{}
        }
    },
    created(){
        console.log(this.$route.params)
        this.record=this.$route.params
    },
    methods:{
        updateRecord(){
            db.collection('records').doc(this.$route.params.id).update(this.record).then(()=>{
                console.log("Succesfuly Updated")
                this.$notify({verticalAlign: 'bottom',type: 'success', message: 'Record Successfully Updated'})
                this.$router.push({path:'/viewRecord'})
            })
        },
    }

}
</script>
<style >

</style>