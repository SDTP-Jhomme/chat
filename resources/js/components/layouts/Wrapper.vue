<template>
   <div>
      <Navbar />
      <main class="container-md">
         <slot></slot>
      </main>
   </div>
</template>

<script>
import { Fragment } from "vue-fragment";
import Navbar from "./Navbar.vue";
export default {
   components: {
      Fragment,
      Navbar,
   },
};
</script>
