<template >
  <div>
    <h3 class="text-center">This application is in making. Thanks for joining :)</h3>
    <div class="row">
      <div  class="col-12">
        <card type="chart"> 
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">{{$t('per Day')}}</h5>
                <h2 class="card-title">{{$t('Insulin Taken')}}</h2>
              </div>
              <div v-if="loaded" class="col-sm-6">
                <div class="row ">
                <div class="btn-group btn-group-toggle col-sm"
                     :class="isRTL ? 'float-left' : 'float-right'"
                     data-toggle="buttons">
                  <label v-for="(option, index) in bigLineChartCategories"
                         :key="option"
                         class="btn btn-sm btn-primary btn-simple"
                         :class="{active: bigLineChart.activeIndex === index}"
                         :id="index">
                    <input type="radio"
                           @click="initBigChart(index)"
                           name="options" autocomplete="off"
                           :checked="bigLineChart.activeIndex === index"
                           >
                    {{option}}
                  </label>
                </div>
              </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        v-if=loaded
                        ref="bigChart"
                        chart-id="big-line-chart"
                        :chart-data="bigLineChart.chartData"
                        :gradient-colors="bigLineChart.gradientColors"
                        :gradient-stops="bigLineChart.gradientStops"
                        :extra-options="bigLineChart.extraOptions">
            </line-chart>
          </div>
        </card> 
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
        <base-button class="" type="warning" @click="$notify({verticalAlign: 'bottom',type: 'success', message: 'Success Notification'})">Bolus Calculator</base-button>
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
      // BarChart,

    },
   
    data() {
      return {
        loaded:false,
        records:[],
        bigLineChart: {
          allData: [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //for jan
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //for feb
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //2
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//3
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//4
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//5
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//6
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//7
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//8
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//9
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//10
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//11
        
          ],
          activeIndex: 0,
          chartData: {
            datasets: [{ }],
            labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          },
          extraOptions: chartConfigs.purpleChartOptions,
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
          categories: []
        },

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

        //  initBigChart(0)
        // console.log(this.records)
        // console.log(fakeData)
        this.records.forEach((record)=>{
        console.log({month:record.month,
                    date:record.date,
                    insulin:record.insulin})

        //             if(monthNumber==parseInt(record.month))
        this.bigLineChart.allData[parseInt(record.month)-1][parseInt(record.date)-1]+=parseInt(record.insulin)
        })
        console.log(this.bigLineChart.allData)

        this.loaded=true

      })




      })
    

       



      // this.records=[...fakeData]

      // fakeData.forEach((data)=>{
      //  this.records.push({
      //     fullDate:data.date,
      //     month:data.date.split("-")[1],
      //     date:data.date.split("-")[2],
      //     year:data.date.split("")[0],
      //     time:data.time,
      //     category:data.category,
      //     bloodGlucoseLevel:data.bloodGlucoseLevel,
      //     carbs:data.carbs,
      //     insulinType:data.insulinType,
      //     insulin:data.insulin,
      //     extraMedication:data.extraMedication,
      //     notes:data.notes,

      //  })
      // })

      // setInterval(function() {
      //    console.log("timeout")
      //    }, 4000)
    },
    computed: {
      enableRTL() {
        return this.$route.query.enableRTL;
      },
      isRTL() {
        return this.$rtl.isRTL;
      },
      bigLineChartCategories() {
        // return this.$t('dashboard.chartCategories');
        let d=new Date()
        console.log(d.getMonth())

        let monthArray=["JAN",'FEB','MAR','APRIL','MAY','JUN','JUL','AUG','SEPT','OCT','NOV','DEC']

      // console.log( monthArray.splice(0,d.getMonth()+1 )   )
      return monthArray.splice(0,d.getMonth()+1)
      // const apj=monthArray.splice(0,d.getMonth()+1 )
      // return apj
        // return ["JAN",'FEB','MAR','APRIL','MAY','JUN','JUL','AUG','SEPT','OCT','NOV','DEC']
      }
    },
    methods: {
      initBigChart(monthNumber) {
        
        console.log(this.loaded)
      // this.bigLineChart.allData[monthNumber][date-1]=insulinIntake

      this.bigLineChart.allData[monthNumber]=(new Array(31)).fill(0)
      this.records.forEach((record)=>{
        console.log({month:record.month,
                    date:record.date,
                    insulin:record.insulin})

        //             if(monthNumber==parseInt(record.month))
        this.bigLineChart.allData[ parseInt(record.month)-1 ][parseInt(record.date)-1]+=parseInt(record.insulin)
        // if(monthNumber==parseInt(record.month))
        // this.bigLineChart.allData[ monthNumber-1 ][parseInt(record.date)-1]=parseInt(record.insulin)


      })
              // this.bigLineChart.allData[9][9]=15
              



        let chartData = {
          datasets: [{
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
            data: this.bigLineChart.allData[monthNumber]
          }],
          // labels: ['1', '2', '3', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          labels:this.dates(monthNumber)
        }
        this.$refs.bigChart.updateGradients(chartData);
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = monthNumber;
      },
      dates(monthNumber){
        if(monthNumber==1)
        return ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29']
        else if(monthNumber==0 ||monthNumber==2 ||monthNumber==4||monthNumber==6||monthNumber==7||monthNumber==9||monthNumber==11)
        return ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
        else 
        return ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30']

      },
     
    },
    mounted() {
      this.i18n = this.$i18n;
      if (this.enableRTL) {
        this.i18n.locale = 'ar';
        this.$rtl.enableRTL();
      }

      // this.$watch('chartData',(newVal,oldVal)=>{
      //   this.updateGradients(newVal)
      //   if(!oldValue){
      //     this.renderChart(
      //       this.chartData,
      //       this.extraOptions
      //     )
      //   }
      // })

      //  setInterval(function() {
      //    console.log("timeout")
      //          this.initBigChart(0);
      //    }, 4000)       
      this.initBigChart(0);
    },
    beforeDestroy() {
      if (this.$rtl.isRTL) {
        this.i18n.locale = 'en';
        this.$rtl.disableRTL();
      }
    }
  };
</script>
<style>
</style>
