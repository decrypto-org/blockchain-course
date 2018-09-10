import axios from 'axios'
import { isString } from './helpers'
import config from '../config'

const buildActionTypes = (types) => {
  return types.reduce((obj, item) => {
    obj[item] = item
    return obj
  }, {})
}

const createSimpleAction = (type) => {
  return (data = {}) => {
    return { type, payload: { data } }
  }
}

const createDispatchAPIAction = (before, after, url, action = 'get') => {
  return (urlKeys = {}, data = {}) => {
    return async dispatch => {
      dispatch(before())

      let replacedUrl = `${config.BASE_URL}/${url}`

      replacedUrl = Object.keys(urlKeys).reduce((previous, current) => {
        return previous.replace(`:${current}`, urlKeys[current])
      }, replacedUrl)

      let res = {}

      switch (action) {
        case 'get':
          res = await axios.get(replacedUrl, { withCredentials: true })
          break
        case 'post':
          res = await axios.post(replacedUrl, { ...data }, { withCredentials: true })
          break
        default:
      }

      dispatch(after(res.data))
      return res.data
    }
  }
}

const buildActions = (actions) => {
  actions = { ...actions }

  for (let action in actions) {
    if (actions.hasOwnProperty(action)) {
      if (isString(actions[action])) {
        actions[action] = createSimpleAction(actions[action])
      }

      if (Array.isArray(actions[action])) {
        let [before, after, url, httpAction = 'get'] = actions[action]
        before = actions[before]
        after = actions[after]
        actions[action] = createDispatchAPIAction(before, after, url, httpAction)
      }
    }
  }

  return actions
}

export {
  createSimpleAction,
  createDispatchAPIAction,
  buildActions,
  buildActionTypes
}
