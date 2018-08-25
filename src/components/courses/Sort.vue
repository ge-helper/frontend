<template>
  <v-menu offset-y>
    <v-btn slot="activator"
      outline
      class="ml-0">
      {{ `排序方式：${sort}` }}
      <v-icon right>arrow_drop_down</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile v-for="(item, index) in ['相關性', '分數甜度', '熱門程度']"
        :key="index"
        @click="select(item)">
        <v-list-tile-title>{{ item }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import { mapMutations } from 'vuex';

const sortType = {
  相關性: 'sortRelevance',
  分數甜度: 'sortSweet',
  熱門程度: 'sortHot',
};

export default {
  name: 'CoursesSort',
  computed: {
    sort: {
      get() {
        return this.$store.state.sort;
      },
      set(value) {
        this.setSort(value);
      },
    },
  },
  methods: {
    ...mapMutations(['setSort', 'setPagination']),
    select(item) {
      FB.AppEvents.logEvent(sortType[item]);
      this.sort = item;
      this.setPagination({ page: 1 });
    },
  },
};
</script>

<style>
</style>
