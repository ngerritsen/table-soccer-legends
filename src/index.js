import Vue from 'vue/dist/vue.js';

import './style.scss';
import * as playersRepository from './repositories/players';
import * as matchesRepository from './repositories/matches';
import { getMatchHistory, parseMatchInput } from './utils/match';
import { getPlayersWithStats } from './utils/stats';
import ranks from './ranks';
import { validateMatch } from './validation';

new Vue({
  el: '#app',
  data: {
    players: [],
    errors: [],
    loading: true,
    success: '',
    matches: [],
    matchInput: {
      teams: { 0: [], 1: [] },
      rounds: { 0: [], 1: [], 2: [] }
    },
    ranks
  },
  created() {
    this.loadMatches();
  },
  methods: {
    loadMatches() {
      Promise.all([playersRepository.getPlayers(), matchesRepository.getMatches()])
        .then(([players, matches]) => {
          this.players = players;
          this.matches = matches;
          this.loading = false;
        });
    },
    saveMatch(event) {
      event.preventDefault();

      const match = parseMatchInput(this.matchInput);
      const errors = validateMatch(match);
      
      if (errors.length > 0) {
        this.errors = errors;
        return;
      }

      this.errors = [];

      matchesRepository.saveMatch(match)
        .then(() => {
          resetNumericObjectInputs(this.matchInput.teams);
          resetNumericObjectInputs(this.matchInput.rounds);

          this.success = 'Saved match!';
          setTimeout(() => { this.success = '' }, 5000);

          this.loadMatches();
        })
        .catch((error) => {
          this.errors = ['Failed to save match.'];
        });
    }
  },
  computed: {
    playersWithStats() {
      return getPlayersWithStats(this.matches, this.players);
    },
    matchHistory() {
      return getMatchHistory(this.matches, this.players);
    }
  }
});

function resetNumericObjectInputs(inputs) {
  Object.keys(inputs).forEach(key => inputs[key] = []);
}
