import { createRouter, createWebHistory } from "vue-router";

// Routes
import ErrorRoutes from "./Errors";

// Views
import Leaderboard from "@/views/Leaderboard.vue";
import Schedule from "@/views/Schedule.vue";
import { setAuthorizationHeader } from "../services/HttpService";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		// Redirect all not found routes to 404
		{
			path: "/:catchAll(.*)",
			redirect: "/not-found",
		},

		{
			path: "/",
			name: "home",
			component: Schedule,
			meta: {
				title: "Schedule",
			},
		},

		{
			path: "/leaderboard",
			name: "leaderboard",
			component: Leaderboard,
			meta: {
				title: "Leaderboard",
			},
		},

		{
			path: "/schedule",
			name: "schedule",
			component: Schedule,
			meta: {
				title: "Schedule",
			},
		},

		...ErrorRoutes,
	],
});

router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} | ${process.env.VUE_APP_TITLE}`;

	setAuthorizationHeader();

	next();
});

export default router;
