/* eslint-disable no-console */

import Vue from 'vue/dist/vue.js';

import './firebase';
import './style.scss';

import * as playersRepository from './repositories/players';
import * as matchesRepository from './repositories/matches';
import { login, getLoggedInUser } from './authentication';
import { getMatchHistory, parseMatchInput } from './utils/match';
import { getPlayersWithStats } from './utils/stats';
import { validateMatch, validatePlayer } from './validation';
import { getRanksWithRatings } from './utils/rank';

new Vue({
  el: '#app',
  data: {
    players: [],
    loading: true,
    loggedIn: false,
    matches: [],
    playerInput: {
      success: '',
      errors: [],
      name: ''
    },
    matchInput: {
      success: '',
      errors: [],
      teams: { 0: [], 1: [] },
      rounds: { 0: [], 1: [], 2: [] }
    },
    ranks: getRanksWithRatings()
  },
  created() {
    this.loadMatches();
    getLoggedInUser().then(user => {
      this.loggedIn = Boolean(user);
    });
  },
  methods: {
    loadMatches() {
      Promise.all([
        playersRepository.getPlayers(),
        matchesRepository.getMatches()
      ])
        .then(([players, matches]) => {
          this.players = players;
          this.matches = matches;
          this.loading = false;
        })
        .catch(error => console.error(error));
    },
    login() {
      login();
    },
    savePlayer(event) {
      event.preventDefault();

      const name = this.playerInput.name.trim();
      const errors = validatePlayer(name, this.players);

      if (errors.length > 0) {
        this.playerInput.errors = errors;
        return;
      }

      this.playerInput.errors = [];

      playersRepository
        .savePlayer(name)
        .then(() => {
          this.playerInput.name = '';
          showSuccessMessage(this.playerInput, 'Saved player!');
          this.loadMatches();
        })
        .catch(error => {
          console.error(error);
          this.playerInput.errors = ['Failed to save player.'];
        });
    },
    saveMatch(event) {
      event.preventDefault();

      const match = parseMatchInput(this.matchInput);
      const errors = validateMatch(match);

      if (errors.length > 0) {
        this.matchInput.errors = errors;
        return;
      }

      this.matchInput.errors = [];

      matchesRepository
        .saveMatch(match)
        .then(() => {
          resetNumericObjectInputs(this.matchInput.teams);
          resetNumericObjectInputs(this.matchInput.rounds);
          showSuccessMessage(this.matchInput, 'Saved match!');
          this.loadMatches();
        })
        .catch(error => {
          console.error(error);
          this.matchInput.errors = ['Failed to save match.'];
        });
    }
  },
  computed: {
    playersWithStats() {
      return getPlayersWithStats(this.matches, this.players).filter(
        player => player.rank > 0
      );
    },
    unrankedPlayersWithStats() {
      return getPlayersWithStats(this.matches, this.players).filter(
        player => player.rank === 0
      );
    },
    matchHistory() {
      return getMatchHistory(this.matches, this.players);
    }
  }
});

function showSuccessMessage(inputObject, message, timeout = 5000) {
  inputObject.success = message;

  setTimeout(() => {
    inputObject.success = '';
  }, timeout);
}

function resetNumericObjectInputs(inputs) {
  Object.keys(inputs).forEach(key => (inputs[key] = []));
}
