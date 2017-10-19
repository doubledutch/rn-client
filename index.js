import baseClient from '@doubledutch/base-client'
export { TitleBar } from './TitleBar'
export { Avatar } from './Avatar'
import { shiftHue } from './colors'

import { setEmulated } from './TitleBar'
import bindings from './bindings'
import emulatorShim from './emulatorShim'

const DD = bindings || emulatorShim
if (!bindings) setEmulated()

const client = baseClient(DD)
client.secondaryColor = shiftHue(client.primaryColor, -1/3)
client.tertiaryColor = shiftHue(client.primaryColor, 1/3)

export default client

export const colors = {
  shiftHue
}