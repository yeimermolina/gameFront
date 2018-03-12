<template>

    <div class="row" v-if="!game_status.game_over">
        <div class="col-sm-12">
            <h1>Round {{round}}</h1>
        </div>
        <div class="col-sm-12 col-md-6">
            <div class="col-12">
                 <h3>{{turn}}-{{player_names[turn]}}</h3>
            </div>
            <div class="col-12">
                <select v-model="selected" class="form-control form-control-lg">
                    <option disabled value="">Please select one</option>
                    <option  v-for="move in moves" :value="move.id" v-bind:key="move.id">{{move.name}}</option>
                </select>
            </div>
            <div class="col-12">
                <button type="button" @click="play" class="btn btn-success btn-block mt-2">Play</button>
            </div>
        </div>
        <div class="col-sm-12 col-md-6">
            <div class="col-12">
                 <h3>Scores</h3>
            </div>
            <div class="row">
                <div class="col-3">
                    <p>Round</p>
                    <p v-for="(score, index) in scores" v-bind:key="index">{{index + 1}}</p>
                </div>
                <div class="col-9">
                    <p>Winner</p>
                    <p v-for="score in scores" v-bind:key="score.id">{{score.round_winner}}</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="row">
      <div class="col-12">
          <h1>We have a Winner!!!</h1>
      </div>
      <div class="col-12">
          <h2>{{game_status.winner}} is the new EMPEROR!</h2>
      </div>
      <div class="col-12">
          <button class="btn btn-success btn-lg"><router-link to="/">NEW GAME</router-link></button>
      </div>
    </div>
</template>
<script>
/* eslint-disable */
import {RouterLink} from 'vue-router'
import axios from '../../axios'

export default {
  data () {
    return {
      selected: '',
      round: 1,
      moves: [],
      roundData: {
        game: '',
        move_player_1: '',
        move_player_2: ''
      },
      player_names: {
        1: '',
        2: ''
      },
      scores: [],
      turn: 1,
      game_status: {}
    }
  },
  created () {
    let self = this
    this.roundData.game = this.$route.params.gameId
    this.player_names['1'] = this.$route.params.player_1
    this.player_names['2'] = this.$route.params.player_2

    if (!this.roundData.game || !this.player_names['1'] || !this.player_names['2']) {
      this.$router.push(
        {
          name: 'NewGame'
        }
      )
    }
    axios.get('/moves')
      .then(response => {
        self.moves = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    play () {
      if (!this.selected) return
      this.roundData[`move_player_${this.turn}`] = this.selected
      if (this.turn !== 1) {
        this.turn = 1
        this.round++
        axios.post('/rounds', this.roundData)
          .then(response => {
            this.game_status = response.data.game_status
            this.scores.push(response.data)
            this.selected = ''
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.turn = 2
      }
    }
  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
    color: inherit;
  }
</style>
