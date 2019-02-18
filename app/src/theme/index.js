import { createMuiTheme } from '@material-ui/core/styles'

const palette = {
  primary: {
    light: '#ff9d3f',
    main: '#ef6c00',
    dark: '#b53d00',
    contrastText: '#000000'
  },
  secondary: {
    light: '#8e8e8e',
    main: '#616161',
    dark: '#373737',
    contrastText: '#ffffff'
  }
}

const themeName = 'Blockchain course'

export default createMuiTheme({ palette, themeName })
