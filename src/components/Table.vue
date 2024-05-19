<template>
	<table class="table-auto align-top mx-auto text-blue-300" :class="classes">
		<thead class="bg-blue-50 text-xs">
			<tr>
				<th colspan="1" v-for="(column, index) in columns" :key="index" :class="column.classes" class="">{{ column.name }}</th>
			</tr>
		</thead>
		<tbody>
			<slot name="rows"></slot>
		</tbody>
	</table>
	<Loader v-if="loading"></Loader>
</template>

<script>
import Loader from "@/components/Loader.vue";

export default {
	name: "Table",

	components: {
		Loader,
	},

	props: {
		columns: {
			type: Array,
			required: true,
		},
		classes: {
			type: String,
		},
		loading: {
			type: Boolean,
			default: false,
		},
		// rows: {
		// 	type: Array,
		// 	required: true,
		// },
	},
};
</script>

<style>
table {
	width: 90%;
}

thead tr {
	height: 40px;
}

tbody tr {
	height: 70px;
}

tbody tr:last-child {
	border-bottom: none;
}

.schedule tbody tr:nth-child(even) {
	@apply bg-gray-100;
}
</style>