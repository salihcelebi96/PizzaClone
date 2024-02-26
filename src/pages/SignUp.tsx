import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/signUp.css";
import { useDispatch, useSelector } from 'react-redux';
import { loginOpen, signUpClose } from '../reducers/loginSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setProfilName } from "../reducers/loginSlice";
import {setUsers} from "../reducers/userSlice";
import { RootState } from '../redux/store';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = () => toast("Kayıt olundu !! ");
  const notifyError = () => toast("Email adresi zaten kayıtlı");
  const GoLoginPage = () => {
    dispatch(loginOpen());
    dispatch(signUpClose());
    navigate("/");
  }

  interface User {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    isChecked1: boolean;
    isChecked2: boolean;
    isChecked3: boolean;
  }

  const [user, setUser] = useState<User[]>([]);
  const [isChecked1, setIsChecked1] = useState<boolean>(false);
  const [isChecked2, setIsChecked2] = useState<boolean>(false);
  const [isChecked3, setIsChecked3] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  interface ExtendedImportMeta extends ImportMeta {
    env: {
      VITE_APP_URL: string;
    };
  }

  const apiUrl = (import.meta as ExtendedImportMeta).env.VITE_APP_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/loginjwt/users`);
        console.log(response.data);
        setUsers(response.data);
        console.log("users", response.data); 
      } catch (error) {
        console.error('Error getting users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };

  const handleCheckboxChange3 = () => {
    setIsChecked3(!isChecked3);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const AllUser = useSelector((state:RootState)=> state.allUser.users);

  useEffect(()=>{
     
    console.log("alluser", AllUser);
    console.log("user", user);
  },[AllUser]);

  const handleSignup = async () => {
    try {
      // Girilen e-postanın kullanımda olup olmadığını kontrol etmek için sunucudan kullanıcıları çek
      const response = await axios.get(`${apiUrl}/api/loginjwt/users`);
      const existingUsers = response.data.users;
      
      // Girilen e-postanın kullanımda olup olmadığını kontrol et
      const isEmailTaken = existingUsers.some((user: User) => user.email === email);
      
      // Eğer e-posta zaten kullanımdaysa, hata bildirimi göster ve işlemi durdur
      if (isEmailTaken) {
        notifyError();
        return;
      }
      
      // Eğer e-posta kullanımda değilse, yeni kullanıcıyı kaydet
      const signupResponse = await axios.post(`${apiUrl}/api/loginjwt/signup`, {
        name,
        email,
        password,
        phoneNumber,
        isChecked1,
        isChecked2,
        isChecked3,
      });
  
      if (signupResponse.status === 200) {
        console.log('Signup successful:', signupResponse.data);
  
        // Yeni kullanıcı bilgilerini Redux mağazasına ekle
        dispatch(setUsers([...existingUsers, signupResponse.data]));
  
        navigate("/login");
        dispatch(setProfilName(name));
        notify();
      } else {
        console.error('Signup failed:', signupResponse.statusText);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };
  
  
  
  
  

  return (
    <div className='container   flex justify-center my-10 '>
      <div className='flex border px-5 py-10 items-center  w-[470px] h-[688px] flex-col gap-4'>
        <div className='text-xl  flex justify-center w-full font-bold'>
          <h1 className=''>Kayıt Ol</h1>
        </div>
        <div>
          <input
            onChange={(e) => setName(e.target.value)}
            className='input '
            type="text"
            placeholder="Ad Soyad" />

        </div>
        <div>
          <input onChange={(e) => setEmail(e.target.value)}
            className='input'
            type="text"
            placeholder="E-Posta" />
        </div>
        <div>
          <input
            onChange={handlePhoneNumberChange}
            maxLength={10}
            placeholder='Telefon Numarası'
            className='input '
            type="text" />
        </div>
        <div>
          <input onChange={(e) => setPassword(e.target.value)}
            className='input'
            type="password"
            placeholder="Şifre" />
        </div>
        <div className='flex flex-col gap-2'>
          <div>
            <label htmlFor="checkbox1">
              <input
                type="checkbox"
                id="checkbox1"
                checked={isChecked1}
                onChange={handleCheckboxChange1}
              />
              <span className='span'>Pazarlama amaçlı e-posta gönderilmesine izin veriyorum</span>
            </label>
          </div>
          <div>
            <label htmlFor="checkbox2">
              <input
                type="checkbox"
                id="checkbox2"
                checked={isChecked2}
                onChange={handleCheckboxChange2}
              />

              <span className='span'>Pazarlama amaçlı SMS gönderilmesine izin veriyorum</span>
            </label>
          </div>
          <div>
            <label htmlFor="checkbox3">
              <input
                type="checkbox"
                id="checkbox3"
                checked={isChecked3}
                onChange={handleCheckboxChange3}
              />

              <span className='text-red-600 span'>Üyelik sözleşmesini okudum</span>, onaylıyorum.
            </label>
          </div>
        </div>

        <div onClick={handleSignup} className='bg-red-500 hover:bg-red-600 border rounded-md w-full text-center p-3 text-white'>
          <button className='font-semibold ' >Kayıt Ol</button>
        </div>
        <div>
          <p>Pizza Hut  <span className='text-red-600'>KVKK Aydınlatma Metni</span> </p>
        </div>
        <div>
          <h1>Zaten üye misin? <span onClick={GoLoginPage} className='text-red-600 cursor-pointer'>Giriş Yap&gt;{" "}</span> </h1>
        </div>

      </div>
    </div>
  );
};

export default SignUp;
