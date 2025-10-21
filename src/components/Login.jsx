import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("user1@gmail.com");
  const [password, setPassword] = useState("User1@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleLogin = async () => {
    try {
      //api call using axios
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };

  const handleSignUp = async()=>{
    try{
      const res = await axios.post(BASE_URL+"/signup",{firstName,lastName,emailId,password},{withCredentials:true});
      dispatch(addUser(res.data.data));
      return navigate("/profile")
    }catch(err){
      setError(err?.response?.data || "Something went wrong!");
    }


  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title mx-auto">
            {isLoginForm ? "Login" : "SignUp"}
          </h2>
          <div className="my-3 flex flex-col gap-1">
            {!isLoginForm && (
              <>
                <label className="label">First Name:</label>
                <input
                  type="email"
                  value={firstName}
                  className="input mb-4"
                  placeholder="Email"
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <label className="label">Last Name:</label>
                <input
                  type="email"
                  value={lastName}
                  className="input mb-4"
                  placeholder="Email"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            )}

            <label className="label">Email ID:</label>
            <input
              type="email"
              value={emailId}
              className="input mb-4"
              placeholder="Email"
              onChange={(e) => setEmailId(e.target.value)}
            />

            <label className="label">Password:</label>
            <input
              type="password"
              value={password}
              className="input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-red-500 text-center">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={ isLoginForm ? handleLogin : handleSignUp}>
              {isLoginForm ? "Login" : "SignUp"}
            </button>
          </div>

          <p className="mx-auto cursor-pointer py-2" onClick={()=>setIsLoginForm(!isLoginForm)}>
            {isLoginForm
              ? "New User? Sign Up Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
