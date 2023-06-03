import { vi } from 'vitest'
import { fireEvent, screen, render, within } from '../test-util'
import TestForm from '../TestForm.vue'
import { rules } from '../config'

const setup = () => {
  const result = render(TestForm)
  const ageInput = within(screen.getByLabelText(/age/i)).getByRole('textbox')
  const submitBtn = screen.getByRole('button', { name: /submit/i })
  return {
    ...result,
    ageInput,
    submitBtn
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
  const { submitBtn } = setup()
  await fireEvent.click(submitBtn)
  // bug: on vitest, formEl.validate() always returns true
  expect(await screen.findByText(requiredRE)).toBeInTheDocument()
  expect(console.warn).not.toHaveBeenCalled()
})

test('shows number error message when input a string', async () => {
  const { ageInput, submitBtn } = setup()
  await fireEvent.update(ageInput, 'abc')
  await fireEvent.click(submitBtn)
  // bug: on vitest, formEl.validate() always returns true
  expect(await screen.findByText(numberRE)).toBeInTheDocument()
  expect(console.warn).toHaveBeenCalled()
})

test('form is valid when input a number', async () => {
  const { ageInput } = setup()
  await fireEvent.update(ageInput, 20)
  await fireEvent.blur(ageInput)
  expect(screen.queryByText(requiredRE)).not.toBeInTheDocument()
  expect(screen.queryByText(numberRE)).not.toBeInTheDocument()
  expect(console.warn).not.toHaveBeenCalled()
})

test('resets form when click Reset button', async () => {
  const { ageInput, submitBtn } = setup()
  await fireEvent.click(submitBtn)
  expect(ageInput).toHaveValue('')
  expect(screen.queryByText(requiredRE)).not.toBeInTheDocument()
  expect(screen.queryByText(numberRE)).not.toBeInTheDocument()
  expect(console.warn).not.toHaveBeenCalled()
})
