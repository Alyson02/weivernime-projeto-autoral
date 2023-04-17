import formValidations from "./FormValidations";
import Input from "@/components/Form/Input";
import { FormHelperText, Typography } from "@mui/material";
import { InputWrapper } from "./InputWrapper";
import { FormWrapper } from "./FormWrapper";
import styled from "styled-components";
import Button from "@/components/Form/Button";
import { useForm } from "@/hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UseAuth } from "@/contexts/Auth/useAuth";
import { AddPersonagemApi } from "@/services/user";

export default function Form({ addPersonagem }) {
  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: formValidations,

    onSubmit: async (data) => {
      try {
        addPersonagem(data);
        await AddPersonagemApi(data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },

    initialValues: {
      name: "",
      foto: "",
    },
  });

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <ToastContainer />
      <InputWrapper>
        <Input
          label="Name"
          name="name"
          onChange={handleChange("name")}
          value={data.name || ""}
          variant="outlined"
          minRows={5}
          error={!!errors.name}
        />
        {errors.name && (
          <FormHelperText error={!!errors.name}>{errors.name}</FormHelperText>
        )}
      </InputWrapper>

      <InputWrapper>
        <Input
          label="Foto"
          name="foto"
          onChange={handleChange("foto")}
          value={data.foto || ""}
          variant="outlined"
          minRows={5}
          error={!!errors.foto}
        />
        {errors.foto && (
          <FormHelperText error={!!errors.foto} style={{ marginBottom: 0 }}>
            {errors.foto}
          </FormHelperText>
        )}
      </InputWrapper>

      <SubmitContainer>
        <Button type="submit">Adicionar</Button>
      </SubmitContainer>
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
