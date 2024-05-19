import NotFound from "@/views/Errors/404.vue";

export default [
	{
		path: "/not-found",
		name: "not-found",
		component: NotFound,
		meta: {
			title: "Not Found",
		},
	},
];
