import React, { useState } from "react";
import axios from "axios";

const Login = ({ setIsConected }) => {
  const [cin, setCin] = useState("N412108");
  const [password, setPassword] = useState("123456");
  const [data, setData] = useState({});
  const [response, setResponse] = useState({});

  const StoreData = async () => {
    const newData = { cin, password };

    try {
      const resp = await axios.post("https://notes.devlop.tech/api/login", {
        cin,
        password,
      });
      setResponse(resp);
      localStorage.setItem("token", resp.data.token);

      if (resp.status === 200) {
        setData(newData);
        localStorage.setItem("data", JSON.stringify(newData));
        setIsConected(true);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("data");
    setData({});
    setIsConected(false);
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-page">
        <div className="form">
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
              <p>CIN: {data.cin}</p>
              <p>First Name: {response.data?.user?.first_name}</p>
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
