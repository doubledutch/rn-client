import baseClient from '@doubledutch/base-client'
export { TitleBar } from './TitleBar'
import bindings from './bindings'
import emulatorShim from './emulatorShim'

const DD = bindings || emulatorShim

const client = baseClient(DD)

export default client
