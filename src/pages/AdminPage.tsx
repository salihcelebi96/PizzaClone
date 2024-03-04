import React, {useEffect, useState} from 'react'
import "../css/admin.css";
import { IoEyeSharp } from "react-icons/io5";
import axios, { AxiosResponse } from 'axios';
import { adminLoginTrue  } from '../reducers/adminSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';






const AdminPage: React.FC = () => {
    interface ExtendedImportMeta extends ImportMeta {
        env: {
          VITE_APP_URL: string;
          
        };
      }
      
      const apiUrl = (import.meta as ExtendedImportMeta).env.VITE_APP_URL;
    const port = `${apiUrl}/api/admin`;

 const dispatch = useDispatch();
 const navigate = useNavigate();
    interface IDataItem {
        email:string;
        password:string;
       
    }
    
    
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [adminData, setAdminData] = useState<IDataItem[]>([]);
    const [adminLogin, setAdminLogin] = useState<boolean>(false);


    const handlePasswordChange = () => {
       setShowPassword(!showPassword);
       console.log(email);
       console.log(password);
       console.log(adminLogin);
    }

    

    

    useEffect(() => {
        axios.get<IDataItem[]>(port)
            .then((response: AxiosResponse<IDataItem[]>) => {
                setAdminData(response.data);
                console.log(response.data);
                
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    
    
    const handleAdmin = async () => {
        const admin = adminData.find(
            (admin) =>
                admin.email.trim() === email.trim() &&
                admin.password.trim() === password.trim()
        );
        if (admin) {
            setAdminLogin(true);
            dispatch(adminLoginTrue());
            console.log("admin", adminLogin);
            navigate("/manager");
        } else {
            console.log("false admin");
        }
    };
    

    


      
      



    return (
        <div className='h-screen flex justify-center bg-gray-200 '>
            <div className='h-96 bg-white border border-black outline-none mt-16 w-96 flex flex-col  justify-center items-center'>
                      <div className='text-2xl mb-10 text-red-600 font-semibold'>Admin</div>
                <div className=' flex flex-col gap-2 items-center justify-center'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">E-Posta</label>
                        <input onChange={(e)=>setEmail(e.target.value) } className='input' type="text" />
                    </div>
                    <div className='flex relative  flex-col gap-2'>
                        <label htmlFor="">Şifre</label>
                        <input onChange={(e)=> setPassword(e.target.value)} className='input' type={showPassword ? "text" : "password"} />
                        <button onClick={handlePasswordChange} className='absolute text-green-600 bottom-3 right-1'> <IoEyeSharp size={24} />  </button>
                    </div>
                </div>
                
                <div className='m-2 w-full flex  justify-center'>
                    <button onClick={handleAdmin} className='border px-3 py-1 rounded-md w-1/2  text-white hover:bg-blue-500 bg-blue-600'>Giriş</button>
                </div>
            </div>
            

        </div>


    )
}

export default AdminPage
