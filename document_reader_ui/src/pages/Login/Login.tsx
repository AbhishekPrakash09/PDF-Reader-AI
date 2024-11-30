import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../http/axios-instance";
import classes from "./Login.module.css";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useRef } from "react";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
      return;
    }
    const response = await axiosInstance.post("/api/token", {
      username: email,
      password: password,
    });

    if (response.status == 200) {
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      navigate("/geocalc");
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.loginContainer}>
        <div className={classes.innerBox}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <span className={classes.signInTextGray}>Welcome Back</span>
            <span className={classes.signInTextBlack}>Login to Continue</span>
          </div>
          <div>
            <div className={classes.formContainer}>
              <div className={classes.floatingCol}>
                {" "}
                <TextField
                  id="username"
                  name="username"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                    type: "text",
                    sx: {
                      height: "48px",
                    },
                    inputProps: {
                      sx: { padding: 0 },
                    },
                  }}
                  className={classes.floatingText}
                  inputRef={emailRef}
                  placeholder="Email"
                  required
                />
              </div>
              <div className={classes.floatingCol}>
                <TextField
                  id="password"
                  name="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                    type: "password",
                    sx: {
                      height: "48px",
                    },
                    inputProps: {
                      sx: { padding: 0 },
                    },
                  }}
                  className={classes.floatingText}
                  inputRef={passwordRef}
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <Button
              className={classes.buttonText}
              sx={{
                borderColor: "#01337C",
                border: "1px solid",
                width: "95%",
                "&:hover": {
                  backgroundColor: "#01337C",
                },
                "&:active": {
                  backgroundColor: "#01337C",
                },
              }}
              type="submit"
              onClick={handleLogin}
            >
              Login
            </Button>
            <div className={classes.registerText}>
              <span className={classes.text}>Don't have an account?</span>
              <Link className={classes.link} to={"/register"}>
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;