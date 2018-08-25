<template>
  <v-dialog v-model="dialogVisible"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs"
    width="600">
    <v-btn slot="activator"
      outline
      :color="color"
      class="ml-0 my-3"
      @click="openFilterDialog">
      <v-icon left
        dark>filter_list</v-icon>
      篩選器
    </v-btn>
    <v-card>
      <v-card-title>篩選器</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-0"
        style="min-height: calc(100% - 107px);-webkit-overflow-scrolling: touch;">
        <v-tabs v-model="tabs"
          grow
          color="cyan"
          slider-color="yellow"
          dark>
          <v-tab>一般</v-tab>
          <v-tab>時間</v-tab>
          <v-tab-item>
            <v-container class="pb-0">
              <v-layout wrap>
                <v-flex xs12
                  sm6
                  class="mb-3">
                  <h4 class="mb-2">類別</h4>
                  <v-checkbox v-for="opt in categoryOptions"
                    :key="opt[0]"
                    v-model="categories"
                    :value="opt[0]"
                    hide-details
                    class="mt-0"
                    :label="`${opt[0]} (${opt[1]})`" />
                </v-flex>
                <v-flex xs12
                  sm6
                  class="mb-3">
                  <h4 class="mb-2">開課單位</h4>
                  <v-checkbox v-for="opt in departmentOptions.slice(0, departmentOptionLimit)"
                    :key="opt[0]"
                    v-model="departments"
                    :value="opt[0]"
                    hide-details
                    class="mt-0"
                    :label="`${opt[0]} (${opt[1]})`" />
                  <v-btn v-if="departmentOptionLimit < departmentOptions.length"
                    small
                    flat
                    color="primary"
                    class="mx-0"
                    @click="departmentOptionLimit += 4">更多</v-btn>
                </v-flex>
                <v-flex xs12
                  sm6
                  class="mb-3">
                  <h4 class="mb-2">學分</h4>
                  <v-checkbox v-for="opt in creditOptions"
                    :key="opt[0]"
                    v-model="credits"
                    :value="opt[0]"
                    hide-details
                    class="mt-0"
                    :label="`${opt[0]} (${opt[1]})`" />
                </v-flex>
                <v-flex xs12
                  sm6
                  class="mb-3">
                  <h4 class="mb-2">授課語言</h4>
                  <v-checkbox v-for="opt in languageOptions"
                    :key="opt[0]"
                    v-model="languages"
                    :value="opt[0]"
                    hide-details
                    class="mt-0"
                    :label="`${opt[0]} (${opt[1]})`" />
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container>
              <h4 class="mb-2">空堂時間</h4>
              <!-- (13 + 1) * (5 + 1) -->
              <v-layout wrap
                class="time-table"
                v-for="i in 14"
                :key="i">
                <v-flex v-for="j in 6"
                  :key="j"
                  :xs1="j === 1"
                  text-xs-center>
                  <span v-if="i === 1 || j === 1"
                    style="line-height: 32px;">
                    {{ i === 1 ? columnHeaders[j - 1] : rowHeaders[i - 1] }}
                  </span>
                  <v-checkbox v-else
                    v-model="times"
                    :value="`${columnHeaders[j - 1]}${rowHeaders[i - 1]}`"
                    hide-details
                    class="mt-0" />
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn flat
          @click="dialogVisible = false">取消</v-btn>
        <v-btn color="primary"
          flat
          @click="applyFilter">套用</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
const columnHeaders = ['', 'M', 'T', 'W', 'R', 'F'];
const rowHeaders = [
  '',
  '1',
  '2',
  '3',
  '4',
  'n',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'b',
  'c',
];

export default {
  name: 'CoursesFilterDialog',
  props: {
    color: {
      type: String,
      default: 'secondary',
    },
  },
  data() {
    return {
      dialog: false,
      tabs: null,
      departmentOptionLimit: 3,
      columnHeaders,
      rowHeaders,
      categories: [],
      credits: [],
      languages: [],
      departments: [],
      times: [],
    };
  },
  computed: {
    ...mapState(['filter']),
    ...mapGetters(['option']),
    ...[
      'categoryOptions',
      'creditOptions',
      'languageOptions',
      'departmentOptions',
    ].reduce((acc, cur) => {
      acc[cur] = function() {
        return this.option[cur];
      };
      return acc;
    }, {}),
    dialogVisible: {
      get() {
        return this.dialog;
      },
      set(value) {
        if (value) {
          const {
            categories,
            credits,
            languages,
            departments,
            times,
          } = this.filter;
          this.categories = categories.slice();
          this.credits = credits.slice();
          this.languages = languages.slice();
          this.departments = departments.slice();
          this.times = times.slice();
        } else {
          this.departmentOptionLimit = 3;
        }
        this.dialog = value;
      },
    },
  },
  methods: {
    ...mapActions(['doFilter']),
    ...mapMutations(['setFilter']),
    openFilterDialog() {
      FB.AppEvents.logEvent('filterStart');
    },
    applyFilter() {
      FB.AppEvents.logEvent('filterEnd');
      const { categories, credits, languages, departments, times } = this;
      this.setFilter({
        categories,
        credits,
        languages,
        departments,
        times,
      });
      this.doFilter();
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss">
.time-table .v-input--selection-controls__input {
  margin: 0 auto;
}
</style>