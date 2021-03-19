<template>
  <label class="v-input">
    <input
      ref="input"
      class="input"
      :class="{
        'input__active': isFocus
      }"
      :type="type"
      :value="value"
      @input="inputHandler"
    >
    <span 
      class="label"
      :class="{
        'label__transform': isLabelActive,
        'label__active': isFocus
      }"
    >
      {{ label }}
    </span>
  </label>
</template>

<script>
export default {
  name: 'VInput',
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String
    }
  },
  data() {
    return {
      isFocus: false
    }
  },
  computed: {
    isLabelActive() {
      return this.isFocus || this.value
    }
  },
  mounted() {
    this.$refs.input.addEventListener('focus', this.focusHandler)
    this.$refs.input.addEventListener('blur', this.focusoutHandler)
  },
  beforeDestroy() {
    this.$refs.input.removeEventListener('focus', this.focusHandler)
    this.$refs.input.removeEventListener('blur', this.focusoutHandler)
  },
  methods: {
    inputHandler(e) {
      this.$emit('input', e.target.value)
    },
    focusHandler() {
      this.isFocus = true
    },
    focusoutHandler() {
      this.isFocus = false
    }
  }
}
</script>

<style lang="scss" scoped>
.v-input {
  position: relative;
  width: 100%;
  display: block;
  padding-top: 14px;

  .input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    box-sizing: border-box;
    border: none;
    outline: none;
    border-bottom: 2px solid gray;
    transition: all 0.2s;

    &__active {
      border-color: $dark-green;
    }
  }

  .label {
    position: absolute;
    top: 20px;
    left: 10px;
    font-size: 18px;
    font-weight: 600;
    transition: all 0.2s;

    &__transform {
      top: 0;
      left: 0;
      font-size: 14px;
    }

    &__active {
      color: $dark-green;
    }
  }
}
</style>