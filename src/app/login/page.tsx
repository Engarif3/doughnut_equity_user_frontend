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
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import DEForm from "@/components/Forms/DEForm";
import DEInputField from "@/components/Forms/DEInputField";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const validationSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters "),
});

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleLogin = async (formData: FieldValues) => {
    console.log(formData);
    try {
      const res = await userLogin(formData);
      if (res?.data?.accessToken) {
        toast.success(res.message);
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/dashboard");
      } else {
        setError(res.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <Container>
      <Stack
        sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}
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
          <DEForm
            onSubmit={handleLogin}
            resolver={zodResolver(validationSchema)}
            defaultValues={{
              email: "",
              password: "",
            }}
          >
            <Grid2 container spacing={2} my={1}>
              <DEInputField label="Email" type="text" name="email" />
              <DEInputField
                label="Password"
                type="password"
                name="password"
                showPassword={showPassword}
                togglePassword={togglePasswordVisibility}
              />
            </Grid2>
            <Typography
              textAlign="end"
              component="p"
              mb={1}
              fontWeight={300}
              sx={{ mt: 2 }}
            >
              Forgot Password?
            </Typography>
            <Button fullWidth type="submit">
              Login
            </Button>
            <Typography component="p" fontWeight={300} sx={{ mt: 2 }}>
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-700 font-semibold ">
                Register
              </Link>
            </Typography>
          </DEForm>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
