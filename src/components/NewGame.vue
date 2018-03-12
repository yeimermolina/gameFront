<template>
  <div class="row">
    <div class="col-sm-12">
      <h1>Enter player's names</h1>
    </div>
    <div class="col-sm-4 offset-sm-4">
        <form>
          <div class="form-group">
            <input type="text" class="form-control" id="player_name_1" placeholder="Player 1" v-model="player_name_1" @keyup="error_message=false">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" id="player_name_2" placeholder="Player 2" v-model="player_name_2" @keyup="error_message=false">
          </div>
        </form>
        <p v-if="error_message" class="text-danger">{{this.error_message}}</p>
        <button class="btn btn-primary btn-lg btn-block" type="button" @click="startGame">Start</button>
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
      player_name_1: '',
      player_name_2: '',
      error: false,
      error_message: ''
    }
  },
  methods: {
    startGame () {
      if (!this.isValid()) return
      const data = {
        player_1: this.player_name_1,
        player_2: this.player_name_2
      }
      axios.post('/', data)
        .then(response => {
          this.$router.push(
            {
              name: 'Rounds',
              params: {
                gameId: response.data.id,
                ...data
              }
            }
          )
        })
        .catch(error => {
          console.log(error)
        })
    },
    isValid () {
      if (this.player_name_1 === '' || this.player_name_2 === '') {
        this.error_message = 'Player name cannot be empty'
        return false
      }
      if (this.player_name_1 === this.player_name_2) {
        this.error_message = 'Players name must be different'
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>
</style>
