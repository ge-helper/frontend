<template>
  <v-navigation-drawer app
    v-model="drawer">
    <v-layout column
      fill-height
      class="pb-2">
      <v-list two-line>
        <v-subheader>候選課程</v-subheader>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="require('@/assets/logo.png')">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>歷史文化經典：《資治通鑑(東漢部分)》選讀</v-list-tile-title>
            <v-list-tile-sub-title>核通 1．W9WaWb．萬德輝、鄭兆珉、林宗宏、陳韻晶、黃玠誠、魯才德</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider/>
      </v-list>
      <v-spacer></v-spacer>
      <v-divider></v-divider>
      <v-btn flat
        color="primary">複製科號與課名</v-btn>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppDrawer',
  data() {
    return {
      drawer: true,
    };
  },
};
</script>

<style>
</style>
