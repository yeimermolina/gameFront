<template>
  <div class="menu">
      <div class="row">
          <div class="col-12 m-2">
              <h1>Game of Drones</h1>
          </div>
          <div class="col-12 m-2">
              <button type="button" class="btn btn-outline-success btn-lg"><router-link to="/new-game">NEW GAME</router-link></button>
          </div>
          <div class="col-12 m-2">
              <button type="button" class="btn btn-outline-primary btn-lg"><router-link to="/statistics">STATISTICS</router-link></button>
          </div>
      </div>
  </div>
</template>
<script>
/* eslint-disable */
import {RouterLink} from 'vue-router'
export default {
}
</script>

<style scoped>
    .menu a {
        text-decoration: none;
        font-size: 20px;
        font-weight: bold;
        color: inherit;
    }
</style>
