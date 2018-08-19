<template>
  <v-container style="max-width: 750px;">
    <courses-sort/>
    <v-data-iterator rows-per-page-text="每頁筆數"
      :items="results">
      <v-card slot="item"
        slot-scope="props"
        flat
        class="my-3 transparent"
        @click.native="openViewDialog(props.item.course_no)"
        style="cursor: pointer;">
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
                <div class="body-1">
                  {{ `${props.item.credit} 學分．${props.item.time}．人數 ${props.item.enrollment}/${props.item.size_limit}` }}
                </div>
                <div class="body-1 grey--text">{{ props.item.teachers }}</div>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider class="my-2" />
      </v-card>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Sort from '@/components/courses/Sort';

export default {
  name: 'CoursesList',
  components: {
    'courses-sort': Sort,
  },
  computed: {
    ...mapState(['results']),
  },
  methods: {
    ...mapMutations(['setView', 'setViewDialog']),
    openViewDialog(course_no) {
      this.setView(course_no);
      this.setViewDialog(true);
    },
  },
};
</script>