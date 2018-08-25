<template>
  <v-jumbotron color="primary"
    gradient="220deg,#4568dc -10%,#12c2e9 70%"
    :style="{'height': $vuetify.breakpoint.xs ? '80px' : '100px'}">
    <v-container fill-height
      style="max-width: 1000px;">
      <v-layout align-center
        style="max-width: 700px;">
        <v-flex>
          <v-text-field label="課名／時間／老師／科號"
            solo
            hide-details
            append-icon="search"
            v-model="preSearch"
            @click:append="doSearch"
            @keypress.enter="doSearch" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'CoursesSearch',
  data() {
    return {
      preSearch: '',
    };
  },
  computed: {
    ...mapState(['search']),
  },
  methods: {
    ...mapMutations(['setSearch']),
    doSearch() {
      FB.AppEvents.logEvent('search');
      if (this.preSearch.trim() === this.search.trim()) return;
      this.setSearch(this.preSearch);
      this.$store.dispatch('doSearch');
    },
  },
};
</script>