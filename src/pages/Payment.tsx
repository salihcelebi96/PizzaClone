import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import Chip from "../assets/logo/credit-card.png";
import Visa from "../assets/logo/visa2.png";
import MasterCard from "../assets/logo/mastercard_logo.jpg";
import "../css/payment.css";
import CardBack from "../components/CardBack";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { emptySepet } from "../reducers/sepetSlice";
import axios from 'axios';
import { pushToOrdered } from "../reducers/sepetSlice";




interface CardInfo {
  totalPrice: string;
  cardNumber: string;
  name: string;
  month: string;
  years: string;
  cvc: string;


}

interface cardData {
  _id: string;
  cardNumber: string;
  name: string;
  month: string;
  years: string;
  cvc: string;
  activeUserEmail: string;
}



const Payment: React.FC = () => {
  const notify = () => toast("Sipariş Verildi !");
  const dispatch = useDispatch();
  const activeUser = useSelector((state: RootState) => state.allUser.activeUser?.email) ?? "";
  

  interface ExtendedImportMeta extends ImportMeta {
    env: {
      VITE_APP_URL: string;

    };
  }

  const api = (import.meta as ExtendedImportMeta).env.VITE_APP_URL;

 



  const [cardNumber, setCardNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [years, setYears] = useState<string>("");
  const [cvc, setCvc] = useState<string>("");
  const [cardData, setCardData] = useState<cardData[]>([]);
  const [isCvcActive, setIsCvcActive] = useState<boolean>(false);
  const [validCard, setValidCard] = useState<boolean>(false);
  const [activeCard, setActiveCard] = useState<cardData[]>([]);
  const [isCardActive, setIsCardActive] = useState<string>("");

  


  const navigate = useNavigate();


  const cvcInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cvcInputRef.current && !cvcInputRef.current.contains(event.target as Node)) {
        setIsCvcActive(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cvcInputRef])

  const handleCvcClick = () => {

    setIsCvcActive(true);
  };



  const masterCardStartDigits = ['5'];
  const visaStartDigits = ['4'];

  const detectCardType = (number: string) => {
    const firstDigit = number.charAt(0);

    if (masterCardStartDigits.includes(firstDigit)) {
      return 'MasterCard';
    } else if (visaStartDigits.includes(firstDigit)) {
      return 'Visa';
    } else {
      return 'Unknown';
    }
  };



  const firstDivided = typeof month === 'string' ? month.substring(0, 2) : "";
  const secondDivided = typeof years === 'string' ? years.substring(0, 2) : "";







  const cardType = detectCardType(cardNumber);
  const cardLogo = (cardNumber && (masterCardStartDigits.includes(cardNumber.charAt(0)) || visaStartDigits.includes(cardNumber.charAt(0))))
    ? (cardType === 'MasterCard' ? MasterCard : Visa)
    : null;

  const bgColorCard = () => {
    if (cardLogo === MasterCard) {
      return { backgroundColor: "rgba(18,19,19,255)", color: "white" };
    } else if (cardLogo === Visa) {
      return { backgroundColor: "rgba(13,48,204,255)", color: "white" };
    }

    return {};
  };

  const data = useSelector((state: RootState) => state.sepet.items);
  const totalPrice = data.reduce((acc, item) => acc + item.fiyatlar, 0).toFixed(2);




  const postData = async () => {
    try {
      const apiUrl = `${api}/api/payment`;
      const requestData: CardInfo = {
        totalPrice,
        cardNumber,
        name,
        month,
        years,
        cvc,


      };
      const response = await axios.post(apiUrl, requestData);

      console.log('Server Response:', response.data);
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };



  const handleCardNumber = () => {
    if (cardNumber.length === 16 && name && years.length === 2 && month.length === 2 && cvc.length === 3) {
      postData();
      setValidCard(true);
      navigate("/");
      notify();
      dispatch(emptySepet());
      console.log(validCard);
      dispatch(pushToOrdered(data));


    } else {
      alert("Hatalı veya eksik bilgi girdiniz");
    }
  }

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.get(`${api}/api/card`);
        console.log('Card Data:', response.data);
        const filteredData = response.data.filter((card: cardData) => card.activeUserEmail === activeUser);
        console.log("filteredData", filteredData);
        setCardData(filteredData);
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    fetchCardData();
  }, [api]);




const handleActiveCard = (card: cardData) => {
 setActiveCard([card]);
 setIsCardActive(card._id);
 
};

