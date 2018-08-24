<template>
  <div>
    <v-layout v-if="viewCourse && viewCourse.syllabus.isPDF"
      justify-center
      align-center
      style="min-height: calc(90vh - 155px);">
      <v-btn :href="`https://www.ccxp.nthu.edu.tw/ccxp/INQUIRE/JH/output/6_6.1_6.1.12/${this.viewCourse.course_no}.pdf`"
        target="_blank">開啟新視窗預覽 PDF 課綱</v-btn>
    </v-layout>
    <div v-if="viewCourse && !viewCourse.syllabus.isPDF"
      class="pa-3"
      style="font-size: 13px;"
      v-html="syllabusText" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'CoursesViewDialogSyllabus',
  computed: {
    ...mapGetters(['viewCourse']),
    syllabusText() {
      if (!this.viewCourse) return '';
      return this.viewCourse.syllabus.text.trim().replace(/\n/g, '<br/>');
    },
  },
};
</script>