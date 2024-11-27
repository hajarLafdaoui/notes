import React,{useState} from 'react'
import axios from 'axios';



const Login = ({setIsConected}) => {
    const [cin, setCin] = useState('N412108')
    const [password, setPassword] = useState('123456')
    const [data, setData] = useState({})
    const [response, setResponse] = useState({})
    
    const StoreData = async () => {
        const newData = { cin, password };
    
          const resp = await axios.post("https://notes.devlop.tech/api/login", {
            cin,
            password,
          });
          setResponse(resp)
          console.log(resp);
          localStorage.setItem('token', resp.data.token)

    
          if (resp.status === 200) {
            setData(newData);
            localStorage.setItem('data', JSON.stringify(newData));
            setIsConected(true)
          } else {
            console.log('Login failed');
          }
      
    }

    const logout = () => {
        localStorage.removeItem('data');
        setData({});
        setIsConected(false)
    }
    return (
        <div>
          {!data.cin ? (
            <form method="post" onSubmit={(e) => e.preventDefault()}>
              <label>cin:</label>
              <input
                type="text"
                value={cin}
                onChange={(e) => setCin(e.target.value)}
              />
              <br />
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button type="submit" onClick={StoreData}>
                Login
              </button>
            </form>
          ) : (
            <div>
              <p>{data.cin}</p>
              <p>{response.data.user.first_name}</p>
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      );

}

export default Login