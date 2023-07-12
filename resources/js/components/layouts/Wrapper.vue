<template>
    <Fragment>
        <Navbar />
        <main class="d-flex justify-content-center align-items-center vh-100">
            <slot></slot>
        </main>
    </Fragment>
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
