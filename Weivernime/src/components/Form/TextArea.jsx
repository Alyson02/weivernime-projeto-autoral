import styled from "styled-components";
import Textarea from "@mui/joy/Textarea";

export default function TextArea({
  disabled = false,
  placeholder = "",
  size = "lg",
  variant = "outlined",
  minRows = 2,
  value = "",
  onChange = () => 0,
  ...props
}) {
  return (
    <Textarea
      {...props}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      variant={variant}
      disabled={disabled}
      minRows={minRows}
    />
  );
}

const StyledTextField = styled(Textarea)`
  margin-top: 8px !important;
  width: 100%;
`;
