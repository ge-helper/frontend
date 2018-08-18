<template>
  <v-dialog v-model="dialog"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs"
    width="600">
    <v-btn slot="activator"
      outline
      color="secondary"
      class="ml-0 my-3">
      <v-icon left
        dark>filter_list</v-icon>
      篩選器
    </v-btn>
    <v-card>
      <v-card-title>篩選器</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-0"
        style="min-height: calc(100% - 107px);-webkit-overflow-scrolling: touch;">
        <v-tabs color="cyan"
          slider-color="yellow"
          dark>
          <v-tab>基本</v-tab>
          <v-tab>衝堂時間</v-tab>
          <v-tab-item>
            <v-container class="pb-0">
              <v-layout wrap>
                <v-flex xs12
                  v-if="$vuetify.breakpoint.xs"
                  sm4
                  class="mb-3">
                  <h4 class="mb-2">小類</h4>
                  <v-checkbox hide-details
                    class="mt-0"
                    label="核通 1 (12)" />
                  <v-checkbox hide-details
                    class="mt-0"
                    label="核通 2 (20)" />
                  <v-checkbox hide-details
                    class="mt-0"
                    label="核通 3 (8)" />
                  <v-checkbox hide-details
                    class="mt-0"
                    label="核通 4 (3)" />
                  <v-checkbox hide-details
                    class="mt-0"
                    label="核通 5 (8)" />
                  <v-checkbox hide-details
                    class="mt-0"
                    label="核通 6 (22)" />
                </v-flex>
                <v-flex xs12
                  sm4
                  class="mb-3">
                  <h4 class="mb-2">學分</h4>
                  <v-checkbox hide-details
                    class="mt-0"
                    label="1 (12)" />
                  <v-checkbox hide-details
                    class="mt-0"
                    label="2 (3)" />
                  <v-checkbox hide-details
                    class="mt-0"
                    label="3 (7)" />
                </v-flex>
                <v-flex xs12
                  sm4
                  class="mb-3">
                  <h4 class="mb-2">授課語言</h4>
                  <v-checkbox hide-details
                    class="mt-0"
                    label="中文 (50)" />
                  <v-checkbox hide-details
                    class="mt-0"
                    label="英文 (3)" />
                </v-flex>
                <v-flex xs12
                  sm4
                  class="mb-3">
                  <h4 class="mb-2">開課系所</h4>
                  <v-checkbox hide-details
                    class="mt-0"
                    label="醫工所 (12)" />
                  <v-checkbox hide-details
                    class="mt-0"
                    label="醫環系 (20)" />
                  <v-checkbox hide-details
                    class="mt-0"
                    label="化工系 (8)" />
                  <v-btn small
                    flat
                    color="primary"
                    class="mx-0">更多</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container>
              <h4 class="mb-2">已經排課的時間（匯入修課紀錄自動勾選）</h4>
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
                    {{ i === 1 ? header[j] : header[6 * i - 5] }}
                  </span>
                  <v-checkbox v-else
                    hide-details
                    class="mt-0" />
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat>取消</v-btn>
        <v-btn color="primary"
          flat
          @click="dialog = false">套用</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const header = {
  1: '',
  2: 'M',
  3: 'T',
  4: 'W',
  5: 'R',
  6: 'F',
  7: '1',
  13: '2',
  19: '3',
  25: '4',
  31: 'n',
  37: '5',
  43: '6',
  49: '7',
  55: '8',
  61: '9',
  67: 'a',
  73: 'b',
  79: 'c',
};

export default {
  name: 'CoursesFilter',
  data() {
    return {
      dialog: false,
      header,
    };
  },
};
</script>

<style lang="scss">
.time-table .v-input--selection-controls__input {
  margin: 0 auto;
}
</style>