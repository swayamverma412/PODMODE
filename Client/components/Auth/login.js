import React, { useState } from "react";
import Input from "../UI/Input";
import axios from "axios";
import { useGlobalAuthContext } from "/context/AuthContext";
import PrimaryButton from "../UI/Button/PrimaryButton";

const Login = () => {
  const { setUser, setCookie, login, setShowLoginModal, verifyToken } =
    useGlobalAuthContext();
  const [showSignup, setShowSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "test@gmail.com",
    password: "Test123@",
  });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    creator: false,
  });

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const data = {
        email: loginData.email,
        password: loginData.password,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/login`,
        data,
        config
      );
      console.log(res.data);
      // const res = await axios(config);
      await setCookie("access-token", `Bearer ${res.data.token}`, 7);
      setUser(res.data.user);
      setShowLoginModal(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const signupHandler = async (e) => {
    try {
      e.preventDefault();
      const data = {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        creator: signupData.creator,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/signup`,
        data,
        config
      );
      console.log(res.data);

      // const res = await axios(config);
      await setCookie("access-token", `Bearer ${res.data.token}`, 7);
      await verifyToken(`Bearer ${res.data.token}`);
      setShowLoginModal(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[500px] bg-white rounded-md shadow-lg flex flex-col items-center gap-8 justify-center px-12 text-black shadow-white/10 py-20">
      <div className="flex flex-col w-full gap-2">
        {showSignup ? (
          <>
            <div className="flex flex-col items-center justify-center gap-1 mb-10">
              <p className="text-3xl font-bold uppercase">Sign Up</p>
              <p className="opacity-80">Lets create an account!</p>
            </div>
            <Input
              label="Name"
              type="text"
              placeholder="Enter your name here"
              required={true}
              value={signupData.name}
              onChange={(e) =>
                setSignupData({ ...signupData, name: e.target.value })
              }
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email here"
              required={true}
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password here"
              required={true}
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
            />

            <div className="flex items-center">
              <input
                checked={signupData.creator}
                onChange={(e) =>
                  setSignupData({ ...signupData, creator: !signupData.creator })
                }
                id="checked-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="checked-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Want to be a creator?
              </label>
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-6 mt-10">
              <PrimaryButton
                fullWidth
                isLoading={isLoading}
                disabled={isLoading}
                handleClick={signupHandler}
                color="black"
              >
                Create Account
              </PrimaryButton>
              <div className="flex items-center justify-center gap-2">
                <p>Already have an account?</p>
                <button
                  className="underline"
                  onClick={() => setShowSignup(false)}
                >
                  Sign In
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center gap-1 mb-10">
              <p className="text-3xl font-bold uppercase">Login</p>
              <p className="opacity-80">Lets get you started!</p>
            </div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your name here"
              required={true}
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your name here"
              required={true}
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <div className="flex flex-col items-center justify-center w-full gap-6 mt-10">
              <PrimaryButton
                fullWidth
                isLoading={isLoading}
                disabled={isLoading}
                handleClick={loginHandler}
                color="black"
              >
                Sign In
              </PrimaryButton>

              <div className="flex items-center justify-center gap-2">
                <p>Haven&apos;t create a account yet?</p>
                <button
                  className="underline"
                  onClick={() => setShowSignup(true)}
                >
                  Create account
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
