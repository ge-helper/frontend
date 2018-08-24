<template>
  <v-navigation-drawer app
    v-model="drawer">
    <v-list expand
      class="py-0">
      <v-list-group prepend-icon="history">
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title class="subheading">通識紀錄</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="(c, i) in geLogs"
          :key="i"
          avatar>
          <v-list-tile-avatar>
            <img :src="require(`@/assets/dept/${mapDept2Img[c.course_no.slice(5, 9)]}`)" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ c.course_title_zh }}</v-list-tile-title>
            <v-list-tile-sub-title class="grey--text">{{ `${c.category}．${c.credit} 學分．${c.grade}` }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-progress-linear v-if="loading"
          indeterminate
          class="my-0"
          height="3" />
        <v-list-tile v-if="!geLogs.length"
          @click="setImportDialog(true)">
          <v-list-tile-action/>
          <v-list-tile-content>
            <v-list-tile-title v-if="!loading">
              <span>請先</span>
              <span class="link">匯入修課紀錄</span>
            </v-list-tile-title>
            <v-list-tile-title v-else>
              匯入中，請稍候⋯
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-else
          @click="clearCourseLogs">
          <v-list-tile-action/>
          <v-list-tile-content>
            <v-list-tile-title class="red--text">
              清空紀錄
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
      <v-list-group prepend-icon="shopping_cart">
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title class="subheading">候選清單</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="(c, i) in candidateCourses"
          :key="i"
          avatar
          @click="openViewDialog(c.course_no)">
          <v-list-tile-avatar>
            <img :src="require(`@/assets/dept/${mapDept2Img[c.course_no.slice(5, 9)]}`)" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ c.course_title_zh }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ `${c.category}．${c.time}．${c.teachers}` }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-show="!candidateCourses.length"
          to="/courses"
          active-class
          avatar>
          <v-list-tile-action/>
          <v-list-tile-content>
            <v-list-tile-title>
              將喜歡的課程加入候選清單吧！
            </v-list-tile-title>
            <v-list-tile-sub-title>
              <span>到</span>
              <span class="link">通識列表</span>
              <span>逛逛～</span>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-show="candidateCourses.length"
          ref="copy"
          :data-clipboard-text="candidateString"
          avatar
          @click="launchSnackbar('複製成功')">
          <v-list-tile-action/>
          <v-list-tile-content>
            <v-list-tile-title class="primary--text">
              複製科號與課名
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import ClipboardJS from 'clipboard';
import { mapDept2Img } from '@/common/mapDept2Img';

export default {
  name: 'AppDrawer',
  data() {
    return {
      mapDept2Img,
    };
  },
  computed: {
    ...mapState(['loading']),
    ...mapGetters(['candidateCourses', 'geLogs']),
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
    ...mapMutations([
      'setViewDialog',
      'setImportDialog',
      'setView',
      'launchSnackbar',
      'clearCourseLogs',
    ]),
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
