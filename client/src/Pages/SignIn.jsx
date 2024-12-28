import React, { useState, useEffect } from "react";
import "../assets/Style/Signup-Style.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../Components/OAuth/OAuth";

export default function SignIn() {
  const navigate1 = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    const auth = sessionStorage.getItem("users");
    if (auth) {
      navigate1("/");
    }
  }, [navigate1]);

  const UserLogin = async (e) => {
    e.preventDefault(); // Prevent form submission

    dispatch(signInStart());

    if (!email.trim()) {
      setError("Email cannot be empty");
      dispatch(signInFailure());
      return;
    }

    try {
      const result = await fetch("/api/login-user", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await result.json();
      if (data) {
        dispatch(signInSuccess(data));
        if (data.result.isVerified) {
          if (!data.result.isAdmin) {
            toast.success("Login Successful", {
              theme: "colored",
              autoClose: 1000,
            });
            sessionStorage.setItem("users", JSON.stringify(data.result));
            dispatch(signInFailure());
            return navigate("/");
          } else {
            toast.success("Login Successful", {
              theme: "colored",
              autoClose: 1000,
            });
            sessionStorage.setItem("admin", JSON.stringify(data.result));
            dispatch(signInFailure());
            return navigate("/");
          }
        } else {
          setError("User not verified");
          dispatch(signInFailure());
        }
      } else {
        setError("Invalid email or password");
        dispatch(signInFailure());
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      dispatch(signInFailure());
      setError("Invalid email or password");
    }
  };

  const forgetPassword = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    if (!email.trim()) {
      setError("Email cannot be empty");
      dispatch(signInFailure());
      return;
    }

    try {
      const forgetAPI = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ email }),
      });

      if (forgetAPI) {
        const result = await forgetAPI.json();
        dispatch(signInFailure());
        toast.info("Please Check your Email!", {
          theme: "colored",
          autoClose: 1000,
        });
        navigate("/forget/password");
      }
    } catch (error) {
      console.log("An error occurred during forgot password:", error);
      dispatch(signInFailure());
    }
  };

  return (
    <MDBContainer
      fluid
      className="p-4 background-radial-gradient overflow-hidden"
    >
      <MDBRow className="align-items-center">
        <MDBCol md="6" className="text-center text-md-start mb-4 mb-md-0">
          <h1
            className="my-4 display-4 fw-bold ls-tight"
            style={{ color: "hsl(218, 81%, 95%)" }}
          >
            The best offer <br />
            <span style={{ color: "hsl(218, 81%, 75%)" }}>
              for your Real-estate
            </span>
          </h1>
          <p className="px-3 text-sm" style={{ color: "hsl(218, 81%, 85%)" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora
            at cupiditate quis eum maiores libero veritatis? Dicta facilis sint
            aliquid ipsum atque?
          </p>
        </MDBCol>

        <MDBCol md="6" className="position-relative">
          <div
            id="radius-shape-1"
            className="position-absolute rounded-circle shadow-5-strong"
          ></div>
          <div
            id="radius-shape-2"
            className="position-absolute shadow-5-strong"
          ></div>

          <MDBCard className="my-5 bg-glass">
            <MDBCardBody className="p-3 p-md-5">
              <form onSubmit={UserLogin}>
                <MDBInput
                  label="Email"
                  id="form3"
                  type="email"
                  className="mb-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MDBInput
                  label="Password"
                  id="form4"
                  type="password"
                  className="mb-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <MDBBtn
                  disabled={loading}
                  type="submit"
                  className="w-100 mb-3 bg-orange-400 hover:bg-slate-700"
                  size="md"
                >
                  {loading ? "Loading ..." : "Sign In"}
                </MDBBtn>
              </form>
              <OAuth />
              {error && (
                <p className="text-center text-xs text-red-500 mt-2">{error}</p>
              )}

              <p className="text-center mt-2 text-xs">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-orange-400 hover:text-slate-700"
                >
                  Click here...
                </Link>
              </p>

              <p className="text-center mt-2 text-xs">
                Forgot password?{" "}
                <Link
                  disabled={loading}
                  onClick={forgetPassword}
                  to="/forget/password"
                  className="text-orange-400 hover:text-slate-700"
                >
                  {loading ? "wait..." : " Click here..."}
                </Link>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
