<template>
  <div style="min-height: 105px;">
    <h4 class="px-3 pt-3">更多資訊</h4>
    <template v-for="(more, i) in mores">
      <v-divider v-if="i"
        :key="i" />
      <div class="px-3 my-2"
        style="font-size: 13px;"
        :key="i + mores.length">{{ more }}</div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const mapObj = {
  '*1': '各系學生可做為通識學分課程',
  '*2': '限人文社會學院學生做為通識學分課程，其他（院）系學生不得選修。',
  '*3': '全校學生皆可選修；但開課系(所)所屬(院)學生選修，不列入通識課程學分',
  '*4':
    '開課系（所）所屬學院學生不可選修，其他（院）系學生可做為通識學分課程。',
  '*5': '開課系(所)之學生不可選修，其他系(所)學生可選修',
  '*6': '師資培育中心開設課程，非修習教育學程學生可選修且列入通識課程學分',
  '*7': '全校學生皆可選修；但開課系(所)之學生選修，不列入通識課程學分',
};

export default {
  name: 'CoursesViewDialogMore',
  computed: {
    ...mapGetters(['viewCourse']),
    mores() {
      if (!this.viewCourse) return [];
      const {
        freshman_reserved,
        note,
        restriction,
        obj,
        prerequisites,
        requirements,
        skills,
        programs,
      } = this.viewCourse;
      const output = [];
      output.push(`新生保留：${freshman_reserved} 人`);
      if (note !== '') output.push(`備註：${note}`);
      if (restriction !== '') output.push(`限制：${restriction}`);
      output.push(`通識對象：${mapObj[obj]}`);
      if (prerequisites.length)
        output.push(`先修：${prerequisites.join('、')}`);
      if (requirements.length)
        output.push(`必選修：${requirements.join('、')}`);
      if (skills.length) output.push(`一二專：${skills.join('、')}`);
      if (programs.length) output.push(`學分學程：${programs.join('、')}`);
      return output;
    },
  },
};
</script>