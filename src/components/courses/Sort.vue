<template>
  <v-menu offset-y>
    <v-btn slot="activator"
      flat
      class="ml-0">
      排序方式：相關度
      <v-icon right>arrow_drop_down</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile v-for="(item, index) in ['相關程度', '熱門程度', '分數甜度']"
        :key="index">
        <v-list-tile-title>{{ item }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'CoursesSort',
};
</script>

<style>
</style>
