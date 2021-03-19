<template>
  <button
    class="v-button"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'VButton'
}
</script>

<style lang="scss" scoped>
.v-button {
  display: block;
  padding: 10px 20px;
  border: none;
  border-radius: 14px;
  background: $dark-green;
  font-size: 16px;
  font-weight: 500;
  color: white;
  transition: 0.3s ease-in-out;

  &:hover {
    background: $light-green;
    color: white;
    transition: 0.3s ease-in-out;
  }
}
</style>