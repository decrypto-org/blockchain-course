import LecturePage from 'views/Lecture/Lecture'
import AssignmentList from 'views/Assignments/AssignmentList'

import {
  Class,
  Assignment
} from '@material-ui/icons/'

const appRoutes = [
  {
    path: '/lectures',
    sidebarName: 'Lectures',
    navbarName: 'Lectures',
    icon: Class,
    component: LecturePage
  },
  {
    path: '/assignments',
    sidebarName: 'Assignments',
    navbarName: 'Assignments',
    icon: Assignment,
    component: AssignmentList
  }
]

export default appRoutes
