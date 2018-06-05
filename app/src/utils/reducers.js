const createSimpleReducer = (initialState = [], obj) => {
  return (state = initialState, action) => {
    const { payload, type } = action

    switch (type) {
      case obj.type:
        if (JSON.stringify(payload.data) === JSON.stringify(state)) {
          return state
        }
        return payload.data[obj.key]
      default:
        return state
    }
  }
}

const createReducer = (intialState, handlers) => {
  return (state = intialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    }

    return state
  }
}

export {
  createSimpleReducer,
  createReducer
}
