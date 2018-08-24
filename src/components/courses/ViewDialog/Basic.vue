<template>
  <div>
    <div class="pt-3 px-3">
      <h4 class="pb-2">平均分數</h4>
      <div v-if="hasGradeDistribution">
        <span>{{ `${viewCourse && viewCourse.averageGrade} 分` }}</span>
        <span class="grey--text"
          style="font-size: 13px;">
          {{ averageGrade }}
        </span>
      </div>
      <span v-else>資料不足</span>
    </div>
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

export default {
  name: 'CoursesViewDialogBasic',
  data() {
    return {
      chart: null,
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