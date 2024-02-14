import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import "../css/manager.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IcecekDataState {
    tür: string;
    fiyat: number;
    image: string;
}

const IceceklerData: React.FC = () => {

    interface ExtendedImportMeta extends ImportMeta {
        env: {
            VITE_APP_URL: string;
        };
    }

    const [image, setImage] = useState<string>("");
    const [iceceklerData, setIceceklerData] = useState<IcecekDataState>({
        tür: '',
        fiyat: 0,
        image: ""
    });

    const notify = () => toast("İçecek Gönderildi !");

    const icecekPost = async () => {
        try {
            const apiUrl = `${(import.meta as ExtendedImportMeta).env.VITE_APP_URL}/api/icecekler`;

            const postData = {
                tür: iceceklerData.tür,
                fiyat: iceceklerData.fiyat,
                url: image || ""
            };

            const response = await axios.post(apiUrl, postData, {
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

    const convertToBase64 = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files![0]);
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
            <div className='relative h-[500px] border flex flex-col gap-5 p-5'>
                <div className='labelStyle'>
                    <label className='w-28'>İçecek Türü</label>
                    <input
                        className='input'
                        type="text"
                        value={iceceklerData.tür}
                        onChange={(e) => setIceceklerData({ ...iceceklerData, tür: e.target.value })}
                    />
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='labelStyle'>
                        <label className='w-28'>Fiyat</label>
                        <input
                            className='input'
                            type="number"
                            value={iceceklerData.fiyat}
                            onChange={(e) => setIceceklerData({ ...iceceklerData, fiyat: parseFloat(e.target.value) })}
                        />
                    </div>
                </div>
                <div className='labelStyle '>
                    <label className='w-28'>Image</label>
                    <input className='input border-none' type="file" onChange={convertToBase64} />
                </div>
                <div className='absolute left-0 bottom-0 w-full'>
                    <button onClick={icecekPost} className='border hover:bg-green-400 font-semibold w-full p-1 rounded-lg text-white bg-green-600'>İçecek Ekle</button>
                </div>
            </div>
        </div>
    );
};

export default IceceklerData;
