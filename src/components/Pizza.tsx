// Pizza.tsx

import LargePizza from "../components/pizzalar/LargePizza";
import SmallPizza from "../components/pizzalar/SmallPizza";
import MediumPizza from "../components/pizzalar/MediumPizza";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { pushNewPizzas } from "../reducers/PizzaSlice";
import { RootState } from "../redux/store";
import Loading from "../components/Loadings";


interface IDataItem {
  _id: string;
  tür: string;
  fiyatlar: {
    büyük: number;
    orta: number;
    küçük: number;
  };
  url: string;
}

interface ExtendedImportMeta extends ImportMeta {
  env: {
    VITE_APP_URL: string;
    // Diğer ortam değişkenleri buraya eklenebilir
  };
}

const apiUrl = (import.meta as ExtendedImportMeta).env.VITE_APP_URL;

const Pizza: React.FC = () => {
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  const [option, setOption] = useState<string>("Small");

  useEffect(() => {
    axios.get<IDataItem[]>(`${apiUrl}/api/pizza`)
      .then((response: AxiosResponse<IDataItem[]>) => {
        dispatch(pushNewPizzas(response.data))
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSelect = (selectedOption: string) => {
    setOption(selectedOption);
  };

  const options = ["Large", "Medium", "Small"];
  const data = useSelector((state:RootState)=> state.pizza.pizzas)

  useEffect(()=> {
    if(data.length > 0) {
      setLoading(false);
  }})

  return (
    <div className="mb-16">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="mb-10">
            <select className="border outline-none" name="" id="" value={option} onChange={(e) => handleSelect(e.target.value)}>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
  
          {option === "Large" && <LargePizza />}
          {option === "Medium" && <MediumPizza />}
          {option === "Small" && <SmallPizza />}
        </>
      )}
    </div>
  );
  
};

export default Pizza;
