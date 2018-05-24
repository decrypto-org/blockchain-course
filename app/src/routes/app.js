import LecturesList from 'views/Lectures/LecturesList'
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
    component: LecturesList,
    show: true
  },
  {
    path: '/assignments',
    sidebarName: 'Assignments',
    navbarName: 'Assignments',
    icon: Assignment,
    component: AssignmentList,
    show: true
  }
]

export default appRoutes
