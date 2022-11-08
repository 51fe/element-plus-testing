import { nextTick, mount } from '../../test-util'
import BaseSelect from '../BaseSelect.vue'

const options = [{
  value: 1,
  label: '移动'
}, {
  value: 2,
  label: '联通'
}, {
  value: 3,
  label: '电信'
}]

const defaultPlaceholder = '请选择'

const setup = (props) => {
  return mount(BaseSelect, {
    props: {
      options,
      ...props
    }
  })
}

test('renders correctly by default', async () => {
  const wrapper = setup()
  expect(wrapper.props('placeholder')).toBe('请选择')
  expect(wrapper.props('modelValue')).toBe('')
  expect(wrapper.html()).toMatchSnapshot()
})

test('changes props correctly', async () => {
  const modelValue = 3
  const placeholder = '请选择营运商'
  const wrapper = setup()
  // Placeholder
  await wrapper.setProps({ placeholder })
  expect(wrapper.props('placeholder')).toBe(placeholder)
  // modelValue
  await wrapper.setProps({ modelValue })
  expect(wrapper.props('modelValue')).toBe(modelValue)
})

test('emits input event correctly when selected', async () => {
  const value = 3
  const wrapper = setup()
  //  trigger an update event by clicking the <option> element.
  await wrapper.setValue(value)
  expect(wrapper.emitted('update:modelValue')[0]).toEqual([value])
})

test('Passes and returns a string when select multiple items', async () => {
  const modelValue = '1,2'
  const wrapper = setup({ modelValue, multiple: true })
  await nextTick()
  const tags = wrapper.findAll('.el-select__tags-text')
  expect(tags[0].element).toHaveTextContent('移动')
  expect(tags[1].element).toHaveTextContent('联通')
  // select all
  await wrapper.setValue('1,2,3')
  expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['1,2,3'])
})
