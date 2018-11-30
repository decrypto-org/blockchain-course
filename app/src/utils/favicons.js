import { library } from '@fortawesome/fontawesome-svg-core'
// import { faAdjust } from '@fortawesome/free-solid-svg-icons'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'

const loadIcons = () => {
  library.add(faGithubAlt)
}

export {
  loadIcons
}
