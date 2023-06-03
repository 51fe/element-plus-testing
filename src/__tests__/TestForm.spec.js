import { mount, nextTick } from '../test-util'
import TestForm from '../TestForm.vue'
import { rules } from '../config'

const setup = () => {
  const wrapper = mount(TestForm)
  const ageInput = wrapper.find('input')
  const submitBtn = wrapper.find('.submit-btn')

  return {
    wrapper,
    ageInput,
    submitBtn
  }
}

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => { })
})

afterEach(() => {
  console.warn.mockClear()
  jest.useRealTimers()
})

test('shows required error message without input', async () => {
  const { wrapper, submitBtn } = setup()
  jest.useFakeTimers()
  await submitBtn.trigger('click')
  jest.runOnlyPendingTimers()
  await nextTick()
  expect(wrapper.get('.el-form-item__error').text()).toContain(rules[0].message)
  expect(console.warn).toHaveBeenCalled()
})

test('shows number error message when input a string', async () => {
  const { wrapper, ageInput, submitBtn } = setup()
  jest.useFakeTimers()
  await ageInput.setValue('abc')
  await submitBtn.trigger('click')
  jest.runOnlyPendingTimers()
  await nextTick()
  expect(wrapper.get('.el-form-item__error').text()).toContain(rules[1].message)
  expect(console.warn).toHaveBeenCalled()
})

test('form is valid when input a number', async () => {
  const { wrapper, ageInput } = setup()
  await ageInput.setValue(20)
  await ageInput.trigger('blur')
  expect(wrapper.find('.el-form-item__error').exists()).toBeFalsy()
  expect(console.warn).not.toHaveBeenCalled()
})

test('resets form when click Reset button', async () => {
  const { wrapper, ageInput } = setup()
  await wrapper.find('.reset-btn').trigger('click')
  expect(ageInput.text()).toBe('')
  expect(wrapper.find('.el-form-item__error').exists()).toBeFalsy()
  expect(console.warn).not.toHaveBeenCalled()
})
