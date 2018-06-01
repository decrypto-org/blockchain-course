import axios from 'axios'

const createSimpleAction = (type) => {
  return (data = {}) => {
    return {type, payload: {data}}
  }
}

const createDispatchAPIAction = (before, after, url, action = 'get') => {
  return (id = null, data = {}) => {
    return async dispatch => {
      dispatch(before())

      let replacedUrl = url

      if (id) {
        replacedUrl = replacedUrl.replace(':id', id)
      }

      let res = {}

      switch (action) {
        case 'get':
          res = await axios.get(replacedUrl, {withCredentials: true})
          break
        case 'post':
          res = await axios.post(replacedUrl, {...data}, {withCredentials: true})
          break
        default:
      }

      dispatch(after(res.data))
      return res.data
    }
  }
}

export {
  createSimpleAction,
  createDispatchAPIAction
}
