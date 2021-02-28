<template>
  <div class="app">
    <v-header />
    <v-table />
  </div>
</template>

<script>
import VHeader from '@/components/VHeader.vue';
import VTable from '@/components/VTable.vue';

export default {
  name: 'App',
  components: {
    VHeader,
    VTable,
  },
};
</script>

<style lang="scss"></style>
