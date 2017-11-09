import { android, ios } from './bindings'

test('Native DDBindings should be null for Android emulator', () => {
  const androidBindings = android()
  expect(androidBindings).toBeNull()
})

test('Native DDBindings should be null for iOS emulator', () => {
  const iosBindings = ios()
  expect(iosBindings).toBeNull()
})