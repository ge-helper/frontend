<template>
  <v-jumbotron color="primary"
    gradient="220deg,#2C3E50 -10%,#4CA1AF 70%"
    :style="{'height': $vuetify.breakpoint.xs ? '80px' : '100px'}">
    <v-container fill-height
      style="max-width: 750px;">
      <v-layout align-center>
        <v-flex>
          <v-text-field label="課名／老師／科號／時間"
            solo
            hide-details
            append-icon="search" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
export default {
  name: 'CoursesSearch',
};
</script>

<style>
</style>
