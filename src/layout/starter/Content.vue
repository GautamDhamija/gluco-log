<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <!-- <h5>HELLO</h5> -->
      <router-view></router-view>
    </fade-transition>
  </div>
</template>
<script>
  import {FadeTransition} from 'vue2-transitions';
  export default {
    components: {
      FadeTransition
    }
  };
</script>
