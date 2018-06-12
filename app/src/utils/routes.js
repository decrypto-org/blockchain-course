const createAppRoutes = (routes) => {
  const defaults = {
    sidebarName: '',
    icon: null,
    show: false
  }

  return routes.map((item) => {
    return {...defaults, ...item}
  })
}

export {
  createAppRoutes
}
