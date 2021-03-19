<template>
  <div class="auth-form__wrapper">
    <div class="auth-form__card">
      <div class="auth-form__header">
        Авторизация
      </div>
      <div class="auth-form">
        <v-input v-model="form.login" label="Логин" />
        <v-input v-model="form.password" label="Пароль" type="password" />
      </div>
      <div class="auth-form__actions">
        <v-button
          @click="login"
        >
          Войти
        </v-button>
      </div>
    </div>
  </div>
</template>

<script>
import VInput from '@/components/form/VInput.vue'
import VButton from '@/components/form/VButton.vue'

export default {
  name: 'AuthForm',
  components: {
    VInput,
    VButton
  },
  data() {
    return {
      form: {
        login: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      const result = await this.$axios.post('/auth/login', this.form)
      console.log(result.data.token);
      this.$axios.defaults.headers.common.Authorization = `Bearer ${result.data.token}`;
      console.log(this.$axios.defaults.headers);
      const resultUser = await this.$axios.get('/auth/user-info')
      this.$store.dispatch('user/setUserInfo', resultUser.data.user)
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-form {
  padding: 10px;

  .v-input {
    margin-bottom: 10px;
  }

  &__wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
  }

  &__card {
    position: absolute;
    top: 35%;
    left: calc(50% - 150px);
    margin: auto;
    width: 300px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 30px 4px rgba($color: #000000, $alpha: 0.5);
  }

  &__header {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: white;
    background-color: $dark-gray;
  }

  &__actions {
    padding: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>