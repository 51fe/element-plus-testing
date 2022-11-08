import { render } from '@testing-library/vue'
import ElementPlus from 'element-plus'
import CN from 'element-plus/lib/locale/lang/zh-cn'

export const customRender = (ui, overrides) => {
  return render(ui, {
    global: {
      plugins: [[ElementPlus, ...[{ locale: CN }]]]
    },
    ...overrides
  })
}
export { defineComponent, ref, reactive, nextTick } from 'vue'
export * from '@testing-library/vue'
export { customRender as render }