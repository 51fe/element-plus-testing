<script setup>
import { computed } from 'vue'
const emit = defineEmits(['update:modelValue'])
const current = computed({
  get: () => {
    return props.modelValue
  },
  set: (value) => {
    emit('update:modelValue', value)
  }
})

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请选择'
  }
})
</script>
<template>
  <el-date-picker
    v-model="current"
    value-format="YYYY-MM-DD HH:mm:ss"
    :placeholder="placeholder"
    clearable
    class="base-date-picker"
  />
</template>

<style>
.base-date-picker {
  width: 100%;
}
</style>
