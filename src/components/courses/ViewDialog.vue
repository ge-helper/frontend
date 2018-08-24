<template>
  <v-dialog v-model="viewDialog"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs"
    width="640">
    <v-card>
      <v-card-title>{{ viewCourse && viewCourse.course_title_zh }}</v-card-title>
      <v-divider/>
      <v-card-text class="pa-0"
        style="min-height: calc(100% - 107px);-webkit-overflow-scrolling: touch;">
        <v-tabs color="cyan"
          slider-color="yellow"
          dark>
          <v-tab>基本資訊</v-tab>
          <v-tab>課程大綱</v-tab>
          <v-tab>更多資訊</v-tab>
          <v-tab-item style="min-height: calc(90vh - 155px);">
            <courses-view-dialog-basic/>
          </v-tab-item>
          <v-tab-item style="min-height: calc(90vh - 155px);">
            <courses-view-dialog-syllabus :style="$vuetify.breakpoint.xs ? 'min-height: calc(100vh - 155px);' : 'min-height: calc(90vh - 155px);'" />
          </v-tab-item>
          <v-tab-item>
            <courses-view-dialog-more :style="$vuetify.breakpoint.xs ? 'min-height: calc(100vh - 155px);' : 'min-height: calc(90vh - 155px);'" />
          </v-tab-item>
        </v-tabs>
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn flat
          @click="viewDialog = false">關閉</v-btn>
        <v-btn v-if="viewCourse && candidates.includes(viewCourse.course_no)"
          color="error"
          flat
          @click="removeCourse">移出候選</v-btn>
        <v-btn v-else
          color="primary"
          flat
          @click="addCourse">加入候選</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Basic from '@/components/courses/ViewDialog/Basic';
import Syllabus from '@/components/courses/ViewDialog/Syllabus';
import More from '@/components/courses/ViewDialog/More';

export default {
  name: 'CoursesViewDialog',
  components: {
    'courses-view-dialog-basic': Basic,
    'courses-view-dialog-syllabus': Syllabus,
    'courses-view-dialog-more': More,
  },
  computed: {
    ...mapState(['candidates']),
    ...mapGetters(['viewCourse']),
    viewDialog: {
      get: mapState(['viewDialog']).viewDialog,
      set: mapMutations(['setViewDialog']).setViewDialog,
    },
  },
  methods: {
    ...mapMutations(['setViewDialog', 'addCandidate', 'removeCandidate']),
    addCourse() {
      this.addCandidate(this.viewCourse.course_no);
      this.setViewDialog(false);
    },
    removeCourse() {
      this.removeCandidate(this.viewCourse.course_no);
      this.setViewDialog(false);
    },
  },
};
</script>