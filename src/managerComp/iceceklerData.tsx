import React, { useState } from 'react';
import axios from 'axios';
import "../css/manager.css";

const IceceklerData: React.FC = () => {
    const [iceceklerData, setIceceklerData] = useState({
        tür: '',
        fiyat: 0,
        aciklama: '',
        image: '',
    });

    const IceceklerPost = async () => {
        try {
            const apiUrl = 'http://localhost:3004/icecekler';
            const response = await axios.post(apiUrl, iceceklerData);

            console.log('Server Response:', response.data);
        } catch (error: any) {
            console.error('Error:', error.message);
        }
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        // Dosya seçildikçe yapılacak işlemler
    };

    return (
        <div className=''>
            <div className='h-[500px] relative  border flex flex-col gap-5  p-5  '>
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
                    <div className='labelStyle'>
                        <label className='w-28'>Açıklama</label>
                        <input
                            className='input'
                            type="text"
                            value={iceceklerData.aciklama}
                            onChange={(e) => setIceceklerData({ ...iceceklerData, aciklama: e.target.value })}
                        />
                    </div>
                </div>
                <div className='labelStyle'>
                    <label className='w-28'>Image</label>
                    <input className='input border-none' type="file" onChange={handleFileChange} />
                </div>
                <div className='flex justify-center'>
                    <button onClick={IceceklerPost} className='border p-1 rounded-lg text-white bg-green-600'>İçecek Gönder</button>
                </div>
            </div>
        </div>
    );
};

export default IceceklerData;
