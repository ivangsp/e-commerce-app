import { Box, Button, Container } from '@mui/material';
import { openErrorDialog } from 'app/components/ErrorDialog/slice';
import TextField from 'app/components/TextField';
import { UserContext } from 'app/contexts/user.context';
import React, { ChangeEvent, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
  AuthProviders,
} from 'utils/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const { setCurrentUser } = useContext(UserContext);

  const handleLogin = async (provider?: AuthProviders) => {
    let result;

    switch (provider) {
      case 'googlePopup':
        result = await signInWithGooglePopup();
        break;

      case 'emailAndPassword':
        result = await signInUserWithEmailAndPassword(email, password);
        break;
      default:
    }

    const { error, user } = result;
    if (error) {
      dispatch(openErrorDialog(error));
      return;
    }

    setCurrentUser(user);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        minHeight: '70vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '450px',
        }}
      >
        <form>
          <TextField
            id="email"
            label={'Email'}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <TextField
            id="password"
            label={'Password'}
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />

          <Button
            variant="contained"
            onClick={() => handleLogin('emailAndPassword')}
          >
            Login
          </Button>
        </form>

        <Button onClick={() => handleLogin('googlePopup')}>
          Sign in with google
        </Button>

        <Box
          sx={{
            marginTop: 2,
          }}
        >
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button
              variant="text"
              sx={{ textTransform: 'lowercase', fontWeight: 'regular' }}
            >
              Create user account
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
