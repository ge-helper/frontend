<template>
  <v-app>
    <app-drawer/>
    <app-toolbar/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import AppToolbar from '@/components/AppToolbar';
import AppDrawer from '@/components/AppDrawer';

export default {
  name: 'App',
  components: {
    'app-toolbar': AppToolbar,
    'app-drawer': AppDrawer,
  },
};
</script>
