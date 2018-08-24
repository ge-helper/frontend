<template>
  <section id="course-log"
    class="py-3">
    <v-container grid-list-md
      style="max-width: 750px">
      <v-layout align-end
        row
        class="mb-2">
        <v-flex style="flex-shrink: 0;">
          <h2 class="display-1">通識紀錄</h2>
        </v-flex>
        <v-flex class="text-xs-right">
          <v-btn class="mr-0"
            color="primary"
            :loading="loading"
            @click="setImportDialog(true)">匯入</v-btn>
          <v-btn class="mr-0"
            color="secondary"
            :disabled="loading"
            @click="clearCourseLogs">清空</v-btn>
        </v-flex>
      </v-layout>
      <v-data-table :headers="headers"
        :items="geLogs"
        rows-per-page-text="每頁筆數"
        no-data-text="請先匯入修課紀錄或使用範例紀錄"
        :loading="loading"
        disable-initial-sort
        class="elevation-1 mb-2">
        <template slot="items"
          slot-scope="props">
          <td v-if="$vuetify.breakpoint.smAndUp">{{ props.item.semester }}</td>
          <td v-if="$vuetify.breakpoint.smAndUp">{{ props.item.no }}</td>
          <td>{{ props.item.name }}</td>
          <td v-if="$vuetify.breakpoint.smAndUp">{{ props.item.credit }}</td>
          <td :class="{'red--text': props.item.isPassed === '未及格'}">{{ props.item.isPassed }}</td>
        </template>
      </v-data-table>
      <v-layout justify-center>
        <v-btn v-if="courseLogs.length"
          to="/courses"
          large
          round
          dark
          color="pink"
          class="mt-5 mb-4">
          <v-icon left>stars</v-icon>查看通識列表</v-btn>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

const headers = [
  {
    text: '學年學期',
    value: 'semester',
  },
  {
    text: '科號',
    value: 'number',
  },
  {
    text: '科目名稱',
    sortable: false,
    value: 'name',
  },
  {
    text: '學分',
    sortable: false,
    value: 'credit',
  },
  {
    text: '是否及格',
    sortable: false,
    value: 'isPassed',
  },
];

export default {
  name: 'HomeCourseLog',
  computed: {
    ...mapGetters(['geLogs']),
    ...mapState(['courseLogs', 'loading']),
    headers() {
      return this.$vuetify.breakpoint.xs ? [headers[2], headers[4]] : headers;
    },
  },
  methods: {
    ...mapMutations(['setImportDialog', 'clearCourseLogs']),
  },
};
</script>

<style>
</style>
