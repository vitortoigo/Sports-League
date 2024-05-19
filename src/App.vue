<template>
	<Header />
	<RouterView />
	<Footer />
</template>

<script>
import { RouterView } from "vue-router";
import Header from "./components/Layout/Header.vue";
import Footer from "./components/Layout/Footer.vue";

export default {
	components: {
		RouterView,
		Header,
		Footer,
	},
};
</script>