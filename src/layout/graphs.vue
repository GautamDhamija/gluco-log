<template>
<div>
    <h4> Sum Insulin Taken Per Day</h4>

    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">{{$t('per Day')}}</h5>
                <h2 class="card-title">{{$t('Insulin Taken')}}</h2>
              </div>
              <div class="col-sm-6">
                <div class="btn-group btn-group-toggle"
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
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
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
    beforeCreate(){
    console.log(this.$records)
    },
    data() {
      return {
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
        // this.$records.forEach
    this.$records.forEach((data)=>{
       this.records.push({
          fullDate:data.date,
          month:data.date.split("-")[1],
          date:data.date.split("-")[2],
          year:data.date.split("")[0],
          time:data.time,
          category:data.category,
          bloodGlucoseLevel:data.bloodGlucoseLevel,
          carbs:data.carbs,
          insulinType:data.insulinType,
          insulin:data.insulin,
          extraMedication:data.extraMedication,
          notes:data.notes,

       })
      })
    },
    computed:{
        enableRTL() {
        return this.$route.query.enableRTL;
      },
      isRTL() {
        return this.$rtl.isRTL;
      },
        bigLineChartCategories() {
        // return this.$t('dashboard.chartCategories');
        let d=new Date()
        let monthArray=["JAN",'FEB','MAR','APRIL','MAY','JUN','JUL','AUG','SEPT','OCT','NOV','DEC']

        return monthArray.splice(0,d.getMonth()+1) 
        // return ["JAN",'FEB','MAR','APRIL','MAY','JUN','JUL','AUG','SEPT','OCT','NOV','DEC']
      }
    },
    methods:{
              initBigChart(monthNumber) {
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

      }
    },
    mounted(){
        this.i18n = this.$i18n;
      if (this.enableRTL) {
        this.i18n.locale = 'ar';
        this.$rtl.enableRTL();
      }
        this.initBigChart(0)
    },
    beforeDestroy() {
      if (this.$rtl.isRTL) {
        this.i18n.locale = 'en';
        this.$rtl.disableRTL();
      }
    }
}
</script>

<style>

</style>