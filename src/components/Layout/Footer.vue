<template>
	<footer class="bg-gray-100 py-2 text-blue-300">
		<div class="container text-right">
			<span class="font-bold text-sm">API Version: {{ version }}</span>
		</div>
	</footer>
</template>

<script>
import http from "@/services/HttpService";

export default {
	name: "Footer",

	data() {
		return {
			version: "Unknown",
		};
	},

	async created() {
		await this.fetchAppVersion();
	},

	methods: {
		async fetchAppVersion() {
			try {
				const { data } = await http.get("version");
				if (data.success) this.version = data.version;
			} catch (error) {
				this.version = "ERROR";
			}
		},
	},
};
</script>