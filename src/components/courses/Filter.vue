<template>
  <div class="blue-grey lighten-5">
    <v-container style="max-width: 750px;">
      <h3 class="subheading">32 堂課程</h3>
      <div>
        <filter-dialog/>
        <v-menu v-if="!$vuetify.breakpoint.xs"
          offset-y
          :close-on-content-click="false">
          <v-btn slot="activator"
            outline
            color="secondary">
            分類
            <v-icon right>arrow_drop_down</v-icon>
          </v-btn>
          <v-list dense>
            <v-list-tile v-for="(item, index) in ['向度 1 (12)', '向度 2 (20)', '向度 3 (8)', '向度 4 (3)', '向度 5 (8)', '向度 6 (22)', ]"
              :key="index">
              <v-list-tile-action>
                <v-checkbox :label="item"></v-checkbox>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
      <div v-if="!$vuetify.breakpoint.xs">
        <v-chip class="ml-0"
          close>向度 1</v-chip>
        <v-chip close>向度 2</v-chip>
        <v-chip close>向度 3</v-chip>
        <v-btn small
          flat
          color="primary"
          class="mx-0">清除全部</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import FilterDialog from '@/components/courses/FilterDialog';

export default {
  name: 'CoursesFilter',
  components: {
    'filter-dialog': FilterDialog
  },
};
</script>