import { Box, Button, Container } from '@mui/material';
import TextField from 'app/components/TextField';
import useAuth from 'hooks/useAuth';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LocationState } from 'types';
import { AuthProviders } from 'utils/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const location = useLocation();
  const { isLoggedIn, login } = useAuth();

  const handleLogin = async (provider: AuthProviders) => {
    await login(provider, { email, password });
  };

  if (isLoggedIn) {
    const locationState = location.state as unknown as LocationState;
    console.log('Ueffect > ', locationState);
    return <Navigate to={locationState?.from.path || '/'} replace />;
  }

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
