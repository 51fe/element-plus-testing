<script setup>
import { ref } from 'vue'
import BaseDatePicker from './components/BaseDatePicker.vue'

const value = ref('2020-08-09 00:00:00')
</script>

<template>
  <BaseDatePicker v-model="value" />
  <p>{{ value }}</p>
</template>
