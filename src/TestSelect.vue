<script setup>
import { ref } from 'vue'
import BaseSelect from './components/BaseSelect.vue'
const options = ref([
  {
    value: 1,
    label: '移动'
  },
  {
    value: 2,
    label: '联通'
  },
  {
    value: 3,
    label: '电信'
  }
])

const value = ref('1, 2')
</script>
<template>
  <BaseSelect
    :options="options"
    v-model="value"
    :multiple="true"
  />
  <p>{{ value }}</p>
</template>
