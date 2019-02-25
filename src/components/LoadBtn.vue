<template>
    <v-btn fab 
    :disabled="$wait.is('loading data')"
    :loading="$wait.is('loading data')"
    v-on:click="fetchDataBtnHandler"
    large color="rgb(105, 189, 255)">
    <v-icon color="white">alarm_on</v-icon></v-btn>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    methods: {
      fetchDataBtnHandler: function () {
        this.$wait.start('loading data')
        this.fetchData().then(() => {
          this.$wait.end('loading data')
        })
      },
      ...mapActions({fetchData: 'fetchData'})
    }
  }
</script>

<style>

</style>
