import { fireEvent, screen, render, within } from '../test-util'
import TestForm from '../TestForm.vue'
import { rules } from '../config'

const setup = () => {
  const result = render(TestForm)
  const ageItem = screen.getByLabelText(/age/i)
  const ageInput = within(ageItem).getByRole('textbox')
  return {
    ...result,
    ageInput
  }
}

const requiredRE = new RegExp(rules[0].message)
const numberRE = new RegExp(rules[1].message)

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => { })
})

afterEach(() => {
  console.warn.mockRestore()
})

test('shows required error message without input', async () => {
  const { ageInput } = setup()
  await fireEvent.blur(ageInput)
  expect(await screen.findByText(requiredRE)).toBeInTheDocument()
  expect(console.warn).toHaveBeenCalled()
})

test('shows number error message when input a string', async () => {
  const { ageInput } = setup()
  await fireEvent.update(ageInput, 'abc')
  await fireEvent.blur(ageInput)
  expect(await screen.findByText(numberRE)).toBeInTheDocument()
  expect(console.warn).toHaveBeenCalled()
})

test('form is valid when input a number', async () => {
  const { ageInput } = setup()
  await fireEvent.update(ageInput, 20)
  const submitBtn = screen.getByRole('button', { name: /submit/i })
  await fireEvent.click(submitBtn)
  expect(screen.queryByText(requiredRE)).not.toBeInTheDocument()
  expect(screen.queryByText(numberRE)).not.toBeInTheDocument()
  expect(console.warn).not.toHaveBeenCalled()
})

test('resets form when click Reset button', async () => {
  const { ageInput } = setup()
  const resetBtn = screen.getByRole('button', { name: /reset/i })
  await fireEvent.click(resetBtn)
  expect(ageInput).toHaveValue('')
  expect(screen.queryByText(requiredRE)).not.toBeInTheDocument()
  expect(screen.queryByText(numberRE)).not.toBeInTheDocument()
  expect(console.warn).not.toHaveBeenCalled()
})
