import React, { useState } from "react";
import axios from "axios";

const Login = ({ setIsConected }) => {
  const [cin, setCin] = useState("JD98624");
  const [password, setPassword] = useState("123456789");
  const [data, setData] = useState({});

  const StoreData = async () => {
    const newData = { cin, password };
    try {
      const resp = await axios.post("/login", {
        cin,
        password,
      });
  
      console.log("Full Response:", resp); // Log the entire response
  
      // Check for the token directly on the response object
      if (resp.token) {
        localStorage.setItem("token", resp.token);
        setData(newData);
        localStorage.setItem("data", JSON.stringify(newData));
        setIsConected(true);
      } else {
        console.error("Login failed, token not returned:", resp);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  


  return (
    <div className="login-page-wrapper yellow">
      <div className="login-page">
        <div className="form">
        <h2 className="loginTitle">Login</h2>
          {!data.cin ? (
            <form
              className="login-form"
              method="post"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="CIN"
                value={cin}
                onChange={(e) => setCin(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" onClick={StoreData}>
                Login
              </button>
            </form>
          ) : (
            <div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;