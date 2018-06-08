import LectureGroupList from 'views/Lectures/LectureGroupList'
import LectureGroup from 'views/Lectures/Group'
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
    path: '/lectureGroups',
    sidebarName: 'Lectures',
    navbarName: 'Lectures',
    icon: Class,
    component: LectureGroupList,
    show: true
  },
  {
    path: '/lectureGroups/:id',
    sidebarName: '',
    navbarName: '',
    icon: null,
    component: LectureGroup,
    show: false
  },
  {
    path: '/lecture/:id',
    sidebarName: '',
    navbarName: '',
    icon: null,
    component: Lecture,
    show: false
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
