import { Box, Button, Container } from '@mui/material';
import TextField from 'app/components/TextField';
import MuiLink from '@mui/material/Link';
import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCreateDto } from 'types/user';
import { createUserUsingEmailAndPassword } from 'utils/firebase';
import { validateUserCredentials } from 'utils/helper';

type FormFieldsError = Record<string, string> | null;

export default function SignUp() {
  const [error, setError] = useState<FormFieldsError>(null);
  const [formFields, setFormFields] = useState<UserCreateDto>({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (!value) {
      return;
    }

    setFormFields({ ...formFields, [id]: value });
  };

  const createUserAccount = async () => {
    const errorObj = validateUserCredentials(formFields);
    if (errorObj) {
      setError({ [errorObj.field]: errorObj.error });
      return;
    }

    const { password, confirmPassword } = formFields;
    if (password !== confirmPassword) {
      setError({ confirmPassword: 'Password donot match' });
      return;
    }

    const result = await createUserUsingEmailAndPassword(formFields);
    console.log('RESULT', result);
    
  };

  const { userName, email, confirmPassword, password } = formFields;

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
        <form onSubmit={createUserAccount}>
          <TextField
            id="userName"
            required
            label={'User Name'}
            value={userName}
            onChange={handleOnChange}
            helperText={error?.userName}
          />
          <TextField
            id="email"
            required
            label={'Email'}
            type="email"
            value={email}
            onChange={handleOnChange}
            helperText={error?.email}
          />
          <TextField
            id="password"
            required
            label={'Password'}
            type="password"
            value={password}
            onChange={handleOnChange}
            helperText={error?.password}
          />
          <TextField
            id="confirmPassword"
            required
            label={'Confirm Password'}
            type="password"
            value={confirmPassword}
            onChange={handleOnChange}
            helperText={error?.confirmPassword}
          />
          <Button variant="contained" onClick={createUserAccount}>
            SignUp
          </Button>
        </form>

        <Box
          sx={{
            marginTop: 2,
          }}
        >
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button
              variant="text"
              sx={{ textTransform: 'lowercase', fontWeight: 'regular' }}
            >
              Login
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
