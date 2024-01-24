import React, { useState } from 'react';
import "../css/signUp.css";
import { useDispatch } from 'react-redux';
import { loginOpen, signUpClose } from '../reducers/loginSlice';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = () => toast("Kayıt olundu !! ");
  const GoLoginPage = () => {
    dispatch(loginOpen());
    dispatch(signUpClose());
    navigate("/");
  }





  const [isChecked1, setIsChecked1] = useState<boolean>(false);
  const [isChecked2, setIsChecked2] = useState<boolean>(false);
  const [isChecked3, setIsChecked3] = useState<boolean>(false);
  const [name,setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<any>("");
  const [phoneNumber, setPhoneNumber] = useState<string>();
  
  
  

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
    
  
    if (/^\d{10}$/.test(e.target.value)) {
      setPhoneNumber(e.target.value);
    } else {
      setPhoneNumber("");
      console.log("Telefon numarası 10 haneli olmalıdır.");
    }
  };
  


  //salih celebi@gmail.com 5448169518 salih123




  
  const handleSignup = async () => {

      try {
        if(!name || !email || !password || !phoneNumber || !isChecked1 || !isChecked2 || !isChecked3 ) {
          console.log("Eksik veya hatalı giriş")
          return;
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
          console.log("geçersiz e-posta")
          return;
        }

        


      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phoneNumber,
          isChecked1,
          isChecked2,
          isChecked3,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Signup successful:', result);
        navigate("/login");
        notify();
      } else {
        console.error('Signup failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };
  

  return (
    <div className='container   flex justify-center my-10 '>
      <div className='flex border px-5 py-10 items-center  w-[470px] h-[688px] flex-col gap-4'>
        <div className='text-xl  w-full font-bold'>
          <h1 className=''>Kayıt Ol</h1> 
        </div>
        <div>
          <input 
          onChange={(e)=> setName(e.target.value)} 
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
          minLength={10} 
          
          placeholder='Telefon Numarası' 
          className='input ' 
          type="text" />
        </div>
        <div>
          <input onChange={(e)=> setPassword(e.target.value)} 
          className='input' 
          minLength={8} 
          maxLength={16} 
          type="text" 
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
           <button className='font-semibold '  >Kayıt Ol</button>
        </div>
        <div>
          <p>Pizza Hut  <span className='text-red-600'>KVKK Aydınlatma Metni</span> </p>
        </div>
        <div>
          <h1>Zaten üye misin? <span  onClick={GoLoginPage} className='text-red-600 cursor-pointer'>Giriş Yap&gt;{" "}</span> </h1>
        </div>
        
      </div>
    </div>
  );
};

export default SignUp;
