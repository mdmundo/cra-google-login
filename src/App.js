import { CopyToClipboard } from 'react-copy-to-clipboard';
import { GoogleLogin } from 'react-google-login';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Assignment from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const Copyright = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Created by '}
      <Link color='inherit' href='https://github.com/mdmundo'>
        Edmundo Paulino
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

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
  login: {
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

const App = () => {
  const [state, setState] = useState({
    username: 'User Name',
    email: 'User Email',
    tokenId: '',
    thumbnail: '',
    copied: false
  });

  const responseGoogle = (response) => {
    const username = response.profileObj.name;
    const email = response.profileObj.email;
    const tokenId = response.tokenId;
    const thumbnail = response.profileObj.imageUrl;

    setState({ username, email, tokenId, thumbnail, copied: false });
  };

  const onCopy = () => {
    setState({ ...state, copied: true });
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container component='main' className={classes.main} maxWidth='xs'>
        <CssBaseline />
        <div className={classes.login}>
          {state.thumbnail ? (
            <Avatar src={state.thumbnail} className={classes.avatar} />
          ) : (
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          )}
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
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </div>
        <Grid item>
          <Paper className={classes.paper}>
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
              <CopyToClipboard text={state.tokenId} onCopy={onCopy}>
                <Tooltip title='Copy Token to Clipboard' placement='right'>
                  <IconButton
                    aria-label='clipboard'
                    color='primary'
                    className={classes.clip}
                    size='medium'
                    disabled={!state.tokenId}>
                    {state.copied ? (
                      <AssignmentTurnedInIcon fontSize='large' />
                    ) : (
                      <Assignment fontSize='large' />
                    )}
                  </IconButton>
                </Tooltip>
              </CopyToClipboard>
            </div>
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
};

export { App as default };
