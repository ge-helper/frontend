<template>
  <div>
    <hero/>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from '@/components/home/Hero.vue';

export default {
  name: 'home',
  components: {
    hero: Hero,
  },
};
</script>
