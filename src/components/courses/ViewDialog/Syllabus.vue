<template>
  <div>
    <iframe v-show="viewCourse && viewCourse.syllabus.isPDF"
      :src="url"
      @load="load"
      style="width:100%;"
      :style="$vuetify.breakpoint.xs ? 'height:calc(100vh - 155px);' : 'height: calc(90vh - 155px);'"
      frameborder="0" />
    <v-layout v-show="viewCourse && viewCourse.syllabus.isPDF && loaded !== viewCourse.course_no"
      class="loading"
      justify-center
      align-center>
      <v-btn v-show="url !== loading"
        @click="preview"
        color="primary"
        outline>預覽 PDF</v-btn>
      <v-progress-circular v-show="url === loading"
        indeterminate
        color="primary" />
    </v-layout>
    <div class="pa-3"
      style="font-size: 13px;"
      v-if="viewCourse && !viewCourse.syllabus.isPDF"
      v-html="syllabusText" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'CoursesViewDialogSyllabus',
  data() {
    return {
      url: '',
      loading: 'nothing',
      loaded: '',
    };
  },
  computed: {
    ...mapState(['viewDialog']),
    ...mapGetters(['viewCourse']),
    syllabusText() {
      if (!this.viewCourse) return '';
      return this.viewCourse.syllabus.text.trim().replace(/\n/g, '<br/>');
    },
  },
  watch: {
    viewDialog() {
      if (!this.viewDialog) {
        this.url = '';
        this.loading = 'nothing';
        this.loaded = '';
      }
    },
  },
  methods: {
    load() {
      const { viewCourse } = this;
      if (!viewCourse || this.url === '') return;
      this.loaded = viewCourse.course_no;
      this.loading = '';
    },
    preview() {
      this.loading = `http://docs.google.com/gview?embedded=true&url=https://www.ccxp.nthu.edu.tw/ccxp/INQUIRE/JH/output/6_6.1_6.1.12/${
        this.viewCourse.course_no
      }.pdf`;
      this.url = this.loading;
    },
  },
};
</script>

<style lang="scss">
.loading {
  width: 100%;
  height: calc(100vh - 154px);
  max-height: calc(90vh - 155px);
  background-color: white;
  position: absolute;
  top: 0;
}
</style>
