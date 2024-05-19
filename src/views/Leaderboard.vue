<template>
	<main class="flex-grow">
		<h1 class="text-2xl font-bold text-blue-800 mt-15 mb-5 text-center">League Standings</h1>
		<Table :columns="columns" :loading="loading">
			<template v-slot:rows>
				<tr v-for="(team, index) in leaderboard" :key="index" class="border-b border-blue-50">
					<td class="pl-3">
						<div class="flex items-center gap-4 justify-start">
							<img class="object-cover country-flag" :src="`images/flags/${team.teamName}.png`" :alt="`${team.teamName} flag`" />
							<span class="font-bold">{{ team.teamName }}</span>
						</div>
					</td>
					<td class="text-center">{{ team.matchesPlayed }}</td>
					<td class="text-center md:hidden">{{ team.goalsDifference }}</td>
					<td class="text-center hidden md:table-cell">{{ team.goalsFor }}</td>
					<td class="text-center hidden md:table-cell">{{ team.goalsAgainst }}</td>
					<td class="text-center font-bold text-blue">{{ team.points }}</td>
				</tr>
			</template>
		</Table>
	</main>
</template>

<script>
import LeagueService from "../services/LeagueService";

// Components
import Table from "@/components/Table.vue";

export default {
	components: {
		Table,
	},

	data() {
		return {
			loading: false,
			columns: [
				{ name: "Team Name", classes: "text-left pl-3" },
				{ name: "MP", classes: "text-center w-1 px-5 md:px-8" },
				{ name: "GD", classes: "text-center md:hidden w-1 px-5 md:px-8" },
				{ name: "GF", classes: "text-center hidden md:table-cell w-1 px-5 md:px-8" },
				{ name: "GA", classes: "text-center hidden md:table-cell w-1 px-5 md:px-8" },
				{ name: "Points", classes: "text-center w-1 px-5 md:px-8" },
			],
			leaderboard: [],
		};
	},

	mounted() {
		this.getLeaderboard();
	},

	methods: {
		async getLeaderboard() {
			this.loading = true;

			try {
				const service = new LeagueService();
				await service.fetchData();
				this.leaderboard = await service.getLeaderboard();
			} catch (error) {
				console.error("Failed to fetch leaderboard:", error);
			}

			this.loading = false;
		},
	},
};
</script>