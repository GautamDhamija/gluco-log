<template>
  <div>
    <notifications></notifications>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
  import {auth,db} from '@/firebase/init'
  export default {
  created(){

  auth.onAuthStateChanged((user)=>{
    if(!user)
    this.$router.push({path:'/login'})

    this.$authObject=user
      let ref=db.collection('records').where("owner","==",this.$authObject.email).orderBy('timestamp','desc')
  ref.onSnapshot((snapshot)=>{
    this.$records.length=0
    snapshot.docChanges().forEach(change => {
      if(change.type=='added'){
        let doc=change.doc
        this.$records.push({
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
  })
  })
    },
    methods: {
      disableRTL() {
        if (!this.$rtl.isRTL) {
          this.$rtl.disableRTL();
        }
      },
      toggleNavOpen() {
        let root = document.getElementsByTagName('html')[0];
        root.classList.toggle('nav-open');
      }
    },
    mounted() {
      this.$watch('$route', this.disableRTL, { immediate: true });
      this.$watch('$sidebar.showSidebar', this.toggleNavOpen)
    }
  };
</script>

<style lang="scss"></style>
