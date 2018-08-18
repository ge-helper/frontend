<template>
  <v-toolbar id="toolbar"
    app
    class="white">
    <v-btn flat
      icon>
      <v-badge right>
        <span slot="badge">10</span>
        <v-icon>shopping_cart</v-icon>
      </v-badge>
    </v-btn>
    <v-toolbar-title>清大通識小幫手</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn flat
      icon
      to="/courses"
      class="hidden-md-and-up mr-0">
      <v-icon>list</v-icon>
    </v-btn>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat
        to="/courses">通識列表</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'AppToolbar',
};
</script>

<style lang="scss">
#toolbar {
  @media only screen and (min-width: 960px) {
    .v-toolbar__content {
      padding: 0 calc((100% - 1000px) / 2 + 24px);
    }
  }
  @media only screen and (min-width: 750px) and (max-width: 959px) {
    .v-toolbar__content {
      padding: 0 calc((100% - 1000px) / 2 + 16px);
    }
  }
}
.ellipsis {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
