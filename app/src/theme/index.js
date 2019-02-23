import { createMuiTheme } from '@material-ui/core/styles'

const themes = {
  'cardano': {
    primary: {
      light: '#3d6b8e',
      main: '#004060',
      dark: '#001a36',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ffffff',
      main: '#d1d3d6',
      dark: '#a0a2a5',
      contrastText: '#000000'
    }
  },
  'bitcoin': {
    primary: {
      light: '#ffda4a',
      main: '#f2a900',
      dark: '#ba7a00',
      contrastText: '#000000'
    },
    secondary: {
      light: '#79797a',
      main: '#4d4d4e',
      dark: '#252526',
      contrastText: '#ffffff'
    }
  },
  'ethereum': {
    primary: {
      light: '#666667',
      main: '#3c3c3d',
      dark: '#161617',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ffffff',
      main: '#ecf0f1',
      dark: '#babebe',
      contrastText: '#000000'
    }
  },
  'yellow': {
    primary: {
      light: '#ffff54',
      main: '#ffdd00',
      dark: '#c7ac00',
      contrastText: '#000000'
    },
    secondary: {
      light: '#8b8c8e',
      main: '#5e5f61',
      dark: '#343537',
      contrastText: '#ffffff'
    }
  },
  'black': {
    primary: {
      light: '#2c2c2c',
      main: '#000000',
      dark: '#000000',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#cccccc',
      contrastText: '#000000'
    }
  }
}

const themeName = 'Blockchain course'

export default createMuiTheme({ palette: themes.bitcoin, themeName })
