<template>
	<header class="bg-blue py-2.5 text-white">
		<div class="container">
			<div class="flex justify-between items-center">
				<router-link :to="{ name: 'home' }" title="Home page">
					<img class="object-contain select-none pointer-events-none" src="images/logo.svg" alt="Logo League Web UI" />
				</router-link>

				<nav class="flex gap-10">
					<router-link v-for="(menu, index) in menus" :key="index" :to="{ name: menu.name }" class="flex items-center gap-2 hover:text-gray-300">
						<img class="w-6" :src="`images/${menu.name}.png`" alt="" />
						{{ menu.title }}
					</router-link>
				</nav>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	name: "Header",

	data() {
		return {
			menus: [
				{
					title: "Schedule",
					name: "schedule",
				},
				{
					title: "Leaderboard",
					name: "leaderboard",
				},
			],
		};
	},
};
</script>