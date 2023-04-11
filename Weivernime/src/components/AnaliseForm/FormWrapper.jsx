import styled from 'styled-components';

export const FormWrapper = styled.form`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding-bottom: 20px;
  
  @media (max-width: 600px) {
    > div {
      width: 100%;
      padding-left: 0px !important;
    }
  }
`;