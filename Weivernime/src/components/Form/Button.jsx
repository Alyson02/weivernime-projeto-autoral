import MuiButton from '@mui/material/Button';
import styled from 'styled-components';

export default function Button({ variant='contained', children, ...props }) {
  return (
    <StyledMuiButton variant={variant} {...props}>
      {children}
    </StyledMuiButton>
  );
}

const StyledMuiButton = styled(MuiButton)`
`;