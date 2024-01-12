import React, { useState } from 'react';
import axios from 'axios';
import "../css/manager.css";

const WingData: React.FC = () => {
   
    const [wingData, setWingData] = useState({
        tür: '',
        fiyat: 0,
        aciklama: '',
        image: '',
    });

    const WingPost = async () => {
        try {
            const apiUrl = 'http://localhost:3002/wings';
            const response = await axios.post(apiUrl, wingData);

            console.log('Server Response:', response.data);
        } catch (error: any) {
            console.error('Error:', error.message);
        }
    };
   

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        setWingData({ ...wingData, image: file });
    };


    return (
        <div className=''>
            <div className='h-[500px] relative  border flex flex-col gap-5  p-5  '>
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
                            value={wingData.fiyat}
                            onChange={(e) => setWingData({ ...wingData, fiyat: parseFloat(e.target.value) })}
                        />
                    </div>
                    <div className='labelStyle'>
                        <label className='w-28'>Açıklama</label>
                        <input
                            className='input'
                            type="text"
                            value={wingData.aciklama}
                            onChange={(e) => setWingData({ ...wingData, aciklama: e.target.value })}
                        />
                    </div>
                </div>
                <div className='labelStyle'>
                    <label className='w-28'>Image</label>
                    <input className='input border-none' type="file" onChange={handleFileChange} />
                </div>
                <div  onClick={WingPost} className='absolute left-0 bottom-0 w-full'>
                    <button className='border w-full p-1 rounded-lg text-white  font-semibold hover:bg-green-400  bg-green-600'>Kanat Gönder</button>
                </div>
            </div>
        </div>
    );
};

export default WingData;
