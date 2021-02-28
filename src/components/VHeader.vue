<template>
  <div class="header">
    <div class="header__title">
      Товаро учет
    </div>
    <div class="header__actions">
      <button class="button__add-item" @click="addNewItem">
        Добавить товар
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-header',
  methods: {
    addNewItem() {},
  },
};
</script>

<style lang="scss">
.header {
  height: 50px;
  padding: 20px;
  background-color: $dark-gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 15px rgba($color: #000000, $alpha: 0.7);

  &__title {
    font-size: 28px;
    font-weight: 600;
    color: white;
  }

  &__actions {
    .button__add-item {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      background-color: $light-green;
      font-size: 16px;
      font-weight: 600;
      color: white;
    }
  }
}
</style>
