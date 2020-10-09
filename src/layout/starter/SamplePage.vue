<template >
  <div>
    <h3 class="text-center">This application is in making. Thanks for joining :)</h3>

        <div class='abcd'>
      <base-dropdown menu-classes="dropdown-black"
                title-classes="btn btn-secondary"
                title="View For"
                class=""
                >
                  <a class="dropdown-item" @click="orginalGraph()">Last 15 Logged</a>
                  <div class="dropdown-divider"></div>
                  <h6 class="dropdown-header">View Values For</h6>
                  
                  <a class="dropdown-item" v-for ="(items,index) in dropdownItems" :key="index" @click="viewFor(items)" >{{items}}</a>
              </base-dropdown>
      </div>

    <div class="row">
      <div class="col-12">

 
        <div class="" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <div class="row">
            <div class="col-sm-6">
            <h5 class="card-category">{{chartFor}}</h5>
            <h3 class="card-title">Blood Sugar Levels </h3>
            </div>
            <div class="col-sm-6">
               
            </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        ref="sChart"
                        chart-id="purple-line-chart"
                        :chart-data="purpleLineChart.chartData"
                        :gradient-colors="purpleLineChart.gradientColors"
                        :gradient-stops="purpleLineChart.gradientStops"
                        :extra-options="purpleLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>

      </div>

      <div class="col-sm-12 d-flex justify-content-center">

        <div class="row">
          <div class="col-sm d-flex justify-content-center">
        <router-link :to="{name:'viewRecord'}">
          <base-button class="" type="success">View Records</base-button>
        </router-link>
          </div>

         <div class="col-sm d-flex justify-content-center">
        <router-link :to="{name:'addRecord'}">
        <base-button class="" type="success">Log A Record</base-button>
        </router-link>
         </div>

        <div class="col-sm d-flex justify-content-center">
        <router-link :to="{name:'calculator'}">
        <base-button class="" type="warning">Bolus Calculator</base-button>
        </router-link>
        </div>

        </div>

      </div>

    <div class="col-12 mt-4">
      <card>
        <h4 class="text-center">Last Logged:</h4>
        <p>{{records[0].fullDate}} At {{records[0].time}} {{records[0].category}}</p>
        <div class="row">
          <div class="col-6">
                Glucose Level: {{records[0].bloodGlucoseLevel}} <br>
                Insulin Type: {{records[0].insulinType}}   <br>
                Insulin Taken: {{records[0].insulin}} <br>


          </div>
          <div class="col-6">
                Carbs: {{records[0].carbs}} <br>
                Extra Medication: {{records[0].extraMedication}} <br>
                Note: {{records[0].notes}}

          </div>
          
          
        </div>
      </card>
    </div>

    </div>


  </div>
</template>
<script>
  import LineChart from '@/components/Charts/LineChart';
  // import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import config from '@/config';
  import {db,auth} from '@/firebase/init'
  import {fakeData} from '@/fakedata/data'

  export default {
    components: {
      LineChart,

    },
   
    data() {
      return {
        records:[],
        purpleLineChart: {
          extraOptions: chartConfigs.purpleChartOptions,
          chartData: {
            labels:[],
            datasets: [{
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data:[]
            }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.2, 0],
        },
        dropdownItems:['Fasting Glucose','Snack','Before Breakfast','Breakfast','After Breakfast','Before Lunch','Lunch','After Lunch','Before Dinner','Dinner','After Dinner','Before Bed','Night','Before Excercise','After Excercise'],
        chartFor:"For Last 15 Logged"

      } 
    },
     created(){

        auth.onAuthStateChanged((user)=>{
        console.log(user.email)


        db.collection('records').where('owner','==',user.email).orderBy('timestamp','desc').get().then((snapshot)=>{
        snapshot.docs.forEach((doc)=>{
          this.records.push({
          id:doc.id,
          fullDate:doc.data().date,
          month:doc.data().date.split("-")[1],
          date:doc.data().date.split("-")[2],
          year:doc.data().date.split("-")[0],
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

        })

        // To refer chart : this.$refs.bigChart

      const showDataFor=()=>{
        if(this.records.length>15)
        return 15
        else
        return this.records.length
      }
      console.log(showDataFor())
      for(let i=0;i<showDataFor();i++){
        this.purpleLineChart.chartData.labels.push(this.records[i].category.toString())
        this.purpleLineChart.chartData.datasets[0].data.push(this.records[i].bloodGlucoseLevel)
        // this.$refs.sChart.renderChart(this.purpleLineChart.chartData,this.purpleLineChart.extraOptions)
      }
 
        

   

      })




      })
    

       

    },
    computed: {
      enableRTL() {
        return this.$route.query.enableRTL;
      },
      isRTL() {
        return this.$rtl.isRTL;
      },
    },
    methods: {
      viewFor(items){

        console.log(items)

        this.purpleLineChart.chartData.labels.length=0
        this.purpleLineChart.chartData.datasets[0].data.length=0

        this.records.forEach((recd)=>{
          if(items.localeCompare(recd.category)==0){
            
            console.log(recd.category,recd.bloodGlucoseLevel,recd.date+"/"+recd.month)
            this.purpleLineChart.chartData.labels.push(recd.date+"/"+recd.month)
            this.purpleLineChart.chartData.datasets[0].data.push(recd.bloodGlucoseLevel)

          }
        })

            console.log(this.purpleLineChart.chartData.labels)
            console.log(this.purpleLineChart.chartData.datasets[0].data)
            console.log(this.purpleLineChart.chartData)
            this.chartFor=items
            this.$refs.sChart.renderChart(this.purpleLineChart.chartData,this.purpleLineChart.extraOptions)
          
        },
        orginalGraph(){
          const showDataFor=()=>{
            if(this.records.length>15)
            return 15
            else
            return this.records.length
          }
          console.log(showDataFor())
          for(let i=0;i<showDataFor();i++){
            this.purpleLineChart.chartData.labels.push(this.records[i].category.toString())
            this.purpleLineChart.chartData.datasets[0].data.push(this.records[i].bloodGlucoseLevel)
            this.chartFor='For Last 15 Logged'
            this.$refs.sChart.renderChart(this.purpleLineChart.chartData,this.purpleLineChart.extraOptions)
          }
        }
    },
    mounted() {
      this.i18n = this.$i18n;
      if (this.enableRTL) {
        this.i18n.locale = 'ar';
        this.$rtl.enableRTL();
      }
    },
    beforeDestroy() {
      if (this.$rtl.isRTL) {
        this.i18n.locale = 'en';
        this.$rtl.disableRTL();
      }
    }
  };
</script>
<style scoped>
.abcd{
  position: relative;
  right: 25px !important;
  padding-left: 54vw !important;
  width: 100%;
  height: 50px;
  /* border: 3px solid green; */
  /* z-index: 100000 !important; */
}
</style>
