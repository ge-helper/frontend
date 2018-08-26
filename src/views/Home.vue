<template>
  <v-layout class="hero"
    align-center
    column
    justify-center
    fill-height>
    <h1 class="display-2 mb-3">清大通識小幫手</h1>
    <h4 class="subheading mb-3">收錄 146 堂通識成績分佈</h4>
    <div>
      <v-btn color="primary"
        @click="openImportDialog"
        :loading="loading">匯入通識紀錄</v-btn>
      <v-btn to="/courses">查看通識列表</v-btn>
    </div>
  </v-layout>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'home',
  computed: {
    ...mapState(['loading']),
  },
  methods: {
    ...mapMutations(['setImportDialog']),
    openImportDialog() {
      FB.AppEvents.logEvent('importStart');
      this.setImportDialog(true);
    },
  },
};
</script>


<style lang="scss">
.hero {
  // background-image: url('https://images.pexels.com/photos/185699/pexels-photo-185699.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1260');
  background-image: url('https://images.pexels.com/photos/584305/pexels-photo-584305.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
