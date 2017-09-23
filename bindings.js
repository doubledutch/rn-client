import { NativeModules, Platform } from 'react-native'

export default Platform.select({
  ios: () => NativeModules.DDBindings,
  android: () => Object.assign({}, NativeModules.DDBindings, {
    currentEvent: needsParse ? JSON.parse(NativeModules.DDBindings.currentEvent) : NativeModules.DDBindings.currentEvent,
    currentUser: needsParse ? JSON.parse(NativeModules.DDBindings.currentUser) : NativeModules.DDBindings.currentUser
  })
})()