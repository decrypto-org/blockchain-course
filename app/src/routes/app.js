import { createAppRoutes } from '../utils/routes'

import LectureList from 'views/Lecture/LectureList'
import Lecture from 'views/Lecture/Lecture'
import AssignmentList from 'views/Assignments/AssignmentList'
import SingleAssignment from 'views/Assignments/Assignment'
import LoginCallback from 'views/Callbacks/LoginCallback.js'

import {
  Class,
  Assignment
} from '@material-ui/icons/'

const appRoutes = [
  {
    path: '/lecture',
    sidebarName: 'Lectures',
    icon: Class,
    component: LectureList,
    show: true
  },
  {
    path: '/lecture/:id',
    component: Lecture
  },
  {
    path: '/assignments',
    sidebarName: 'Assignments',
    icon: Assignment,
    component: AssignmentList,
    show: true
  },
  {
    path: '/assignment/:id',
    component: SingleAssignment
  },
  {
    path: '/login',
    component: () => { window.location = process.env.REACT_APP_LOGIN_URL }
  },
  {
    path: '/loginCallback',
    component: LoginCallback
  }
]

export default createAppRoutes(appRoutes)