useEffect(() => {
  console.log("activecard", activeCard);
  if (activeCard && activeCard.length > 0) {
    setName(activeCard[0].name);
    setCardNumber(activeCard[0].cardNumber);
    setYears(activeCard[0].years);
    setMonth(activeCard[0].month);
    setCvc(activeCard[0].cvc);
  }
}, [activeCard]);








  return (
    <div className=' h-[700px]  flex my-5 justify-center'>
      <div className='sm:border border-none flex text-gray-500 flex-col items-center   w-[400px] sm:w-[600px]'>
        {isCvcActive ? (
          <CardBack bgColor={bgColorCard} cvc={cvc} />
        ) : (

          <div style={bgColorCard()} className='relative credit-card bg-gray-300 border  w-[250px] sm:w-[300px] rounded-2xl h-40 mt-6'>
            <div className='w-10 absolute top-2 left-4'>
              <img src={Chip} alt="" />
            </div>
            {cardLogo && (
              <div className='absolute right-5'>
                <img className='h-16 w-28' src={cardLogo} alt="" />
              </div>
            )}
            <div className='h-full flex items-center justify-center'>
              <div
 
                className='text-6xl top-10 left-10'>
                {cardNumber ? (
                  <p className='text-lg'>
                    {cardNumber.replace(/(\d{4})/g, '$1 ').trim()}
                  </p>
                ) : (
                  <p> ... ... ... ... </p>
                )}
              </div>
            </div>
            <div className='absolute bottom-0 w-full'>
              <div className='flex justify-around w-full items-center'>
                <div>
                  {name ? (
                    <p> {name} </p>
                  ) : (
                    <p>Your Name Here</p>
                  )}
                </div>
                <div className='flex flex-col '>
                  <div >
                    <p className='text-xs h-2 pb-3'>Valid thru</p>
                  </div>
                  <div className=''>
                    <p className='text-xl date'>  {firstDivided}  <span className='text-sm'>/</span>  {secondDivided}  </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        <div className='w-full'>
          <div className='flex mt-5 justify-around'>
            <input value={totalPrice} className='inputCard w-full' type="text" placeholder='Amount' disabled />

          </div>
          <div>
            <input
              value={cardNumber}
              onChange={(e) => {

                const formattedCardNumber = e.target.value.replace(/\D/g, '').slice(0, 16);
                setCardNumber(formattedCardNumber);
              }}
              className='inputCard w-full'
              type="text"
              placeholder='Card Number' />

          </div>
          <div>
            <input onChange={(e) => setName(e.target.value)} className='inputCard w-full' type="text" placeholder='Name' />
          </div>
          <div className='flex w-full  '>
            <div className='flex  gap-1'>
              <input
                onChange={(e) => {
                  const formattedMonth = e.target.value.replace(/\D/g, '').slice(0, 2);
                  setMonth(formattedMonth);
                }}
                className='inputCard'
                type="text"
                placeholder='MM'
                maxLength={2}
              />

              <span className="text-3xl  flex items-center"> / </span>

              <input
                onChange={(e) => {
                  const formattedYear = e.target.value.replace(/\D/g, '').slice(0, 2);
                  setYears(formattedYear);
                }}
                className='inputCard'
                type="text"
                placeholder='YY'
                maxLength={2}
              />
            </div>

            <div className=''>
              <input
                onClick={handleCvcClick}
                ref={cvcInputRef}
                maxLength={3}
                onChange={(e) => {
                  const formattedCvc = e.target.value.replace(/\D/g, '').slice(0, 3);
                  setCvc(formattedCvc);
                }}
                className={`inputCard ${isCvcActive ? 'active' : ''}`}
                type="text"
                placeholder='CVC'
              />
            </div>
          </div>
          <div className="cardData flex-col flex gap-2 ">
            <div className='text-center  mt-10'>
              Kayıtlı Kartlar
            </div>
            {cardData.map((card, index) => (
 <div className={`flex justify-around border  h-10 relative gap-5 ${isCardActive === card._id && "bg-gray-200"}`} key={index}>
    {card.cardNumber && (
      <div className='w-40 absolute left-0 h-full'>
        {card.cardNumber.startsWith('4') ? (
          <img className='h-full w-9 border rounded-md' src={Visa} alt='' />
        ) : (
          <img className='h-full w-9 border rounded-md' src={MasterCard} alt='' />
        )}
      </div>
    )}

    <div className='w-40 flex justify-center pl-8 items-center'> <p className=''>{card.cardNumber}</p></div>
    <div className='w-40 flex justify-center pr-8 items-center'><p className=''>{card.name}</p></div>
    <div 
      onClick={()=> handleActiveCard(card)} 
      className={`border-l p-1 cursor-pointer hover:bg-red-400 bg-red-500 text-white absolute right-0 h-full ${
        activeCard.some(active => active.cardNumber === card.cardNumber) ? 'bg-gray-300' : ''
      }`}
    >
      Seç
    </div>
  </div>
))}

          </div>



        </div>
        <div className='border w-32 text-center mt-5 bg-green-600 hover:bg-green-400 text-white py-1 rounded-2xl'>
          <button onClick={handleCardNumber}>Ödeme Yap</button>
        </div>
      </div>
    </div>
  );
}

export default Payment;