<template>
  <v-navigation-drawer app
    v-model="drawer">
    <v-layout column
      fill-height
      class="pb-2">
      <v-subheader>候選課程</v-subheader>
      <v-list two-line
        v-if="candidateCourses.length">
        <template v-for="(c, i) in candidateCourses">
          <v-divider v-if="i"
            :key="i" />
          <v-list-tile :key="i + candidateCourses.length"
            avatar
            @click="openViewDialog(c.course_no)">
            <v-list-tile-avatar>
              <img :src="require('@/assets/logo.png')">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ c.course_title_zh }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ `${c.category}．${c.time}．${c.teachers}` }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <v-layout v-if="!candidateCourses.length"
        style="flex-grow: 1;"
        column
        justify-center
        align-center>
        <img :src="require('@/assets/logo.png')"
          width="100">
        <div class="body-2">尚無候選課程</div>
        <div class="caption grey--text">
          <span class="link" @click="setImportDialog(true)">匯入修課紀錄</span>
          <span>或去</span>
          <router-link to="/courses">通識列表</router-link>
          <span>逛逛</span>
        </div>
      </v-layout>
      <v-spacer v-else/>
      <v-divider/>
      <v-btn ref="copy"
        flat
        large
        :disabled="!candidateCourses.length"
        :data-clipboard-text="candidateString"
        color="primary"
        @click="launchSnackbar('複製成功')">複製科號與課名</v-btn>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import ClipboardJS from 'clipboard';

export default {
  name: 'AppDrawer',
  computed: {
    ...mapGetters(['candidateCourses']),
    drawer: {
      get: mapState(['drawer']).drawer,
      set: mapMutations(['setDrawer']).setDrawer,
    },
    candidateString() {
      return this.candidateCourses
        .map(c => `${c.course_no}\t${c.course_title_zh}`)
        .join('\n');
    },
  },
  methods: {
    ...mapMutations(['setViewDialog', 'setImportDialog', 'setView', 'launchSnackbar']),
    openViewDialog(course_no) {
      this.setView(course_no);
      this.setViewDialog(true);
    },
  },
  mounted() {
    new ClipboardJS(this.$refs.copy.$el);
  },
};
</script>

<style lang="scss">
.link {
  cursor: pointer;
  color: #1976d2;
  text-decoration: underline;
  background-color: transparent;
}
</style>
