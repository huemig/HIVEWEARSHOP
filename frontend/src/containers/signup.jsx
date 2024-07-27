import React, { useRef } from "react";
import Headers from "../components/header";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../redux/users/userslice";
import { useForm } from "react-hook-form";
import { auth } from "../redux/users/userslice";
const SignUp = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors},
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    const { name, email, password } = data;
    const signUpBody = {
      name,
      email,
      password,
    };
    dispatch(auth(signUpBody))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("signUp error", error);
      });
  };

  return (
    <>
      <Headers />

      <div className="loginpage">
        <br></br>
        <br></br>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h3>Sign Up</h3>
          <label>email</label>
          <input
            {...register("email", {
              required: "Email is required",
            })}
            type="email"
            placeholder="Email"
          />
          {errors.email && <p>{errors.email.message}</p>}
          <label>name</label>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: 2,
            })}
            type="name"
            placeholder="Name"
          />
          {errors.name && <p>{errors.name.message}</p>}
          <label>password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Password must contain at least 4 inputs",
              },
            })}
            type="password"
            placeholder="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
          <label>Confirm password</label>
          <input
            {...register("cPassword", {
              required: true,
              validate: (val, string) => {
                if (watch("password") !== val) {
                  return "passwords do not match";
                }
              },
            })}
            type="password"
            placeholder="Confirm password"
          />
          {errors.cPassword && <p>{errors.cPassword.message}</p>}

          <button type="submit">Submit</button>
        </form>
      </div>

      <button onClick={() => dispatch(logOut(user))}>logout</button>

      <button>
        <Link to="/products">products</Link>
      </button>
      <Footer />
    </>
  );
};

export default SignUp;