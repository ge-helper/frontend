<template>
  <div>
    <iframe v-if="viewCourse && viewCourse.syllabus.isPDF"
      :src="syllabusURL"
      @load="loaded = viewCourse.course_no"
      style="width:100%; height:calc(100vh - 155px); max-height:calc(90vh - 48px - 155px);"
      frameborder="0" />
    <v-layout v-if="isLoading"
      class="loading"
      justify-center
      align-center>
      <v-progress-circular indeterminate
        color="primary" />
    </v-layout>
    <div class="pa-3"
      style="font-size: 13px;"
      v-if="viewCourse && !viewCourse.syllabus.isPDF"
      v-html="syllabusText" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CoursesViewDialogSyllabus',
  data() {
    return {
      loaded: '',
    };
  },
  computed: {
    ...mapGetters(['viewCourse']),
    isLoading() {
      const { viewCourse, loaded } = this;
      return (
        viewCourse &&
        viewCourse.syllabus.isPDF &&
        loaded !== viewCourse.course_no
      );
    },
    syllabusURL() {
      if (!this.viewCourse) return '';
      return `http://docs.google.com/gview?embedded=true&url=https://www.ccxp.nthu.edu.tw/ccxp/INQUIRE/JH/output/6_6.1_6.1.12/${
        this.viewCourse.course_no
      }.pdf`;
    },
    syllabusText() {
      if (!this.viewCourse) return '';
      return this.viewCourse.syllabus.text.trim().replace(/\n/g, '<br/>');
    },
  },
};
</script>

<style lang="scss">
.loading {
  width: 100%;
  height: calc(100vh - 154px);
  max-height: 500px;
  background-color: white;
  position: absolute;
  top: 0;
}
</style>
