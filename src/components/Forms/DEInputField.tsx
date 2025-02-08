import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type TInputProps = {
  label: string;
  type: string;
  name: string;
  showPassword?: boolean;
  required?: boolean;
  togglePassword?: () => void;
};

const DEInputField = ({
  label,
  type,
  name,
  required,
  showPassword,
  togglePassword,
}: TInputProps) => {
  const { control } = useFormContext();
  const { register } = useForm();
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl {...field} fullWidth sx={{ m: 1 }} size="small">
          <InputLabel htmlFor={`outlined-adornment-${name}`}>
            {label}
          </InputLabel>
          <OutlinedInput
            id={`outlined-adornment-${name}`}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            label={label}
            required={required}
            error={!!error?.message}
            {...register(name)}
            endAdornment={
              type === "password" ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ) : null
            }
          />
          {error?.message && (
            <FormHelperText error>{error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default DEInputField;
