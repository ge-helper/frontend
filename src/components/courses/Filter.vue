<template>
  <div class="blue-grey lighten-5">
    <v-container style="max-width: 1000px;">
      <h3 class="subheading">
        <span>{{ `${results.length} 個搜尋` }}</span>
        <span class="font-weight-medium">{{ filter.search }}</span>結果
      </h3>
      <div>
        <filter-dialog :color="$vuetify.breakpoint.xs && chips.length ? 'primary' : 'secondary'" />
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
            <v-list-tile v-for="(opt, idx) in categoryOptions"
              :key="idx">
              <v-list-tile-action>
                <v-checkbox v-model="categories"
                  :value="opt[0]"
                  :label="`${opt[0]} (${opt[1]})`" />
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
      <div v-if="!$vuetify.breakpoint.xs">
        <v-chip v-for="(c, i) in chips"
          :key="i"
          class="grey darken-1 white--text"
          :class="{'ml-0': i === 0}">
          {{ c.text }}
          <v-icon style="color: rgba(255,255,255,.7);"
            right
            @click="closeChip(c)">highlight_off</v-icon>
        </v-chip>
        <v-btn v-if="chips.length > 1"
          small
          flat
          color="primary"
          class="mx-0"
          @click="clearAll">清除全部</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import FilterDialog from '@/components/courses/FilterDialog';

const dates = ['M', 'T', 'W', 'R', 'F'];
const periods = [
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
const mapTime = new Array(13 * 5)
  .fill(0)
  .map((v, i) => `${dates[(i / 13) >> 0]}${periods[i % 13]}`)
  .reduce((acc, cur, idx) => {
    acc[cur] = idx;
    return acc;
  }, {});

export default {
  name: 'CoursesFilter',
  components: {
    'filter-dialog': FilterDialog,
  },
  computed: {
    ...mapState(['filter', 'results']),
    ...mapGetters(['option']),
    categoryOptions() {
      return this.option.categoryOptions;
    },
    categories: {
      get() {
        return this.filter.categories;
      },
      set(value) {
        this.setFilter({ categories: value });
        this.doFilter();
      },
    },
    chips() {
      const output = [];
      const { filter } = this;
      Object.keys(filter).forEach(f => {
        if (f === 'times') {
          const { times } = filter;
          if (times.length) {
            times.sort((a, b) => mapTime[a] - mapTime[b]);
            output.push({
              filter: 'times',
              text: times.toString(),
              value: times,
            });
          }
        } else if (f === 'credits') {
          output.push(
            ...filter[f].map(v => ({
              filter: f,
              text: `${v} 學分`,
              value: v,
            }))
          );
        } else {
          output.push(
            ...filter[f].map(v => ({
              filter: f,
              text: v,
              value: v,
            }))
          );
        }
      });
      return output;
    },
  },
  methods: {
    ...mapActions(['doFilter']),
    ...mapMutations(['clearFilter', 'setFilter']),
    closeChip(chip) {
      const newFilter = {};
      newFilter[chip.filter] = Array.isArray(chip.value)
        ? this.filter[chip.filter].filter(v => !chip.value.includes(v))
        : this.filter[chip.filter].filter(v => chip.value !== v);
      this.setFilter(newFilter);
      this.doFilter();
    },
    clearAll() {
      this.clearFilter();
      this.doFilter();
    },
  },
};
</script>