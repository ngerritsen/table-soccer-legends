import Vue from 'vue';
import '@fortawesome/fontawesome-free/js/all';

import { unique, flattenArray, numericObjectToArray } from './utils';
import * as playerRepository from './playerRepository';
import * as matchRepository from './matchRepository';

new Vue({
  el: '#app',
  data: {
    players: [],
    errors: [],
    loading: true,
    success: '',
    matches: [],
    matchInput: {
      teams: {
        0: [],
        1: []
      },
      rounds: {
        0: [],
        1: [],
        2: []
      }
    },
    ranks: [
      { name: 'Gold', color: 'warning' },
      { name: 'Silver', color: 'grey-light' },
      { name: 'Bronze', color: 'bronze' }
    ]
  },
  created() {
    this.loadMatches();
  },
  methods: {
    loadMatches() {
      playerRepository.getPlayers()
      .then(players => {
        this.players = players;
        return matchRepository.getMatches(players);
      })
      .then(matches => {
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
      }

      this.errors = [];

      matchRepository.saveMatch(match)
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
  }
});

function validateMatch(match) {
  const errors = [];

  if (unique(flattenArray(match.teams)).length !== 4) {
    errors.push('Teams are not complete, select 2 unique players per team.');
  }

  if (match.rounds.length < 1) {
    errors.push('Enter a minimum of 1 round.');
  }

  return errors;
}

function parseMatchInput(matchInput) {
  const teams = numericObjectToArray(matchInput.teams)
    .filter(players => players.length === 2);

  const rounds = numericObjectToArray(matchInput.rounds)
    .map(scores => scores.filter(Boolean))
    .filter(scores => scores.length === 2)
    .map(scores => scores.map(Number));

  return { rounds, teams };
}

function resetNumericObjectInputs(inputs) {
  Object.keys(inputs).forEach(key => inputs[key] = []);
}
