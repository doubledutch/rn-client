import { NativeModules, Platform } from 'react-native'

export default Platform.select({ ios, android })()

export function ios() {
  return NativeModules.DDBindings || null
}

export function android() {
  if (!NativeModules.DDBindings) return null

  const needsParse = (typeof NativeModules.DDBindings.currentUser === 'string')
  return Object.assign({}, NativeModules.DDBindings, {
    currentEvent: needsParse ? JSON.parse(NativeModules.DDBindings.currentEvent) : NativeModules.DDBindings.currentEvent,
    currentUser: needsParse ? JSON.parse(NativeModules.DDBindings.currentUser) : NativeModules.DDBindings.currentUser
  })
}
