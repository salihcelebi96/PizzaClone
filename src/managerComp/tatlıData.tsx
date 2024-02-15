import React, { useState } from 'react';
import axios from 'axios';
import "../css/manager.css";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface TatliDataState {

    tür: string;
    fiyat: number;
    url: string;
}

const TatliData: React.FC = () => {

    interface ExtendedImportMeta extends ImportMeta {
        env: {
          VITE_APP_URL: string;
        };
      }



    const [image, setImage] = useState<string>("");
    const [tatliData, setTatliData] = useState<TatliDataState>({
        tür: '',
        fiyat: 0,
        url: ""
    });
    const notify = () => toast("Tatlı Gönderildi !");
    const handleTatliPost = async () => {
        try {
            

            const postData = JSON.stringify({
                tür: tatliData.tür,
                fiyat: tatliData.fiyat,
                url: image || ""
            });

            const response = await axios.post(`${(import.meta as ExtendedImportMeta).env.VITE_APP_URL}/api/tatlilar` , postData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            console.log("Server Response:", response.data);
            notify();
        } catch (error: any) {
            console.error('Error:', error.message);
        }
    };

    const convertToBase64 = (e: any) => {
        console.log(e);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          const base64String = reader.result as string;
          setImage(base64String); 
        };
        reader.onerror = (error) => {
          console.log(error);
        };
      };

    return (
        <div className=''>
            <div className='h-[500px] relative border flex flex-col gap-5 p-5'>
                <div className='labelStyle'>
                    <label className='w-28'>Tatlı Türü</label>
                    <input
                        className='input'
                        type="text"
                        value={tatliData.tür}
                        onChange={(e) => setTatliData({ ...tatliData, tür: e.target.value })}
                    />
                </div>
                <div className='labelStyle'>
                    <label className='w-28'>Fiyat</label>
                    <input
                        className='input'
                        type="number"
                        value={tatliData.fiyat}
                        onChange={(e) => setTatliData({ ...tatliData, fiyat: parseFloat(e.target.value) })}
                    />
                </div>
                <div className='labelStyle'>
                    <label className='w-28'>Image</label>
                    <input className='input border-none' type="file" onChange={convertToBase64} />
                </div>
                <div className='absolute left-0 w-full bottom-0'>
                    <button onClick={handleTatliPost} className='border w-full hover:bg-green-400 font-semibold p-1 rounded-lg text-white bg-green-600'>Tatlı Ekle</button>
                </div>
            </div>
        </div>
    );
};

export default TatliData;