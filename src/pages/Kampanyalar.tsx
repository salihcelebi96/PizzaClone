import { useEffect, useState} from "react"
import {pushNewKampanya} from "../reducers/kampanyaSlice"
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosResponse } from 'axios';
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import { pushNewItems, SepetData} from "../reducers/sepetSlice";
import Loading from "../components/Loadings";

const Kampanyalar :React.FC = () => {
  const [loading, setLoading]=useState(true);
  


    const data = useSelector((state : RootState) => state.kampanya.kampanya);

    useEffect(()=> {
      if(data.length >0){
        setLoading(false);
      }
    },[data])



    
    const dispatch = useDispatch();
    
    interface KampanyaData {
        _id: string;
        tür: string;
        fiyat:number;
        url: string;
      }

      const handleBasket = (item:KampanyaData) => {
           const newSepetData:SepetData = {
            _id: item._id,
            tür: item.tür,
            fiyatlar: item.fiyat,
            url: item.url,

          }
          dispatch(pushNewItems([newSepetData]));
          
      }

       

      interface ExtendedImportMeta extends ImportMeta {
        env: {
          VITE_APP_URL: string;
          
        };
      }
      
      const apiUrl = (import.meta as ExtendedImportMeta).env.VITE_APP_URL;

      useEffect(() => {

        axios.get< KampanyaData[]>(`${apiUrl}/api/kampanyalar`)
            .then((response: AxiosResponse<KampanyaData[]>) => {
                
                dispatch(pushNewKampanya(response.data))
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    



    return (
      <div className='grid sm:grid-cols-2 text-xl font-semibold m-16 md:grid-cols-4 justify-center gap-5'>
        {loading ? (
          <Loading />
        ) : (
          <>
            {data.map((item: KampanyaData) => (
              <div className='border hover:scale-105 duration-300' key={item._id}>
                <div className='h-64 items-center flex justify-center p-2 my-2'>
                  <div className='flex flex-col justify-center gap-3 items-center'>
                    <div>{item.tür}</div>
                    <div><img src={item.url} alt={item.tür} className='w-40' /></div>
                    <div>{item.fiyat} TL</div>
                  </div>
                </div>
                <div onClick={() => handleBasket(item)} className='border p-1 px-3 flex justify-center hover:bg-red-400 bg-red-600 text-white'>
                  <Link className='w-full h-full text-center' to="/sepet">Sipariş Ver</Link>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    );
    
}

export default Kampanyalar