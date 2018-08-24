<template>
  <div>
    <v-layout wrap>
      <v-flex xs12
        sm6
        class="pt-3 px-3">
        <h4 class="pb-2">類別</h4>
        <span>{{ viewCourse && mapCategory[viewCourse.category] }}</span>
      </v-flex>
      <v-flex xs12
        sm6
        class="pt-3 px-3">
        <h4 class="pb-2">平均分數</h4>
        <span v-if="hasGradeDistribution">{{ `${viewCourse && viewCourse.averageGrade} 分` }}</span>
        <span v-else>資料不足</span>
      </v-flex>
    </v-layout>
    <h4 class="px-3 pt-4">課程資訊</h4>
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
    <div class="px-3 pt-4">
      <h4 class="pb-2">成績分佈</h4>
      <canvas v-show="hasGradeDistribution"
        ref="chart"
        style="width: 100%;" />
      <p v-if="!hasGradeDistribution"
        class="ma-0"
        style="font-size: 13px;">資料不足</p>
    </div>
    <div class="px-3 pt-4">
      <h4 class="pb-2">課程簡述</h4>
      <p class="ma-0"
        style="font-size: 13px;">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Chart from 'chart.js';

const colors = [
  '#E91E63',
  '#9C27B0',
  '#3F51B5',
  '#2196F3',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#FFEB3B',
];

const mapCategory = {
  '': '',
  人文: '人文學領域',
  社會: '社會科學領域',
  自然: '自然科學領域',
  '核通 1': '核心通識向度一：思維方式',
  '核通 2': '核心通識向度二：生命之探索',
  '核通 3': '核心通識向度三：藝術與文學',
  '核通 4': '核心通識向度四：社會與文化脈動',
  '核通 5': '核心通識向度五：科學、技術與社會',
  '核通 6': '核心通識向度六：歷史分析',
};

export default {
  name: 'CoursesViewDialogBasic',
  data() {
    return {
      chart: null,
      mapCategory,
    };
  },
  computed: {
    ...mapGetters(['viewCourse']),
    averageGrade() {
      const { viewCourse } = this;
      if (!viewCourse) return '';
      return `(根據 ${
        Object.keys(viewCourse.gradeDistribution).length
      } 次開課，共 ${viewCourse.totalStudent} 位修課同學平均)`;
    },
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
      } = this.viewCourse;
      return [
        `科號：${course_no}`,
        `學分：${credit}`,
        `教師：${teachers}`,
        `授課語言：${language}`,
        `時間：${time}`,
        `教室：${room}`,
        `教室容量：${capacity} 人`,
        `修課人數／人數上限：${enrollment}／${size_limit} 人`,
      ];
    },
    hasGradeDistribution() {
      const { viewCourse } = this;
      return viewCourse && Object.keys(viewCourse.gradeDistribution).length;
    },
    description() {
      const { viewCourse } = this;
      if (!viewCourse || viewCourse.description.trim() === '') return '無';
      return viewCourse.description.trim();
    },
  },
  watch: {
    viewCourse() {
      const { viewCourse } = this;
      if (!viewCourse) return;
      const color = Chart.helpers.color;
      const datasets = Object.keys(viewCourse.gradeDistribution)
        .sort((a, b) => parseInt(b.slice(0, 5)) - parseInt(a.slice(0, 5)))
        .map((gd, idx) => ({
          label: gd.slice(0, 5),
          data: viewCourse.gradeDistribution[gd],
          backgroundColor: color(colors[idx])
            .alpha(0.5)
            .rgbString(),
          borderColor: colors[idx],
          borderWidth: 1,
        }));
      this.chart.data.datasets = datasets;
      this.chart.update();
    },
  },
  mounted() {
    this.chart = new Chart(this.$refs.chart, {
      type: 'bar',
      data: {
        labels: [
          'A+',
          'A',
          'A-',
          'B+',
          'B',
          'B-',
          'C+',
          'C',
          'C-',
          'D',
          'E',
          'X',
        ],
      },
      options: {
        tooltips: {
          callbacks: {
            label: item => `${item.yLabel} 人`,
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  },
};
</script>