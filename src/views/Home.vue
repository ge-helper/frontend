<template>
  <div>
    <hero/>
    <course-log/>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from '@/components/home/Hero.vue';
import CourseLog from '@/components/home/CourseLog.vue';

export default {
  name: 'home',
  components: {
    hero: Hero,
    'course-log': CourseLog,
  },
};
</script>
