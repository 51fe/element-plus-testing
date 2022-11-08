import { mount } from '../../test-util'
import BaseDatePicker from '../BaseDatePicker.vue'

test('renders correctly by default', () => {
  const wrapper = mount(BaseDatePicker)
  expect(wrapper.props('placeholder')).toBe('请选择')
  expect(wrapper.props('modelValue')).toBe('')
})

test('changes props correctly', async () => {
  const modelValue = '2022-08-15 00:00:00'
  const placeholder = '开始日期'
  const wrapper = mount(BaseDatePicker)
  // Placeholder
  await wrapper.setProps({ placeholder })
  expect(wrapper.props('placeholder')).toBe(placeholder)
  // modelValue
  await wrapper.setProps({ modelValue })
  expect(wrapper.props('modelValue')).toBe(modelValue)
})

test('emits input event correctly', async () => {
  const modelValue = '2022-08-15 00:00:00'
  const wrapper = mount(BaseDatePicker)
  await wrapper.setValue(modelValue)
  expect(wrapper.emitted('update:modelValue')[0]).toEqual([modelValue])
})

