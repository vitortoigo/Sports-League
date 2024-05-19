import LeagueService from "./LeagueService";

class LeaderboardSortService {
	/**
	 * Sorts the teams in the leaderboard.
	 * @param {Array} teams List of teams to be sorted.
	 * @param {Array} matches List of matches.
	 * @returns {Array} Sorted list of teams.
	 */
	sort(teams, matches) {
		return Object.values(teams).sort((a, b) => {
			const tiedTeams = Object.values(teams).filter((team) => team.points === a.points);
			const hasTiedTeams = tiedTeams.length >= 2;

			if (hasTiedTeams) {
				return this.sortTiedTeams(tiedTeams, matches, a, b);
			}

			return b.points - a.points;
		});
	}

	/**
	 * Sorts tied teams based on head-to-head confrontations and goal difference.
	 * @param {Array} tiedTeams List of tied teams.
	 * @param {Array} matches List of matches.
	 * @param {Object} a Team object.
	 * @param {Object} b Team object.
	 * @returns {number} Comparison result.
	 */
	sortTiedTeams(tiedTeams, matches, a, b) {
		const confrontResults = this.calculateConfrontResults(tiedTeams, matches);

		const result = confrontResults.reduce((result, confront) => {
			if (confront) {
				const homeTeamScore = confront.homeTeamScore;
				const awayTeamScore = confront.awayTeamScore;
				const isHomeTeamA = a.teamName === confront.homeTeam;

				if (homeTeamScore !== awayTeamScore) {
					return this.compareScores(homeTeamScore, awayTeamScore, isHomeTeamA);
				} else {
					return this.compareByGoalDifference(a, b);
				}
			}
		}, 0);

		return result;
	}

	/**
	 * Calculates confrontations between tied teams.
	 * @param {Array} tiedTeams List of tied teams.
	 * @param {Array} matches List of matches.
	 * @returns {Array} List of confrontations.
	 */
	calculateConfrontResults(tiedTeams, matches) {
		const confrontResults = [];
		for (let i = 0; i < tiedTeams.length; i++) {
			for (let j = i + 1; j < tiedTeams.length; j++) {
				const confront = new LeagueService(matches).findDirectConfront(tiedTeams[i], tiedTeams[j]);
				if (confront) {
					confrontResults.push(confront);
				}
			}
		}
		return confrontResults;
	}

	/**
	 * Compares tied teams by goal difference.
	 * @param {Object} a Team object.
	 * @param {Object} b Team object.
	 * @returns {number} Comparison result.
	 */
	compareByGoalDifference(a, b) {
		const goalDifferenceA = a.goalsFor - a.goalsAgainst;
		const goalDifferenceB = b.goalsFor - b.goalsAgainst;

		if (goalDifferenceA === goalDifferenceB) {
			return b.goalsFor - a.goalsFor;
		} else {
			return goalDifferenceB - goalDifferenceA;
		}
	}

	/**
	 * Compares the scores of two teams in a head-to-head confrontation.
	 * @param {number} homeTeamScore - Points scored by the home team.
	 * @param {number} awayTeamScore - Points scored by the away team.
	 * @param {boolean} isHomeTeamA - Indicates whether Team A is the home team.
	 * @returns {number} A negative value if Team A is ahead in points or positive if Team B is ahead.
	 */
	compareScores(homeTeamScore, awayTeamScore, isHomeTeamA) {
		const scoreDifference = homeTeamScore - awayTeamScore;
		return scoreDifference * (isHomeTeamA ? -1 : 1);
	}
}

export default new LeaderboardSortService();
