<template>
  <v-snackbar v-model="snackbar"
    :timeout="4000"
    bottom>
    {{ snackbarText }}
    <v-btn color="pink"
      flat
      @click="snackbar = false">
      關閉
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'AppSnackbar',
  computed: {
    ...mapState(['snackbarText']),
    snackbar: {
      get: mapState(['snackbar']).snackbar,
      set: mapMutations(['setSnackbar']).setSnackbar,
    },
  },
};
</script>