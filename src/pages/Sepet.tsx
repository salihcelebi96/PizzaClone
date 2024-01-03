import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { SepetData } from '../reducers/sepetSlice';
import { FaTrash } from 'react-icons/fa';
import { deleteItems } from '../reducers/sepetSlice';

const Sepet: React.FC = () => {
  const data = useSelector((state: RootState) => state.sepet.items);
  const dispatch = useDispatch();

  const handleDelete = (itemId: string) => {
    // Use arrow function here and fix the argument to deleteItems
    dispatch(deleteItems([itemId]));
  };

  return (
    <div>
      <div className='grid sm:grid-cols-2 my-5 text-xl  font-semibold mx-10 md:grid-cols-4 justify-center '>
        {data.map((item: SepetData) => (
          <div className='' key={item._id}>
            <div className='flex p-2 my-2 '>
              <div className='flex items-center'>
                <div>{item.tür}</div>
                <div>
                  <img src={item.url} alt={item.tür} className='w-40' />
                </div>
                <div>
                  {item.fiyatlar} TL
                  </div>
              </div>
              <div>
                <FaTrash onClick={() => handleDelete(item._id)} className='cursor-pointer ml-2' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sepet;
