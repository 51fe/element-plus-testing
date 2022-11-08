<script setup>
import { computed } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: [Number, String],
    default: ''
  },
  multiple: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: '请选择'
  }
})

const emit = defineEmits(['update:modelValue'])

const toNumber = (str) => (isNaN(Number(str)) ? str : Number(str))

const current = computed({
  get: () => {
    const value = props.modelValue
    if (value && typeof value === 'string') {
      if (props.multiple) {
        return value?.split(',').map((item) => toNumber(item))
      }
      return toNumber(value)
    }
    return value
  },
  set: (value) => {
    if (props.multiple) {
      value = value.join()
    }
    emit('update:modelValue', value)
  }
})
</script>
<template>
  <el-select
    v-model="current"
    :multiple="multiple"
    :placeholder="placeholder"
    filterable
    clearable
    class="base-select"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<style>
.base-select {
  width: 100%;
}
</style>
