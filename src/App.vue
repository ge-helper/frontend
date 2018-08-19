<template>
  <v-app>
    <app-drawer/>
    <app-toolbar/>
    <v-content>
      <router-view/>
      <app-import-dialog/>
      <courses-view-dialog/>
    </v-content>
    <app-snackbar/>
  </v-app>
</template>

<script>
import Drawer from '@/components/app/Drawer';
import Toolbar from '@/components/app/Toolbar';
import ImportDialog from '@/components/app/ImportDialog';
import ViewDialog from '@/components/courses/ViewDialog';
import Snackbar from '@/components/app/Snackbar';

export default {
  name: 'App',
  components: {
    'app-drawer': Drawer,
    'app-toolbar': Toolbar,
    'app-import-dialog': ImportDialog,
    'courses-view-dialog': ViewDialog,
    'app-snackbar': Snackbar,
  },
};
</script>
