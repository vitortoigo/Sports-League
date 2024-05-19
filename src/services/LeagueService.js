import http from "./HttpService";
import LeaderboardSortService from "./LeaderboardSortService";

/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM,
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 *
 *       ADDITIONALLY, MAKE SURE THAT ALL LIBRARIES USED IN THIS FILE FILE ARE COMPATIBLE WITH PURE JAVASCRIPT
 *
 */
class LeagueService {
	constructor(matches = []) {
		this.matches = matches;
	}

	/**
	 * Sets the match schedule.
	 * Match schedule will be given in the following form:
	 * [
	 *      {
	 *          matchDate: [TIMESTAMP],
	 *          stadium: [STRING],
	 *          homeTeam: [STRING],
	 *          awayTeam: [STRING],
	 *          matchPlayed: [BOOLEAN],
	 *          homeTeamScore: [INTEGER],
	 *          awayTeamScore: [INTEGER]
	 *      },
	 *      {
	 *          matchDate: [TIMESTAMP],
	 *          stadium: [STRING],
	 *          homeTeam: [STRING],
	 *          awayTeam: [STRING],
	 *          matchPlayed: [BOOLEAN],
	 *          homeTeamScore: [INTEGER],
	 *          awayTeamScore: [INTEGER]
	 *      }
	 * ]
	 *
	 * @param {Array} matches List of matches.
	 */
	setMatches(matches) {
		this.matches = matches;
	}

	/**
	 * Returns the full list of matches.
	 *
	 * @returns {Array} List of matches.
	 */
	async getMatches() {
		if (this.matches.length === 0) {
			await this.fetchData();
		}

		return this.matches;
	}

	/**
	 * Returns the leaderboard in a form of a list of JSON objecs.
	 *
	 * [
	 *      {
	 *          teamName: [STRING]',
	 *          matchesPlayed: [INTEGER],
	 *          goalsFor: [INTEGER],
	 *          goalsAgainst: [INTEGER],
	 *          points: [INTEGER]
	 *      },
	 * ]
	 *
	 * @returns {Array} List of teams representing the leaderboard.
	 */
	getLeaderboard() {
		const teams = [];

		this.matches.forEach((match) => {
			teams[match.homeTeam] = this.updateTeamStats(match, "homeTeam", teams[match.homeTeam]);
			teams[match.awayTeam] = this.updateTeamStats(match, "awayTeam", teams[match.awayTeam]);
		});

		return this.sortedLeaderboard(teams);
	}

	/**
	 * Updates the team stats based on the current match.
	 * @param {Object} match Current match.
	 * @param {string} team Team type ('awayTeam' or 'homeTeam').
	 * @param {Object} teamStats Status in the leaderboard.
	 * @returns {Object} Updated team stats.
	 */
	updateTeamStats(match, team, teamStats) {
		const isHomeTeam = team === "homeTeam";

		if (!teamStats) {
			teamStats = {
				teamName: match[team],
				matchesPlayed: 0,
				goalsFor: 0,
				goalsAgainst: 0,
				goalsDifference: 0,
				points: 0,
			};
		}

		if (match.matchPlayed) {
			const teamScore = match[`${team}Score`];
			const opponentScore = match[`${isHomeTeam ? "awayTeam" : "homeTeam"}Score`];

			teamStats.matchesPlayed++;
			teamStats.goalsFor += teamScore;
			teamStats.goalsAgainst += opponentScore;
			teamStats.goalsDifference += teamScore - opponentScore;

			if (teamScore > opponentScore) {
				teamStats.points += 3;
			} else if (teamScore === opponentScore) {
				teamStats.points += 1;
			}
		}

		return teamStats;
	}

	/**
	 * Sort leaderboard teams
	 * @param {Array} teams List of teams.
	 * @return {Array} List of sorted teams in leaderboard.
	 */
	sortedLeaderboard(teams) {
		return LeaderboardSortService.sort(teams, this.matches);
	}

	/**
	 * Find head-to-head match between two teams.
	 * @param {Array} matches List of matches.
	 * @param {Object} teamA Team A.
	 * @param {Object} teamB Team B.
	 * @returns {Object} Head-to-head match.
	 */
	findDirectConfront(teamA, teamB) {
		return this.matches.find((match) => {
			if (!match) {
				return false;
			}

			const isTeamAMatch = match.homeTeam === teamA.teamName && match.awayTeam === teamB.teamName;
			const isTeamBMatch = match.homeTeam === teamB.teamName && match.awayTeam === teamA.teamName;

			return (isTeamAMatch || isTeamBMatch) && match.matchPlayed;
		});
	}

	/**
	 * Asynchronic function to fetch the data from the server and set the matches.
	 */
	async fetchData() {
		try {
			const { data } = await http.get(`${process.env.VUE_APP_VERSION}/getAllMatches`);

			if (!data.success) {
				throw new Error("Failed to fetch matches.");
			}

			this.setMatches(data.matches);
		} catch (error) {
			console.error("Error fetching matches:", error);
		}
	}
}

export default LeagueService;
