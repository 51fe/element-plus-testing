import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import CN from 'element-plus/lib/locale/lang/zh-cn'

export const customMonut = (ui, overrides) => {
  return mount(ui, {
    global: {
      plugins: [[ElementPlus, ...[{ locale: CN }]]]
    },
    ...overrides
  })
}
export { defineComponent, ref, reactive, nextTick } from 'vue'
export * from '@vue/test-utils'
export { customMonut as mount }