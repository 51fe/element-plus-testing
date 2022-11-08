<template>
  <el-form
    ref="formRef"
    :model="numberValidateForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item
      label="age"
      prop="age"
      :rules="rules"
    >
      <el-input
        v-model.number="numberValidateForm.age"
        type="text"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        class="submit-btn"
        @click="submitForm(formRef)"
      >
        Submit
      </el-button>
      <el-button
        class="reset-btn"
        @click="resetForm(formRef)"
      >
        Reset
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { rules } from './config'

const formRef = ref()

const numberValidateForm = reactive({
  age: ''
})

const submitForm = (formEl) => {
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
