<template>
  <v-container id="courses-list" style="max-width: 1000px;">
    <courses-sort/>
    <v-data-iterator :pagination.sync="pagination"
      hide-actions
      rows-per-page-text="每頁筆數"
      no-data-text="沒有符合的課程，換個關鍵字試試？"
      :items="results"
      style="max-width: 700px;">
      <v-card slot="item"
        slot-scope="props"
        flat
        class="my-3 transparent"
        @click.native="openViewDialog(props.item.course_no)"
        style="cursor: pointer;">
        <v-layout>
          <v-flex style="flex: 0 0 auto; width: 20%; max-width: 80px;">
            <v-card-media :src="require(`@/assets/dept/${mapDept2Img[props.item.course_no.slice(5, 9)]}`)"
              width="80px"
              height="80px"
              contain/>
            <v-tooltip bottom
              style="position: absolute; top: -8px;">
              <v-chip slot="activator"
                v-if="props.item.reco"
                label
                color="primary"
                text-color="white"
                class="chip caption font-weight-medium"
                small>
                推
              </v-chip>
              <!-- <v-icon slot="activator"
                v-if="props.item.reco"
                class="pink--text">stars</v-icon> -->
              <span v-html="`修過${props.item.recoReasons.join('、')}的人都考不錯`" />
            </v-tooltip>
          </v-flex>
          <v-flex>
            <v-card-title class="py-0">
              <div style="width: 100%">
                <v-layout wrap>
                  <v-flex xs12
                    sm8>
                    <span class="subheading font-weight-medium">
                      <v-chip label
                        small
                        class="caption ml-0"
                        style="margin-top: 2px;">{{ props.item.category }}</v-chip>
                      {{ props.item.course_title_zh }}
                    </span>
                    <div class="body-1 mt-2">
                      {{ `${props.item.credit} 學分．${props.item.time}．人數 ${props.item.enrollment}/${props.item.size_limit}` }}
                    </div>
                    <div class="body-1 grey--text">{{ props.item.teachers }}</div>
                    <v-layout align-center>
                    </v-layout>
                  </v-flex>
                  <v-flex v-if="$vuetify.breakpoint.smAndUp"
                    sm4>
                    <v-layout align-end
                      column>
                      <h3>{{ `${mapScore(props.item.averageGrade)}` }}</h3>
                      <span class="caption grey--text">{{ `(${props.item.totalStudent} 人平均成績)` }}</span>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12
                    v-else
                    class="mt-1">
                    <v-layout align-center>
                      <span class="body-2">{{ `${mapScore(props.item.averageGrade)}` }}</span>
                      <span class="ml-2 caption grey--text">{{ `(${props.item.totalStudent})` }}</span>
                    </v-layout>
                  </v-flex>
                </v-layout>
                <!-- <div>{{ props.item.searchScore }}</div>
                <div>{{ props.item.recoScore }}</div>
                <div>{{ props.item.popularity }}</div>  -->
                <!-- <div>{{ props.item.recoScore }}</div> -->
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider class="my-2" />
      </v-card>
    </v-data-iterator>
    <div class="text-xs-center pt-2"
      style="max-width: 700px;">
      <v-pagination v-model="pagination.page"
        :length="pages"
        @input="$vuetify.goTo('#courses-list');"/>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Sort from '@/components/courses/Sort';
import { mapDept2Img } from '@/common/mapDept2Img';

export default {
  name: 'CoursesList',
  data() {
    return {
      mapDept2Img,
    };
  },
  components: {
    'courses-sort': Sort,
  },
  computed: {
    ...mapGetters(['results']),
    pagination: {
      get() {
        this.setPagination({
          ...this.$store.state.pagination,
          totalItems: this.results.length,
        });
        return this.$store.state.pagination;
      },
      set(value) {
        this.setPagination(value);
      },
    },
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    },
  },
  methods: {
    ...mapMutations(['setView', 'setViewDialog', 'setPagination']),
    openViewDialog(course_no) {
      this.setView(course_no);
      this.setViewDialog(true);
    },
    mapScore(score) {
      const scores = [90, 85, 80, 77, 73, 70, 67, 63, 60, 50, 1, 0];
      const grades = [
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
        '資料不足',
      ];
      const colors = ['light-blue darken-4'];
      for (let i = 0; i < scores.length; i++) {
        if (score >= scores[i]) {
          return grades[i];
        }
      }
    },
  },
};
</script>

<style lang="scss">
.chip {
  > span {
    padding: 0 4px !important;
  }
}
</style>
