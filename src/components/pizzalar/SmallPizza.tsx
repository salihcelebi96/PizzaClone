import { useSelector} from 'react-redux';
import { RootState } from '../../redux/store';
import { Link } from "react-router-dom";
import { IDataItem } from '../../reducers/PizzaSlice';
import { pushNewItems} from "../../reducers/sepetSlice";

const Pizza: React.FC = () => {
  const data = useSelector((state : RootState) => state.pizza.pizzas)

  return (
    <div className='grid sm:grid-cols-2 text-xl font-semibold mx-10 md:grid-cols-4 justify-center gap-5'>
    {data.map((item: IDataItem) => (
      <div className='border hover:scale-105 duration-300' key={item._id}>
        <div className='h-64 items-center flex justify-center p-2 my-2'>
          <div className='flex flex-col justify-center items-center'>
            <div>{item.tür}</div>
            <div> <img src={item.url} alt={item.tür} className='w-40' /> </div>
            <div>{item.fiyatlar.küçük} TL</div>
          </div>
        </div>
        <div className='border p-1 px-3 flex justify-center hover:bg-red-400 bg-red-600 text-white'>
          <Link to="/sepet">Sipariş Ver</Link>
        </div>
      </div>
    ))}
  </div>
  );
};

export default Pizza;
