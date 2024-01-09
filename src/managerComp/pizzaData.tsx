import React, { useState } from 'react';
import axios from 'axios';
import "../css/manager.css";

const PizzaData: React.FC = () => {
    const [pizzaData, setPizzaData] = useState({
        tür: '',
        fiyatlar: {
            büyük: 0,
            orta: 0,
            küçük: 0,
        },
        image: '',
    });

   

    const PizzaPost = async () => {
        try {
            const apiUrl = 'http://localhost:3001/pizza';
            const response = await axios.post(apiUrl, pizzaData);

            console.log('Server Response:', response.data);
        } catch (error: any) {
            console.error('Error:', error.message);
        }
    };

   

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];

    };


    return (
        <div className=''>
            <div className='h-[500px] relative  border flex flex-col gap-5  p-5  '>
                <div className='labelStyle'>
                    <label className='w-28 '>Pizza Türü</label>
                    <input
                        className='input'
                        type="text"
                        value={pizzaData.tür}
                        onChange={(e) => setPizzaData({ ...pizzaData, tür: e.target.value })}
                    />
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='labelStyle '>
                        <label className='w-28 '>Büyük Fiyat</label>
                        <input
                            className='input'
                            type="number"
                            value={pizzaData.fiyatlar.büyük}
                            onChange={(e) => setPizzaData({ ...pizzaData, fiyatlar: { ...pizzaData.fiyatlar, büyük: parseFloat(e.target.value) } })}
                        />
                    </div>
                    <div className='labelStyle'>
                        <label className='w-28 '>Orta Fiyat</label>
                        <input
                            className='input'
                            type="number"
                            value={pizzaData.fiyatlar.orta}
                            onChange={(e) => setPizzaData({ ...pizzaData, fiyatlar: { ...pizzaData.fiyatlar, orta: parseFloat(e.target.value) } })}
                        />
                    </div>
                    <div className='labelStyle'>
                        <label className='w-28 '>Küçük Fiyat</label>
                        <input
                            className='input'
                            type="number"
                            value={pizzaData.fiyatlar.küçük}
                            onChange={(e) => setPizzaData({ ...pizzaData, fiyatlar: { ...pizzaData.fiyatlar, küçük: parseFloat(e.target.value) } })}
                        />
                    </div>
                </div>
                <div className='labelStyle '>
                    <label className='w-28 '>Image</label>
                    <input className='input border-none ' type="file" onChange={handleFileChange} />
                </div>
                <div className='flex justify-center'>
                    <button onClick={PizzaPost} className='border p-1 rounded-lg text-white bg-green-600' >Pizza Gönder</button>
                </div>
            </div>
        </div>
    );
};

export default PizzaData;
