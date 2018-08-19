<template>
  <v-app>
    <app-drawer/>
    <app-toolbar/>
    <v-content>
      <router-view/>
      <courses-view-dialog/>
    </v-content>
    <app-snackbar/>
  </v-app>
</template>

<script>
import Toolbar from '@/components/app/Toolbar';
import Drawer from '@/components/app/Drawer';
import Snackbar from '@/components/app/Snackbar';
import ViewDialog from '@/components/courses/ViewDialog';

export default {
  name: 'App',
  components: {
    'app-toolbar': Toolbar,
    'app-drawer': Drawer,
    'app-snackbar': Snackbar,
    'courses-view-dialog': ViewDialog,
  },
};
</script>
