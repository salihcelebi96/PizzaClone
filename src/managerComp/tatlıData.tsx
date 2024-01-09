import React, { useState } from 'react';
import axios from 'axios';
import "../css/manager.css";

const TatliData: React.FC = () => {
    const [tatliData, setTatliData] = useState({
        tür: '',
        fiyat: 0,
        image: null,
    });

    const TatliPost = async () => {
        try {
            const apiUrl = 'http://localhost:3005/tatlilar';
            const response = await axios.post(apiUrl, tatliData);

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
                    <label className='w-28'>Tatlı Türü</label>
                    <input
                        className='input'
                        type="text"
                        value={tatliData.tür}
                        onChange={(e) => setTatliData({ ...tatliData, tür: e.target.value })}
                    />
                </div>
                <div className='labelStyle '>
                    <label className='w-28'>Fiyat</label>
                    <input
                        className='input'
                        type="number"
                        value={tatliData.fiyat}
                        onChange={(e) => setTatliData({ ...tatliData, fiyat: parseFloat(e.target.value) })}
                    />
                </div>
                <div className='labelStyle '>
                    <label className='w-28'>Image</label>
                    <input className='input border-none' type="file" onChange={handleFileChange} />
                </div>
                <div className='flex justify-center'>
                    <button onClick={TatliPost} className='border p-1 rounded-lg text-white bg-green-600'>Tatlı Gönder</button>
                </div>
            </div>
        </div>
    );
};

export default TatliData;
