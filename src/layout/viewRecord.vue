<template>
    <!-- <h2>Logged Records</h2> -->
    <div>

<card type="nav-tabs" v-for="(record) in this.records" :key="record.id" >

  <div slot="header" class="card-header-success">
    <b>{{record.date}} At {{record.time}} {{record.category}}</b>
      <!-- delete a record -->
       <div class="d-flex flex-row-reverse">
          <i class="tim-icons icon-trash-simple" @click="deleteRecord(record.id)"></i>
        </div>
  </div>
  <blockquote class="blockquote mb-0">
    <p>Blood Glucose Level : {{record.bloodGlucoseLevel}}<br>
    Carbs: {{record.carbs}}<br>
    Insulin:{{record.insulin}}</p>

    <footer class="blockquote-footer"> <cite title="Source Title">{{record.notes}}</cite></footer>
    <div class="d-flex flex-row-reverse">
      <router-link :to="{name:'editRecord',params:record}">
          <i class="tim-icons icon-pencil"></i>
          </router-link>
        </div>
  </blockquote>
</card>
    </div>  
</template>

<script>
import {db,auth} from "@/firebase/init";
export default {
   data() {
    return {
     records:[
            // {
            //     date:'11/11/2000',
            //     time:'12:12 AM',
            //     category:'morning',
            //     bloodGlucoseLevel:124,
            //     carbs:54,
            //     insulinType:'short',
            //     insulin:20,
            //     extraMedication:'crocin',
            //     notes:'Happy'
            // },
            // {
            //     date:'12/11/2000',
            //     time:'12:25 AM',
            //     category:'afternoon',
            //     bloodGlucoseLevel:124,
            //     carbs:54,
            //     insulinType:'long',
            //     insulin:18,
            //     extraMedication:'paracitamol',
            //     notes:'Very Happy'
            // },
            // {
            //     date:'11/11/2000',
            //     time:'12:12 AM',
            //     category:'morning',
            //     bloodGlucoseLevel:124,
            //     carbs:16,
            //     insulinType:'short',
            //     extraMedication:'crocin',
            //     notes:'Happiest'
            // },

        ]
    }
  },
  methods:{
    deleteRecord(id){
      console.log(id)
      db.collection('records').doc(id).delete().then(()=>{
        this.records=this.records.filter((record)=>{
          return record.id!=id
        })
      })
    }
  },
created(){


  auth.onAuthStateChanged((user)=>{ 
 let ref=db.collection('records').where("owner", "==",user.email).orderBy('timestamp','desc')
  ref.onSnapshot((snapshot)=>{
    snapshot.docChanges().forEach(change => {
      if(change.type=='added'){
        let doc=change.doc
        this.records.push({
          id:doc.id,
          date:doc.data().date,
          time:doc.data().time,
          category:doc.data().category,
          bloodGlucoseLevel:doc.data().bloodGlucoseLevel,
          carbs:doc.data().carbs,
          insulinType:doc.data().insulinType,
          insulin:doc.data().insulin,
          extraMedication:doc.data().extraMedication,
          notes:doc.data().notes,
          timestamp:doc.data().timestamp


        })
      }
    });
    // from global variable
    // console.log(this.$records)

    // const arr=[]
    // this.$records.forEach((record)=>{
    //   // console.log(record.insulin)
    //   let dt=new Date(record.timestamp)
    //   arr.push({insulin:record.insulin,
    //             date:dt.toDateString()})
    // })
    // console.log(arr)

  })

  })
}
}
</script>

<style>

</style>
