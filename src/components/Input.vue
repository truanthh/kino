<script setup>
const emit = defineEmits(["update:value"]);

const props = defineProps({
  error: {
    type: Array,
    required: false,
  },
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "300px",
  },
  height: {
    type: String,
    default: "30px",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  labelAlwaysVisible: {
    type: Boolean,
    default: false,
  },
  multiline: {
    type: Boolean,
    default: false,
  },
});

function updateValue() {
  emit("update:value", event.target.value);
}
</script>

<template>
  <div class="form-input" :style="{ width: width }">
    <input
      v-if="!multiline"
      class="input-text"
      :type
      :name
      :id="name"
      :placeholder
      :value
      :disabled
      @input="updateValue"
    />
    <textarea
      v-else="multiline"
      class="textarea-text"
      :type
      :name
      :id="name"
      :placeholder
      :value
      :disabled
      @input="updateValue"
    />
    <label
      :for="name"
      :class="labelAlwaysVisible ? 'labelAlwaysVisible' : 'input-label'"
      :style="{ width: width }"
      >{{ label }}</label
    >
    <!-- added v-if value here, so we hiding error if the field is empty, but error still persists -->
    <div
      class="form-error"
      v-if="value"
      v-for="element of error"
      :key="element.$uid"
    >
      <div class="form-error__message">{{ element.$message }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form {
  &-input {
    position: relative;
    margin-bottom: 30px;
  }
  &-error {
    background: var(--danger);
    margin-top: 4px;
    border-radius: 7px;
    font-size: 13px;
    color: #fff;
    padding: 5px;
  }
}

.textarea {
  &-text {
    font-size: 16px;
    width: 700px;
    height: 200px;
    resize: none;
    border-radius: 7px;
    padding: 2px 10px;
    border: 1px solid var(--primary);
    position: relative;
  }
}

.input {
  &-text {
    font-size: 16px;
    width: 100%;
    height: 30px;
    border-radius: 7px;
    padding: 0 10px;
    border: 1px solid var(--primary);
    position: relative;
    &:focus {
      & + .input-label {
        z-index: 1;
        opacity: 1;
        top: -24px;
      }
    }
  }
  &-label {
    display: block;
    position: absolute;
    z-index: -1;
    opacity: 0;
    top: 20px;
    color: var(--primary);
    font-size: 14px;
    font-weight: bold;
  }
}
.labelAlwaysVisible {
  display: block;
  position: absolute;
  z-index: 1;
  opacity: 1;
  top: -24px;
  color: var(--primary);
  font-size: 14px;
  font-weight: bold;
}
</style>
