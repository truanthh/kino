<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  labelColor: {
    type: String,
    default: "black",
  },
  color: {
    type: String,
    default: "primary",
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  rounded: {
    type: Boolean,
    required: false,
  },
  outlined: {
    type: Boolean,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <button
    :class="[
      'btn',
      `btn_${color}`,
      { btn_rounded: rounded },
      { btn_outlined: outlined },
      { btn_icon: icon },
    ]"
    :disabled="disabled"
  >
    <div class="content">
      <span v-if="icon" class="spanIcon">
        <Icon
          :icon="icon"
          :style="{
            fontSize: '20px',
            color: 'black',
            // stroke: 'black',
            // strokeWidth: '1.5',
            // fill: 'none',
          }"
        />
      </span>
      <span v-if="label" :style="[{ color: labelColor }]">
        {{ label }}
      </span>
    </div>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  // margin-right: 10px;
  margin-bottom: 10px;
  padding: 0 20px;
  height: 40px;
  color: #fff;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  transition: 0.1s;
  &_primary {
    background: var(--primary);
    border: 1px solid var(--primary);
    &:enabled:hover {
      background: var(--primary-hover);
    }
  }
  &_second {
    background: var(--second);
    border: 1px solid var(--second);
    &:enabled:hover {
      background: var(--second-hover);
    }
  }
  &_success {
    background: var(--success);
    border: 1px solid var(--success);
    &:enabled:hover {
      background: var(--success-hover);
    }
  }
  &_info {
    background: var(--info);
    border: 1px solid var(--info);
    &:enabled:hover {
      background: var(--info-hover);
    }
  }
  &_warning {
    background: var(--warning);
    border: 1px solid var(--warning);
    &:enabled:hover {
      background: var(--warning-hover);
    }
  }
  &_danger {
    background: var(--danger);
    border: 1px solid var(--danger);
    &:enabled:hover {
      background: var(--danger-hover);
    }
  }
  &_gray {
    background: var(--gray);
    border: 1px solid var(--gray);
    &:enabled:hover {
      background: var(--gray-hover);
    }
  }
  &_lightgray {
    background: var(--lightgray);
    // border: 1px solid var(--gray);
    &:enabled:hover {
      background: var(--lightgray-hover);
    }
  }
  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
  &_rounded {
    border-radius: 25px;
  }
  &_outlined {
    background: transparent;
    color: #000;
    &:hover {
      color: #fff;
    }
  }
  &_icon {
    padding: 0;
    width: 40px;
    height: 40px;
  }
  &_large {
    height: 48px;
    padding: 0 30px;
  }
}

.content {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.spanIcon {
  display: block;
}
</style>
