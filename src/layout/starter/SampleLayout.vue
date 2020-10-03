<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" :name="$t('sidebar.dashboard')" icon="tim-icons icon-chart-pie-36"/>
        <sidebar-link to="/addRecord" :name="$t('add')" icon="tim-icons icon-simple-add"/>
        <sidebar-link to="/viewRecord" :name="$t('logged')" icon="tim-icons icon-book-bookmark"/>
        <sidebar-link to="/calculator" :name="$t('calculator')" icon="tim-icons icon-notes" />
        <sidebar-link to="/graphs" :name="$t('graphs')" icon="tim-icons icon-chart-bar-32" />
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <!-- <content-footer></content-footer> -->
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
  import TopNavbar from "./SampleNavbar.vue";
  import ContentFooter from "./SampleFooter.vue";
  import DashboardContent from "./Content.vue";
  import MobileMenu from "./MobileMenu";
  import {db, auth} from "@/firebase/init"
  export default {
    data(){
      // Vue.prototype.$hello="hello"
      return{
        records:[]
      }
    },
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
  //   created(){

  // auth.onAuthStateChanged((user)=>{
  //   if(!user)
  //   this.$router.push({path:'/login'})

  //   this.$authObject=user
  //     let ref=db.collection('records').where("owner","==",this.$authObject.email).orderBy('timestamp','desc')
  // ref.onSnapshot((snapshot)=>{
  //   this.$records.length=0
  //   snapshot.docChanges().forEach(change => {
  //     if(change.type=='added'){
  //       let doc=change.doc
  //       this.$records.push({
  //         id:doc.id,
  //         date:doc.data().date,
  //         time:doc.data().time,
  //         category:doc.data().category,
  //         bloodGlucoseLevel:doc.data().bloodGlucoseLevel,
  //         carbs:doc.data().carbs,
  //         insulinType:doc.data().insulinType,
  //         insulin:doc.data().insulin,
  //         extraMedication:doc.data().extraMedication,
  //         notes:doc.data().notes,
  //         timestamp:doc.data().timestamp


  //       })
  //     }
  //   });
  // })
  // })
  //   },
    
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      },
    }
  };
</script>
