import React from 'react';
import clsx from 'clsx';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { GoogleLogin } from 'react-google-login';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://github.com/mdmundo'>
        Edmundo Paulino
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  mainPaper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800]
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  },
  clip: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(0)
  }
}));

export default function App() {
  const [state, setState] = React.useState({
    username: 'User Name',
    email: 'User Email',
    tokenId: ''
  });

  const responseGoogle = (response) => {
    const username = response.tt.Ad;
    const email = response.tt.$t;
    const tokenId = response.tokenId;

    setState({ username, email, tokenId });
  };

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <Container component='main' className={classes.main} maxWidth='xs'>
        <CssBaseline />
        <div className={classes.mainPaper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h3'>
            Login
          </Typography>
          <div className={classes.form} noValidate>
            <GoogleLogin
              clientId='1024959299157-0olhl16sc1as3k7vrfijvntq6ldhno50.apps.googleusercontent.com'
              render={(renderProps) => (
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}>
                  Login with your Google account
                </Button>
              )}
              buttonText='Login'
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </div>
        <Grid item>
          <Paper className={fixedHeightPaper}>
            <Typography
              component='h2'
              variant='h6'
              color='primary'
              gutterBottom>
              User Data
            </Typography>
            <Typography component='p' variant='h4'>
              {state.username}
            </Typography>
            <Typography
              color='textSecondary'
              className={classes.depositContext}>
              {state.email}
            </Typography>
            <div>
              <CopyToClipboard text={state.tokenId}>
                <Tooltip title='Copy Token to Clipboard' placement='right'>
                  <IconButton
                    aria-label='clipboard'
                    color='primary'
                    className={classes.clip}
                    size='large'>
                    <AssignmentTurnedInIcon fontSize='inherit' />
                  </IconButton>
                </Tooltip>
              </CopyToClipboard>
            </div>
            <div></div>
          </Paper>
        </Grid>
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth='sm'>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
