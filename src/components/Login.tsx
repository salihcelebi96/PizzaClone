import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/login.css";
import { logout, signUpOpen } from "../reducers/loginSlice";
import { useDispatch } from "react-redux";





const Login: React.FC = () => {
 


  const [users, setUser] = useState<any[]>([]);
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userLogin, setuserLogin] = useState<boolean>(false);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3006/users");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUser(data);

        } else {
          console.log("error fetching users:", response.statusText);
        }
      } catch (error) {
        console.log("error during fetch", error)
      }
    }

    fetchUsers();
  }, [])



  const handleSignUp = () => {
    dispatch(signUpOpen())
    dispatch(logout());
  }

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email");
      return;
    }
  
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Users:", users);
    let userFound = false;
  
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].password === password) {
        userFound = false;
        break; // Exit the loop if a matching user is found
      }
    }
  
    console.log("userFound", userFound);
  
    if (userFound) {
      // Set userLogin state to true if login is successful
      setuserLogin(true);
      console.log("Login successful");
      dispatch(logout());
    } else {
      // Set userLogin state to false if login is unsuccessful
      setuserLogin(false);
      console.log("Login failed");
    };
  };
  
  

useEffect(()=>{
  console.log("Users:", users);
  console.log("Email:", email);
  console.log("Password:", password);
  console.log("UserLogin:", userLogin);
  if (userLogin) {
    dispatch(logout());

  }

},[userLogin])
  

  const closeLogin = () => {
    dispatch(logout());
  }



  return (
    <div className="text-black   ">
      <div className="bg-white  border-1 border-gray-400 absolute top-50 left-50 transform-translate-50-50 z-10 h-[500px] w-[400px] p-8 rounded-md">
        <div className="text-xl font-bold  mb-4">Giriş Yap</div>
        <div className="mb-4 ">
          <input onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border-black input-border" placeholder="E-posta" type="text" />
        </div>
        <div className="mb-4 ">
          <input onChange={(e) => setPassword(e.target.value)} maxLength={16} minLength={8} className="w-full p-2 border-black input-border" placeholder="Şifre" type="password" />
        </div>
        <div onClick={handleLogin} className="text-center bg-red-600 hover:bg-red-500 text-white border  py-2">
          <button >Giriş</button>
        </div>
        <div className="py-2 text-center  text-sm hover:text-red-600">
          <p>Şifremi unuttum</p>
        </div>
        <div className="text-center py-5">
          <h1>
            Hesabın yok mu?{" "}
            <Link to="/kayıtol" onClick={handleSignUp} className="text-red-600 link-arrow" >
              Kayıt Ol&gt;{" "}
            </Link>
          </h1>
        </div>
        <div className="absolute text-red-600  top-0 right-2 text-3xl">
          <button onClick={closeLogin}> x </button>
        </div>
      </div>
    </div>
  );
};

export default Login;