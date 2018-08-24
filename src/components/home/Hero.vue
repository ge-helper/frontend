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
          @click="setImportDialog(true)"
          :loading="loading">匯入修課紀錄</v-btn>
        <v-btn @click="useExampleCourseLog">使用範例紀錄</v-btn>
      </div>
    </v-layout>
  </v-parallax>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { exampleCourseLogs } from '@/common/exampleCourseLogs';

export default {
  name: 'HomeHero',
  computed: {
    ...mapState(['loading']),
  },
  methods: {
    ...mapMutations(['setImportDialog', 'setId', 'setCourseLogs']),
    useExampleCourseLog() {
      this.setId(null);
      this.setCourseLogs(exampleCourseLogs);
      this.$vuetify.goTo('#course-log');
    },
  },
};
</script>