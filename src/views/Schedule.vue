<template>
	<main class="flex-grow">
		<h1 class="text-2xl font-bold text-blue-800 mt-15 mb-5 text-center">League Schedule</h1>
		<Table :columns="columns" classes="schedule" :loading="loading">
			<template v-slot:rows>
				<tr v-for="(match, index) in matches" :key="index" class="border-b border-blue-50">
					<td class="text-right text-sm hidden md:table-cell">
						{{ formatDate(match.matchDate).date }}<br />
						{{ formatDate(match.matchDate).time }}
					</td>
					<td class="pl-20 text-left text-sm hidden lg:table-cell">{{ match.stadium }}</td>
					<td class="pr-4 md:pr-6">
						<div class="flex items-center gap-4 justify-end">
							<span class="font-bold">{{ match.homeTeam }}</span>
							<img class="object-cover country-flag" :src="`images/flags/${match.homeTeam}.png`" :alt="`${match.homeTeam} flag`" />
						</div>
					</td>
					<td class="text-center font-bold">{{ getMatchScore(match) }}</td>
					<td class="pl-4 md:pl-6">
						<div class="flex items-center gap-4 justify-start">
							<img class="object-cover country-flag" :src="`images/flags/${match.awayTeam}.png`" :alt="`${match.awayTeam} flag`" />
							<span class="font-bold">{{ match.awayTeam }}</span>
						</div>
					</td>
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
				{ name: "Date/Time", classes: "text-right w-1 hidden md:table-cell pl-6" },
				{ name: "Stadium", classes: "pl-20 text-left hidden lg:table-cell" },
				{ name: "Home Team", classes: "text-right pr-4 md:pr-6" },
				{ name: "", classes: "text-center" },
				{ name: "Away Team", classes: "text-left pl-4 md:pl-6" },
			],
			matches: [],
		};
	},

	mounted() {
		this.fetchMatches();
	},

	methods: {
		async fetchMatches() {
			this.loading = true;

			try {
				this.matches = await new LeagueService().getMatches();
			} catch (error) {
				console.error("Failed to fetch matches:", error);
			}

			this.loading = false;
		},

		formatDate(date) {
			const d = new Date(date);

			return {
				date: `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`,
				time: `${d.getHours()}:${d.getMinutes()}`,
			};
		},

		getMatchScore(match) {
			return match.matchPlayed ? `${match.homeTeamScore} : ${match.awayTeamScore}` : "- : -";
		},
	},
};
</script>