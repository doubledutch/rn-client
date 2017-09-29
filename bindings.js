import { NativeModules, Platform } from 'react-native'

export default Platform.select({
  ios() {
    return NativeModules.DDBindings
  },
  android() {
    const needsParse = NativeModules.DDBindings && (typeof NativeModules.DDBindings.currentUser === 'string')
    return Object.assign({}, NativeModules.DDBindings, {
      currentEvent: needsParse ? JSON.parse(NativeModules.DDBindings.currentEvent) : NativeModules.DDBindings.currentEvent,
      currentUser: needsParse ? JSON.parse(NativeModules.DDBindings.currentUser) : NativeModules.DDBindings.currentUser
    })
  }
})()