import baseClient from '@doubledutch/base-client'
export { TitleBar } from './TitleBar'
export { Avatar } from './Avatar'
import { setEmulated } from './TitleBar'
import bindings from './bindings'
import emulatorShim from './emulatorShim'

const DD = bindings || emulatorShim
if (!bindings) setEmulated()

const client = baseClient(DD)

export default client
