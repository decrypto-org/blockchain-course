import LecturesList from 'views/Lectures/LecturesList'
import AssignmentList from 'views/Assignments/AssignmentList'
import SingleAssignment from 'views/Assignments/Assignment'
import LoginCallback from 'views/Callbacks/LoginCallback.js'

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
  },
  {
    path: '/assignment/:id',
    sidebarName: '',
    navbarName: '',
    icon: null,
    component: SingleAssignment,
    show: false
  },
  {
    path: '/login',
    sidebarName: '',
    navbarName: '',
    icon: null,
    component: () => { window.location = process.env.REACT_APP_LOGIN_URL },
    show: false
  },
  {
    path: '/loginCallback',
    sidebarName: '',
    navbarName: '',
    icon: null,
    component: LoginCallback,
    show: false
  }
]

export default appRoutes
