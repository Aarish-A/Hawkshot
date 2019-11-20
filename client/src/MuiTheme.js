import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const MuiTheme = createMuiTheme({
   palette : {
      type: 'light'
   },
   typography: {
      fontFamily: [
         'Roboto',
         '"Lato"',
         'sans-serif'
     ].join(','),
      h1: {
         fontSize: '6em'
      }
   }
})

export default MuiTheme