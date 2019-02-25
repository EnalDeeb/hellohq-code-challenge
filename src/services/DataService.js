import api from './api'

export default {
    codeChallenge () {
        return api._get('CodeChallenge')
  }
}
