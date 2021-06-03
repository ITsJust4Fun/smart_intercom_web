import React, { useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { gql, useMutation, useLazyQuery } from '@apollo/client'

const LOGIN = gql`
  mutation login($isRemember: Boolean!, $password: String!) {
    login(input: {isRemember: $isRemember, password: $password})
  }
`

const REFRESH_TOKEN = gql`
  query refresh {
    refreshToken
  }
`

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/ITsJust4Fun/smart_intercom">
                Smart Intercom
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface SignInSideProps {
    setAuthState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignIn(props: SignInSideProps) {
    const { setAuthState } = props;
    const classes = useStyles();

    const [password, setPassword] = React.useState("")
    const [isRemember, setIsRemember] = React.useState(false)

    const handlePasswordEdit = (value: string) => {
        setPassword(value)
    }

    const handleRememberEdit = (value: boolean) => {
        setIsRemember(value)
    }

    const [onRefreshTokenHandler] = useLazyQuery(REFRESH_TOKEN, {
        onCompleted: (data) => {
            if (!data || !data['refreshToken']) {
                return
            }

            let token = data['refreshToken'].replace('Bearer ','')
            localStorage.setItem('token', token)
            setAuthState(true)
        },
        onError: (error) => {
            if (error.message.includes('Unexpected token')) {
                localStorage.setItem('token', '');
                onRefreshTokenHandler()
            } else {
                setAuthState(false)
            }
        },
    })

    const [onLoginHandler] = useMutation(LOGIN, {
        onCompleted: (data) => {
            if (!data || !data['login']) {
                return
            }

            let token = data['login'].replace('Bearer ','')
            localStorage.setItem('token', token);
            setAuthState(true)
        },
        onError: (error) => {
            setAuthState(false)
        },
    })

    useEffect(() => {
        onRefreshTokenHandler()
    }, [onRefreshTokenHandler])

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <div className={classes.form}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(event) =>
                                handlePasswordEdit(event.target.value)}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="remember"
                                    color="primary"
                                    onChange={(event) =>
                                        handleRememberEdit(event.target.checked)}
                                />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => {onLoginHandler({
                                    variables: {
                                        "isRemember": isRemember,
                                        "password": password,
                                    }
                                })}}
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}
