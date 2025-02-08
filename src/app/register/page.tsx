"use client";

import assets from "@/assets";
import {
  Box,
  Button,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerCompany } from "@/services/actions/registerCompany";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DEForm from "@/components/Forms/DEForm";
import DEInputField from "@/components/Forms/DEInputField";
// import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValues, validationSchema } from "./validation";

// export const CompanyValidationSchema = z.object({
//   name: z.string().min(1, "Please enter your name!"),
//   email: z.string().email("Please enter a valid email!"),
//   contactNumber: z
//     .string()
//     .regex(/^\d{12}$/, "Please provide a valid phone number"),
//   address: z.string().min(1, "Please enter your address!"),
// });
// export const validationSchema = z.object({
//   password: z.string().min(6, "Password must be at least 6 characters "),
//   company: CompanyValidationSchema,
// });

// export const defaultValues = {
//   password: "",
//   company: {
//     name: "",
//     email: "",
//     contactNumber: "",
//     address: "",
//   },
// };

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const handleRegister = async (formData: FieldValues) => {
    const data = modifyPayload(formData);
    try {
      const res = await registerCompany(data);
      if (res?.data?.id) {
        toast.success("Registration successful");
        router.push("/login");
      } else {
        setError(res.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <Container
      sx={{
        padding: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className=" min-h-screen"
    >
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image
                src={assets.images.tech}
                alt="logo"
                width={70}
                height={70}
              ></Image>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Register
              </Typography>
            </Box>
          </Stack>
          {error && (
            <Box>
              <Typography
                sx={{
                  backgroundColor: "red",
                  padding: "1px",
                  borderRadius: "2px",
                  color: "white",
                  marginTop: "5px",
                }}
              >
                {error}
              </Typography>
            </Box>
          )}
          <Box>
            <DEForm
              onSubmit={handleRegister}
              resolver={zodResolver(validationSchema)}
              defaultValues={defaultValues}
            >
              <Grid2 container spacing={2} my={1}>
                <DEInputField label="Name" type="text" name="company.name" />
                <DEInputField label="Email" type="email" name="company.email" />
                <DEInputField
                  label="Password"
                  type="password"
                  name="password"
                  showPassword={showPassword}
                  togglePassword={togglePasswordVisibility}
                />
                <DEInputField
                  label="Contact Number"
                  type="text"
                  name="company.contactNumber"
                />
                <DEInputField
                  label="Address"
                  type="text"
                  name="company.address"
                />
              </Grid2>
              <Button fullWidth type="submit">
                Register
              </Button>
              <Typography component="p" fontWeight={300} sx={{ mt: 2 }}>
                Already have an account?{" "}
                <Link href="/login" className="text-blue-700 font-semibold ">
                  Login
                </Link>
              </Typography>
            </DEForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
