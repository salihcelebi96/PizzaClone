import React, { useState } from 'react';
import axios from 'axios';
import "../css/manager.css";

interface WingDataState {
    tür: string;
    Fiyat: number;
    Açıklama: string;
    Url: string;
}

const WingData: React.FC = () => {
    const [image, setImage] = useState<string>("");
    const [wingData, setWingData] = useState<WingDataState>({
        tür: '',
        Fiyat: 0,
        Açıklama: '',
        Url: image || '',
    });

    const handleWingPost = async () => {
        try {
            const apiUrl = 'http://localhost:3002/wings';
            const response = await axios.post(apiUrl, wingData);

            console.log('Server Response:', response.data);
        } catch (error: any) {
            console.error('Error:', error.message);
        }
    };

    const convertToBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if (e.target.files && e.target.files.length > 0) {
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                const base64String = reader.result as string;
                setImage(base64String);
                setWingData({ ...wingData, Url: base64String });
            };
            reader.onerror = (error) => {
                console.log(error);
            };
        }
    };

    return (
        <div className=''>
            <div className='h-[500px] relative border flex flex-col gap-5 p-5'>
                <div className='labelStyle'>
                    <label className='w-28'>Kanat Türü</label>
                    <input
                        className='input'
                        type="text"
                        value={wingData.tür}
                        onChange={(e) => setWingData({ ...wingData, tür: e.target.value })}
                    />
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='labelStyle'>
                        <label className='w-28'>Fiyat</label>
                        <input
                            className='input'
                            type="number"
                            value={wingData.Fiyat}
                            onChange={(e) => setWingData({ ...wingData, Fiyat: parseFloat(e.target.value) })}
                        />
                    </div>
                    <div className='labelStyle'>
                        <label className='w-28'>Açıklama</label>
                        <input
                            className='input'
                            type="text"
                            value={wingData.Açıklama}
                            onChange={(e) => setWingData({ ...wingData, Açıklama: e.target.value })}
                        />
                    </div>
                </div>
                <div className='labelStyle'>
                    <label className='w-28'>Image</label>
                    <input className='input border-none' type="file" onChange={convertToBase64} />
                </div>
                <div onClick={handleWingPost} className='absolute left-0 bottom-0 w-full'>
                    <button className='border w-full p-1 rounded-lg text-white font-semibold hover:bg-green-400 bg-green-600'>Kanat Gönder</button>
                </div>
            </div>
        </div>
    );
};

export default WingData;
