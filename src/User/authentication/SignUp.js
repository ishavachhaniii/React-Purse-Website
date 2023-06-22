import React, { useEffect, useState } from "react";
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Button,
  Grid,
  makeStyles,
  Card,
  CardContent,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import { LockRounded } from "@mui/icons-material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import fire, { auth, db } from "../helpers/db";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

const SignUp = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
      });

      setLoading(false);
      toast.success("Account created.");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
    }

    // fire
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((response) => {
    //     if (response) {
    //       props.toggle();
    //       toast.success("User Registered Successfully");
    //     }
    //   })
    //   .catch((error) => {
    //     switch (error.code) {
    //       case "auth/email-already-in-use":
    //         toast.error(error.message);
    //         break;
    //       case "auth/invalid-email":
    //         toast.error(error.message);
    //         break;
    //       case "auth/week-password":
    //         toast.error(error.message);
    //         break;
    //     }
    //   });
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== password) {
        return false;
      }
      return true;
    });
    return () => {
      ValidatorForm.removeValidationRule("isPasswordMatch");
    };
  }, [password]);

  return (
    <Container component="main" maxWidth="xs">
      {loading ? (
        <Col className="text-center">
          <h5 className="fw-bold">Loading....</h5>
        </Col>
      ) : (
        <Card className={classes.card}>
          <CardContent>
            <ToastContainer />
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockRounded />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <ValidatorForm onSubmit={handleSignUp} className={classes.form}>
                <TextValidator
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Email"
                  onChange={handleEmail}
                  name="email"
                  value={email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "this field is required",
                    "email is not valid",
                  ]}
                  autoComplete="off"
                />
                <br />
                <TextValidator
                  variant="outlined"
                  fullWidth
                  label="Password"
                  onChange={handlePassword}
                  name="password"
                  type="password"
                  value={password}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  autoComplete="off"
                />
                <br />
                <TextValidator
                  variant="outlined"
                  label="Confirm password"
                  fullWidth
                  onChange={handleConfirmPassword}
                  name="confirmPassword"
                  type="password"
                  validators={["isPasswordMatch", "required"]}
                  errorMessages={[
                    "password mismatch",
                    "this field is required",
                  ]}
                  value={confirmPassword}
                  autoComplete="off"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                >
                  Sign Up
                </Button>

                <Grid container>
                  <Grid item>
                    <Link
                      to="/login"
                      // onClick={props.toggle}
                      className={classes.pointer}
                      variant="body2"
                    >
                      {"Already have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </ValidatorForm>
            </div>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    background:
      "linear-gradient(90deg, rgba(221,132,171,1) 0%, rgba(245,205,205,1) 100%)",
    margin: theme.spacing(3, 0, 2),
    color: "#fff",
  },
  card: {
    marginTop: "130px",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "20px",
  },
  pointer: {
    cursor: "pointer",
    color: "purple",
  },
}));

export default SignUp;
