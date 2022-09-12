import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface UserInfo {
  Name: string,
  Age: number,
  Address: string
}

function App() {

  const [user,setUser] = useState<UserInfo>({} as UserInfo);

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;

    setUser({...user, Name: value});


  }

  const GetUserInfo = async () =>{
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();

      const userData = data.results[0];

      setUser ({
        Name:userData.name.first,
        Age:userData.dob.age,
        Address:userData.location.street.name
      })

  }

  useEffect(()=>{
      GetUserInfo();
  },[])

  return (
    <div className="App">
      <h2>Name: {user.Name} </h2>
      <h3>Age: {user.Age}</h3>
      <h3>Address: {user.Address}</h3>
      <input type="text" value={user.Name} onChange={handleChange}/>
    </div>
  );
}

export default App;
