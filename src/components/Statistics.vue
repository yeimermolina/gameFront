<template>
  <div class="container">
    <div class="row">
        <div class="col-12">
          <h1>Game Statistics</h1>
        </div>
    </div>
    <div class="row">
      <div class="col-6 col-md-6 table_title">
        Player Name
      </div>
      <div class="col-6 col-md-6 table_title">
        Wins
      </div>
    </div>
    <div class="row" v-for="player in results" v-bind:key="player.nickname">
      <div class="col-6 col-md-6">
        {{player.nickname}}
      </div>
      <div class="col-6 col-md-6">
        {{player.won_games}}
      </div>
    </div>
    <div class="row">
        <div class="col-12">
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <p v-if="busy">Loading results...</p>
            <p v-if="!next_result">No Results</p>
          </div>
        </div>
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
      results: [],
      next_result: '',
      busy: false
    }
  },
  created () {
    axios.get('/players')
      .then(response => {
        this.results = response.data.results
        this.next_result = response.data.next
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    loadMore () {
      if (this.next_result) {
        this.busy = true
        axios.get(this.next_result)
          .then(response => {
            this.results = this.results.concat(response.data.results)
            this.next_result = response.data.next
            this.busy = false
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style scoped>
  .table_title{
    font-weight: bold;
    color: green;
  }
  h1{
    color: green;
  }
</style>
