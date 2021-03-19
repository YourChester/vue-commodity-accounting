<template>
  <div class="header">
    <div class="header__title">
      Товаро учет
    </div>
    <div class="header__actions">
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-header',
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.header {
  padding: 15px;
  background-color: $dark-gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 15px rgba($color: #000000, $alpha: 0.7);

  &__title {
    font-size: 18px;
    font-weight: 500;
    color: white;
  }
}
</style>
