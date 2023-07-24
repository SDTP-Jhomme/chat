<template>
   <div>
      <Navbar />
      <RouterView />
   </div>
</template>

<script>
import { RouterView } from "vue-router";
import Navbar from "./layouts/Navbar.vue";
export default {
   components: {
      RouterView,
      Navbar,
   },
};
</script>
