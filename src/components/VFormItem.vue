<template>
  <div class="form__substrate">
    <div class="form__wrapper">
      <div class="form">
        <div class="form__header">
          <div class="header__title">
            {{ form.id ? 'Обновление товара' : 'Добавление товара' }}
          </div>
          <div class="header__button">
            <i class="fas fa-times" @click="$emit('close')"></i>
          </div>
        </div>
        <div class="form__body">
          <label class="form__field">
            Номер №
            <input type="number" v-model="form.numberItem" />
          </label>
          <label class="form__field">
            Название товара
            <input type="text" v-model="form.name" />
          </label>
          <label class="form__field">
            Цена за кг.
            <input type="number" v-model="form.price" />
          </label>
          <label class="form__field">
            Вес кг.
            <input type="number" v-model="form.weight" />
          </label>
          <label class="form__field">
            Количество ящиков
            <input type="number" v-model="form.totalBoxes" />
          </label>
          <label class="form__field">
            Вес тары, кг
            <input type="number" v-model="form.weightBox" />
          </label>
          <label class="form__field">
            Дата привоза
            <input type="date" v-model="form.dataArrived" />
          </label>
        </div>
        <div class="form__footer">
          <button class="button" @click="saveItem">
            {{ form.id ? 'Обновить товар' : 'Добавить товар' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VFormItem',
  props: ['item'],
  data() {
    return {
      form: {
        numberItem: '',
        name: '',
        price: '',
        weight: '',
        totalBoxes: '',
        weightBox: '',
        dataArrived: '',
      },
    };
  },
  mounted() {
    this.form = {
      ...this.form,
      ...this.item,
    };
  },
  methods: {
    saveItem() {
      if (this.form?.id) {
        this.$store.dispatch('editItem', this.form);
      } else {
        this.$store.dispatch('addItem', this.form);
      }
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
.form {
  position: absolute;
  top: calc(50% - 325px);
  left: calc(50% - 250px);
  width: 500px;
  height: 650px;
  display: flex;
  flex-direction: column;
  background-color: white;

  &__substrate {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  &__field {
    display: flex;
    flex-direction: column;
    padding: 10px;
    font-size: 16px;
    font-weight: 500;

    input {
      margin-top: 5px;
      border-radius: 6px;
      padding: 7px;
      border: 1px solid black;
      outline: none;
      font-weight: 400;

      &:focus,
      &:active {
        border: 1px solid $light-green;
        transition: 0.25s ease-in-out;
      }
    }
  }

  &__header {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: $dark-gray;

    .header {
      &__title {
        font-size: 16px;
        font-weight: 600;
      }

      &__button {
        i {
          cursor: pointer;
          font-size: 16px;
          color: white;
          transition: 0.3s;
          &:hover {
            color: $light-green;
            transition: 0.3s;
          }
        }
      }
    }
  }

  &__body {
    flex-grow: 1;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 10px;
    height: 50px;
    border-top: 0.1px solid black;

    .button {
      padding: 10px 20px;
      border: none;
      border-radius: 14px;
      background-color: $dark-green;
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
  }
}
</style>
