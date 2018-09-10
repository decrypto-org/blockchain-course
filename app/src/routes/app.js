import { createAppRoutes } from '../utils/routes'

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
    icon: Class,
    component: LectureGroupList,
    show: true
  },
  {
    path: '/lectureGroups/:id',
    component: LectureGroup
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
