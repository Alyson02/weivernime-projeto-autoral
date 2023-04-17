import { FormControl } from '@mui/material';
import styled from 'styled-components';

export const InputWrapper = styled(FormControl)`

  width: ${(prop) => prop.width ? prop.width : "100%"} !important;
  margin-bottom: 20px !important;
`;