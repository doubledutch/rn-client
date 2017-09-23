import baseClient from '@doubledutch/base-client'

import bindings from './bindings'
import shim from './shim'

const DD = bindings || shim

const client = baseClient(DD)

export default client
