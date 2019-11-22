import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const MuiTheme = createMuiTheme({
   palette : {
      type: 'dark'
   },
   typography: {
      fontFamily: [
         'Roboto',
         '"Lato"',
         'sans-serif'
     ].join(','),
      h1: {
         fontSize: '6em',
         textDecoration: 'none',
         textColor: 'black',
         '&:visited': {
            color: 'black'
         }
      },
      body2: {
         color: 'grey'
      }
   }
})

export default MuiTheme