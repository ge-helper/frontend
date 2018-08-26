<template>
  <v-container id="courses-list"
    style="max-width: 1000px;">
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
        @click.native="openViewDialog(props.item.course_no, props.item.reco)"
        style="cursor: pointer;">
        <v-layout>
          <v-flex style="flex: 0 0 auto; width: 20%; max-width: 48px; margin: 4px;">
            <v-card-media :src="require(`@/assets/dept/${mapDept2Img[props.item.course_no.slice(5, 9)]}`)"
              width="48px"
              height="48px"
              contain/>
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
                        class="chip caption"
                        :class="chipColors[props.item.category]">{{ props.item.category }}</v-chip>
                      {{ props.item.course_title_zh }}
                    </span>
                    <div class="body-1 mt-2">
                      {{ `${props.item.credit} 學分．${props.item.time}．人數 ${props.item.enrollment}/${props.item.size_limit}` }}
                    </div>
                    <div class="body-1 grey--text">{{ props.item.teachers }}</div>
                  </v-flex>
                  <v-flex v-if="$vuetify.breakpoint.smAndUp"
                    sm4>
                    <v-layout align-end
                      column>
                      <span class="subheading">{{ `${mapScore(props.item.averageGrade)}` }}</span>
                      <span class="caption grey--text">{{ `(${props.item.totalStudent} 人平均成績)` }}</span>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12
                    v-else
                    class="mt-1">
                    <v-layout align-center
                      justify-end>
                      <span class="body-1">{{ `${mapScore(props.item.averageGrade)}` }}</span>
                      <span class="ml-2 caption grey--text">{{ `(${props.item.totalStudent})` }}</span>
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-layout class="grey lighten-3 mt-2 mb-1 pa-2"
                  style="border-radius: 3px;"
                  align-center
                  v-if="props.item.reco">
                  <v-icon small
                    class="amber--text mr-1">star</v-icon>
                  <span class="caption"
                    style="margin-top: 2px;">
                    {{ `修過${props.item.recoReasons.join('、')}的同學在本門課都考不錯` }}
                  </span>
                </v-layout>
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
        @input="$vuetify.goTo('#courses-list');" />
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
      chipColors: {
        人文: '',
        社會: '',
        自然: '',
        '核通 1': 'primary white--text',
        '核通 2': 'primary white--text',
        '核通 3': 'primary white--text',
        '核通 4': 'primary white--text',
        '核通 5': 'primary white--text',
        '核通 6': 'primary white--text',
        '核通 7': 'primary white--text',
      },
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
    openViewDialog(course_no, reco) {
      FB.AppEvents.logEvent('recoViewDen');
      FB.AppEvents.logEvent('viewCourse');
      this.setView(course_no);
      this.setViewDialog(true);
      if (reco) {
        FB.AppEvents.logEvent('recoViewNum');
      }
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
  margin: 0 0 4px 0;
  > span {
    padding: 0 6px !important;
  }
}
</style>
