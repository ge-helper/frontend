<template>
  <v-parallax src="https://images.pexels.com/photos/185699/pexels-photo-185699.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1260"
    style="height: 80vh;">
    <v-layout align-center
      column
      justify-center>
      <h1 class="display-2 mb-3">清大通識小幫手</h1>
      <h4 class="subheading mb-3">為您推薦適合的通識課程</h4>
      <div>
        <v-btn color="primary"
          @click="setImportDialog(true)">匯入修課紀錄</v-btn>
        <v-btn>使用範例紀錄</v-btn>
      </div>
    </v-layout>
  </v-parallax>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'HomeHero',
  methods: {
    ...mapMutations(['setImportDialog']),
  },
};
</script>