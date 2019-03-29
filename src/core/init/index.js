import { compose } from 'ramda'
import arena from './arena'
import viruses from './viruses'

export default {
  arena,
  viruses
}

export const withContext = ({ get, set }) => compose(
  set(['arena', 'matrix']),
  viruses(get(['level'])),
  arena(get(['arena', 'wide'])),
  get
)(['arena', 'tall'])