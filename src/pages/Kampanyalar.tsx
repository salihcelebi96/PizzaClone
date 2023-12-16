import { useEffect } from "react"
import {pushNewKampanya} from "../reducers/kampanyaSlice"
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosResponse } from 'axios';
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

const Kampanyalar :React.FC = () => {
    const data = useSelector((state : RootState) => state.kampanya.kampanya);

    const dispatch = useDispatch();
    
    interface KampanyaData {
        _id: string;
        tür: string;
        fiyat:number;
        url: string;
      }




      useEffect(() => {

        axios.get< KampanyaData[]>('http://localhost:3003/kampanyalar')
            .then((response: AxiosResponse<KampanyaData[]>) => {
                
                dispatch(pushNewKampanya(response.data))
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    



  return (
    <div className='grid sm:grid-cols-2 text-xl font-semibold  m-10 md:grid-cols-4 justify-center gap-5'>
    {data.map((item: KampanyaData) => (
      <div className='border hover:scale-105 duration-300' key={item._id}>
        <div className='h-64 items-center flex justify-center p-2 my-2'>
          <div className='flex flex-col justify-center gap-3 items-center'>
            <div>{item.tür}</div>
            <div> <img src={item.url} alt={item.tür} className='w-40' /> </div>
            <div>{item.fiyat} TL</div>
          </div>
        </div>
        <div className='border p-1 px-3 flex justify-center hover:bg-red-400 bg-red-600 text-white'>
          <Link to="/sepet">Sipariş Ver</Link>
        </div>
      </div>
    ))}
  </div>
  )
}

export default Kampanyalar