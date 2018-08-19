<template>
  <div>
    <h4 class="px-3 pt-3">課程資訊</h4>
    <v-layout wrap>
      <v-flex v-for="i in 2"
        :key="i"
        xs12
        sm6>
        <v-list dense
          class="py-0">
          <template v-for="(info, j) in infos.slice(i * 4 - 4, i * 4)">
            <v-list-tile :key="j + infos.length">
              <v-list-tile-content>{{ info }}</v-list-tile-content>
            </v-list-tile>
            <v-divider :key="j" />
          </template>
        </v-list>
      </v-flex>
    </v-layout>
    <div class="pa-3">
      <h4 class="pb-2">成績分佈</h4>
    </div>
    <div class="pa-3">
      <h4 class="pb-2">課程簡述</h4>
      <p class="ma-0"
        style="font-size: 13px;">
        不同的族群為何被稱為「少數民族」？從人類學的觀點來看，這是因為「自我」與「他者」的對照，由自詡為主流的「自我」 所提出的詞彙。本課程以此認識為出發點，著重於「自我」與「他者」之對照競合，以及在此脈絡下「少數民族」的境遇。本 課程將「少數民族」的文化特徵，放入民族國家、自我-他者對照、社會變遷、生存與發展的脈絡中來理解，而不以細究「少數 民族」的文化表徵為主要課程目標。有興趣修習本課程的同學，宜注意三個關鍵字，以理解本課程的架構與目標：「中國」 （作為民族國家與治權）、「民族」（在中國歷史至當代轉型中的發展與變化）、「少數」（在一個多元族群社會中的意義與 位置）。閱讀材料包括人類學、歷史學、社會學、政治學、文學、醫療與科學方面的研究。
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CoursesViewDialogBasic',
  computed: {
    ...mapGetters(['viewCourse']),
    infos() {
      if (!this.viewCourse) return [];
      const {
        course_no,
        credit,
        teachers,
        language,
        time,
        room,
        capacity,
        enrollment,
        size_limit,
        category,
      } = this.viewCourse;
      return [
        `科號：${course_no}`,
        `學分：${credit}`,
        `教師：${teachers}`,
        `授課語言：${language}`,
        `時間：${time}`,
        `教室／容量：${room}／${capacity} 人`,
        `修課人數／人數上限：${enrollment}／${size_limit} 人`,
        `類別：${category}`,
      ];
    },
  },
};
</script>