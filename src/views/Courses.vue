<template>
  <section>
    <v-jumbotron color="primary"
      gradient="220deg,#2C3E50 -10%,#4CA1AF 70%"
      :style="{'height': $vuetify.breakpoint.xs ? '80px' : '100px'}">
      <v-container fill-height
        style="max-width: 750px;">
        <v-layout align-center>
          <v-flex>
            <v-text-field label="課名／老師／科號／時間"
              solo
              hide-details
              append-icon="search" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <div class="blue-grey lighten-5">
      <v-container style="max-width: 750px;">
        <h3 class="subheading">32 堂課程</h3>
        <div>
          <courses-filter/>
          <v-menu v-if="!$vuetify.breakpoint.xs"
            offset-y
            :close-on-content-click="false">
            <v-btn slot="activator"
              outline
              color="secondary">
              分類
              <v-icon right>arrow_drop_down</v-icon>
            </v-btn>
            <v-list dense>
              <v-list-tile v-for="(item, index) in ['向度 1 (12)', '向度 2 (20)', '向度 3 (8)', '向度 4 (3)', '向度 5 (8)', '向度 6 (22)', ]"
                :key="index">
                <v-list-tile-action>
                  <v-checkbox :label="item"></v-checkbox>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
        <div v-if="!$vuetify.breakpoint.xs">
          <v-chip class="ml-0"
            close>向度 1</v-chip>
          <v-chip close>向度 2</v-chip>
          <v-chip close>向度 3</v-chip>
          <v-btn small
            flat
            color="primary"
            class="mx-0">清除全部</v-btn>
        </div>
      </v-container>
    </div>
    <v-container style="max-width: 750px;">
      <v-menu offset-y>
        <v-btn slot="activator"
          flat
          class="ml-0">
          排序方式：熱門程度
          <v-icon right>arrow_drop_down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(item, index) in ['熱門程度', '分數甜度']"
            :key="index">
            <v-list-tile-title>{{ item }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-data-iterator rows-per-page-text="每頁筆數"
        :items="ges"
        content-tag="v-layout"
        column>
        <v-flex slot="item"
          slot-scope="props">
          <v-card flat
            class="my-3 transparent">
            <v-layout>
              <v-flex style="flex: 0 0 auto; width: 20%; max-width: 80px;">
                <v-card-media :src="require('@/assets/logo.png')"
                  width="80px"
                  height="80px"
                  contain/>
              </v-flex>
              <v-flex>
                <v-card-title class="py-0">
                  <div>
                    <h3>{{ props.item.course_title_zh }}</h3>
                    <div>{{ `${props.item.credit} 學分．${props.item.time}．人數 ${props.item.enrollment}/${props.item.size_limit}` }}
                    </div>
                    <div class="grey--text">{{ `${props.item.teachers}` }}</div>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
          </v-card>
          <v-divider/>
        </v-flex>
      </v-data-iterator>
    </v-container>
    <course-view/>
  </section>
</template>

<script>
import Filter from '@/components/courses/Filter';
import View from '@/components/courses/View';
import GE10710_0815 from '../assets/GE10710_0815.json';

const mapCategory = {
  '': '',
  '人文學領域 Elective GE course: Humanities': '人文',
  '社會科學領域 Elective GE course: Social Sciences': '社會',
  '自然科學領域 Elective GE course: Natural Sciences': '自然',
  '核心通識Core GE courses 1': '核通 1',
  '核心通識Core GE courses 2': '核通 2',
  '核心通識Core GE courses 3': '核通 3',
  '核心通識Core GE courses 4': '核通 4',
  '核心通識Core GE courses 5': '核通 5',
  '核心通識Core GE courses 6': '核通 6',
  '核心通識Core GE courses 7': '核通 7',
};

export default {
  name: 'Courses',
  components: {
    'courses-filter': Filter,
    'course-view': View,
  },
  data() {
    return {
      ges: GE10710_0815.map(ge => ({
        ...ge,
        teachers: ge.teachers.map(t => t.split('\t')[0]).join('、'),
        room:
          ge.room === ''
            ? ''
            : /[A-Za-z0-9_\- ]+(\W+) *(\w*)/
                .exec(ge.room)
                .slice(1, 3)
                .join(' '),
        category: mapCategory[ge.category],
        value: false,
      })),
    };
  },
};
</script>