import { vi } from 'vitest'
import { mount, nextTick } from '../test-util'
import TestForm from '../TestForm.vue'
import { rules } from '../config'

const setup = () => {
  const wrapper = mount(TestForm)
  const ageInput = wrapper.find('input')
  return {
    wrapper,
    ageInput
  }
}

const requiredRE = new RegExp(rules[0].message)
const numberRE = new RegExp(rules[1].message)

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => { })
})

afterEach(() => {
  console.warn.mockClear()
})

test('shows required error message without input', async () => {
  const { wrapper, ageInput } = setup()
  await ageInput.trigger('blur')
  // bug: should be invalid
  await nextTick()
  expect(wrapper.get('.el-form-item__error').element).toHaveTextContent(requiredRE)
  expect(console.warn).toHaveBeenCalled()
})

test('shows number error message when input a string', async () => {
  const { wrapper, ageInput } = setup()
  await ageInput.setValue('abc')
  await ageInput.trigger('blur')
  // bug: should be invalid
  await nextTick()
  expect(wrapper.get('.el-form-item__error').element).toHaveTextContent(numberRE)
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
  expect(ageInput.element).toHaveValue('')
  expect(wrapper.find('.el-form-item__error').exists()).toBeFalsy()
  expect(console.warn).not.toHaveBeenCalled()
})
