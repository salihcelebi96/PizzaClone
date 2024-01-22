import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { SepetData } from '../reducers/sepetSlice';
import { FaTrash } from 'react-icons/fa';
import { deleteItems } from '../reducers/sepetSlice';
import "../css/sepet.css";
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sepet: React.FC = () => {
  const data = useSelector((state: RootState) => state.sepet.items);
  const userLogin = useSelector((state :RootState) => state.login.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = () => toast("Giriş Yapmalısınız !");





  const handleDelete = (itemId: string) => {
    // Use arrow function here and fix the argument to deleteItems
    dispatch(deleteItems([itemId]));
  };

  const ToplamPrice = () => {
    console.log(userLogin);
    const totalPrice = data.reduce((acc, item) => acc + item.fiyatlar, 0);

   

    useEffect(() => {
      if (totalPrice === 0) {
        navigate("/");
        
      }
    })

   

    return totalPrice.toFixed(2); 
  };

  const handleBasket = () => {
    if(userLogin){
      navigate("/payment");
    }else{
      notify();
    }
  }
  



  return (
    <div className=' flex  h-screen'>
      <div className='grid  sm:grid-cols-1 my-5 text-md sm:text-sm lg:text-xl grid-rows-4 font-semibold mx-10 md:grid-cols-1 w-full justify-center '>
        {data.map((item: SepetData) => (
          <div className='flex-container' key={item._id}>
            <div className='flex p-2 my-2 '>
              <div className='flex  justify-between w-full gap-5'>
                <div className='flex items-center gap-5'>
                  <div>
                    <img src={item.url} alt={item.tür} className='w-40' />
                  </div>
                  <div>
                    {item.tür}
                  </div>

                </div>

                <div className='flex gap-6 items-center'>
                  <div>
                    {item.fiyatlar} TL
                  </div>
                  <div className='text-red-600'>
                    <FaTrash onClick={() => handleDelete(item._id)} className='cursor-pointer ' />
                  </div>
                </div>

              </div>


            </div>

          </div>
        ))}
        <div>
          <div
            className=' flex justify-end px-6 gap-2'>
            <p className='text-red-500'>Toplam: {ToplamPrice()} TL</p>    
          </div>
          <div className=' flex justify-end   px-6 gap-2'>
            <button onClick={handleBasket}   className='bg-green-600 hover:bg-green-400 text-white p-1 border rounded-xl'  >
                 Siparişi Tamamla 
              </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Sepet;
