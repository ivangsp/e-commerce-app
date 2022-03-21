import { Box } from '@mui/material';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import React from 'react';
import { uniqueId } from 'utils/helper';

type Props = TextFieldProps & {};
export default function TextField(props: Props) {
  const { id, label, required, type, value, onChange, helperText } = props;

  return (
    <Box
      sx={{
        width: '100%',
        marginBottom: 2,
      }}
    >
      <MuiTextField
        id={id ?? uniqueId()}
        label={label}
        required={required}
        type={type ?? 'text'}
        defaultValue={value}
        onChange={onChange}
        fullWidth
        error={helperText ? true : false}
        helperText={helperText}
      />
    </Box>
  );
}
