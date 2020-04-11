import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'

//BELOW IS MATERIAL UI, ABOVE IS NORMAL REACT
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    color: 'white',
    backgroundColor: '#ccd9e5'
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  img: {
    width: '300px',
    height: '50px',
    justifyContent: 'flex-start'
  },
  buttonStyle: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end'
  }
}))

const Navbar = ({handleClick, isLoggedIn}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <img className={classes.img} src="TestTakersBlueLogo.png" />
          {isLoggedIn ? (
            <div className={classes.buttonStyle}>
              <Button color="inherit" onClick={handleClick}>
                Logout
              </Button>
            </div>
          ) : (
            <div className={classes.buttonStyle}>
              <Button color="inherit" href="/login">
                Login
              </Button>
              <Button color="inherit" href="/signup">
                Signup
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
