import { Box, Card, Container, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { GuestGuard } from "../../components/authentication/guest-guard";
import { JWTLogin } from "../../components/authentication/jwt-login";
import { Logo } from "../../components/logo";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login | Material Kit Pro</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: "60px",
              md: "120px",
            },
          }}
        >
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Link href="/" passHref>
                  <Logo
                    sx={{
                      height: 40,
                      width: 40,
                    }}
                  />
              </Link>
              <Typography variant="h4">Log in</Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <JWTLogin />
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Login;
