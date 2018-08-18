<template>
  <section>
    <courses-search/>
    <courses-filter/>
    <courses-list/>
  </section>
</template>

<script>
import Search from '@/components/courses/Search';
import Filter from '@/components/courses/Filter';
import List from '@/components/courses/List';

export default {
  name: 'Courses',
  components: {
    'courses-search': Search,
    'courses-filter': Filter,
    'courses-list': List,
  },
};
</script>