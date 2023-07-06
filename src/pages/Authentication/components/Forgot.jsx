import React from "react";
import { Button } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import { toast } from "react-toastify";

export default function Forgot({ handleFormStatus }) {
  const [email, setEmail] = React.useState("");

  const handleResetPasswordEmail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast("User does not exist!")
      });
  };

  return (
    <form action="" className="p-[5vw]">
      <div className="inputContainer">
        <h1 className="text-3xl font-medium">Welcome Back 👋</h1>
        <p className="my-4 font-thin">
          Today is a new day. It's your day. You shape it.
          <br /> Sign in to start managing your business.
        </p>
        <label htmlFor="">Email</label>
        <input
          className="text-sm"
          type="email"
          placeholder="Example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <label htmlFor="">Verification Code</label>
        <input
          className="text-sm"
          type="text"
          placeholder="At least 8 characters"
          //   value={password}
          //   onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="">New Password</label>
        <input
          className="text-sm"
          type="password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="">Confirm Password</label>
        <input
          className="text-sm"
          type="password"
          placeholder="At least 8 characters"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        /> */}
        <Button
          className="flex flex-row gap-1"
          onClick={() => handleResetPasswordEmail()}
        >
          Send verification email
        </Button>
        <p className="text-sm mt-2 text-center">
          <span
            className="cursor-pointer"
            onClick={() => handleFormStatus("login")}
          >
            Login instead.
          </span>
        </p>
        <p className="text-xs font-thin text-center mt-5">
          Copyright &copy; Zetsy. All Rights Reserved.
        </p>
      </div>
    </form>
  );
}