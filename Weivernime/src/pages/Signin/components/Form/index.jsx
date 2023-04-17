import { useState } from "react";
import formValidations from "./FormValidations";
import Input from "@/components/Form/Input";
import { FormHelperText, FormLabel, Typography } from "@mui/material";
import { InputWrapper } from "./InputWrapper";
import { FormWrapper } from "./FormWrapper";
import styled from "styled-components";
import Button from "@/components/Form/Button";
import { useForm } from "@/hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UseAuth } from "@/contexts/Auth/useAuth";

export default function Form() {
  const navigate = useNavigate();
  const auth = UseAuth();

  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: formValidations,

    onSubmit: async (data) => {
      try {
        await auth.authenticate(data);
        navigate("/home");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },

    initialValues: {
      email: "",
      password: "",
    },
  });

  if (auth.user) navigate("/home");

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <ToastContainer />
      <InputWrapper>
        <Input
          label="Email"
          name="email"
          onChange={handleChange("email")}
          value={data.email || ""}
          variant="outlined"
          minRows={5}
          error={!!errors.email}
        />
        {errors.email && (
          <FormHelperText error={!!errors.email}>{errors.email}</FormHelperText>
        )}
      </InputWrapper>

      <InputWrapper>
        <Input
          label="Password"
          name="password"
          onChange={handleChange("password")}
          value={data.password || ""}
          variant="outlined"
          minRows={5}
          error={!!errors.password}
          type="password"
        />
        {errors.password && (
          <FormHelperText error={!!errors.password} style={{ marginBottom: 0 }}>
            {errors.password}
          </FormHelperText>
        )}
      </InputWrapper>

      <SubmitContainer>
        <Button type="submit">Sigin</Button>
      </SubmitContainer>
      <Typography
        variant="subtitle2"
        fontWeight="bold"
        textAlign="center"
        width={"100%"}
        mt="20px"
      >
        Não possui uma conta?{" "}
        <Link to="/signup">Cadastre-se gratuitamente!</Link>
      </Typography>
    </FormWrapper>
  );
}

const SubmitContainer = styled.div`
  margin-top: 20px !important;
  width: 100% !important;
  > button {
    margin-top: 0 !important;
    width: 100%;
    height: 46px;
  }
`;
