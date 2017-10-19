import baseClient from '@doubledutch/base-client'
export { TitleBar } from './TitleBar'
export { Avatar } from './Avatar'
import _Color from './Color'
export const Color = _Color

import { setEmulated } from './TitleBar'
import bindings from './bindings'
import emulatorShim from './emulatorShim'

const DD = bindings || emulatorShim
if (!bindings) setEmulated()

const client = baseClient(DD)
client.secondaryColor = new _Color(client.primaryColor).shiftHue(-1/3).limitLightness(0.85).rgbString()
client.tertiaryColor = new _Color(client.primaryColor).shiftHue(1/3).limitLightness(0.85).rgbString()

export default client
