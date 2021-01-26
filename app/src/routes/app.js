import { createAppRoutes } from '../utils/routes'

import LectureList from 'views/Lecture/LectureList'
import Lecture from 'views/Lecture/Lecture'
import AssignmentList from 'views/Assignments/AssignmentList'
import SingleAssignment from 'views/Assignments/Assignment'
import LoginCallback from 'views/Callbacks/LoginCallback.js'
import Home from 'views/Home/Home.js'
import HallOfFame from 'views/Stats/HallOfFame'

import {
  Class,
  Assignment,
  Poll
} from '@material-ui/icons/'

const appRoutes = [
  {
    path: '/',
    sidebarName: 'Home',
    component: Home,
    show: false
  },
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
    path: '/assignment',
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
  },
  {
    path: '/hall-of-fame',
    sidebarName: 'Hall of Fame',
    icon: Poll,
    component: HallOfFame,
    show: true
  }
]

export default createAppRoutes(appRoutes)
