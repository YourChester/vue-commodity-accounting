<template>
  <div>
    <v-header />
    <v-table />
  </div>
</template>

<script>
import VHeader from '@/components/VHeader.vue'
import VTable from '@/components/VTable.vue'

export default {
  name: 'Home',
  components: {
    VHeader,
    VTable
  }
}
</script>
