<template>
  <div class="header">
    <div class="header__title">
      Товаро учет
    </div>
    <div class="header__actions">
      <button class="button" @click="isViewForm = true">
        Добавить товар
      </button>
    </div>
    <v-form-item v-if="isViewForm" @close="isViewForm = false" />
  </div>
</template>

<script>
import VFormItem from './VFormItem.vue';
export default {
  name: 'v-header',
  components: {
    VFormItem,
  },
  data() {
    return {
      isViewForm: false,
    };
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
    font-weight: 500;
    color: white;
  }

  &__actions {
    .button {
      padding: 10px 20px;
      border: none;
      border-radius: 14px;
      background: $light-green;
      font-size: 16px;
      font-weight: 500;
      color: white;
      transition: 0.3s ease-in-out;

      &:hover {
        background: $dark-green;
        color: white;
        transition: 0.3s ease-in-out;
      }
    }
  }
}
</style>
