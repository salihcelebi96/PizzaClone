import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Chip from "../assets/logo/credit-card.png";
import Visa from "../assets/logo/visa2.png";
import MasterCard from "../assets/logo/mastercard_logo.jpg";
import "../css/payment.css";
import { set } from 'mongoose';

const Payment: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [lastDate, setLastDate] = useState<string>("");
  const [cvc, setCvc] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

 

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

  
   
const firstDivided = typeof lastDate === 'string' ? lastDate.substring(0, 2) : "";
const secondDivided = typeof lastDate === 'string' ? lastDate.substring(2, 4) : "";

    
  





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

  return (
    <div className='h-[800px] flex my-5 justify-center'>
      <div className='border flex text-gray-500 flex-col items-center w-[600px]'>
        <div style={bgColorCard()} className='relative credit-card bg-gray-300 border w-[300px] rounded-2xl h-40 mt-6'>
          <div className='w-10 absolute top-2 left-4'>
            <img src={Chip} alt="" />
          </div>
          {cardLogo && (
            <div className='absolute right-5'>
              <img className='h-16 w-28' src={cardLogo} alt="" />
            </div>
          )}
          <div className='h-full flex items-center justify-center'>
            <div className='text-6xl top-10 left-10'>
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
                <div  className=''>
                  <p className='text-xl date'>  {firstDivided}  <span className='text-sm'>/</span>  {secondDivided}  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='flex mt-5 justify-around gap-4'>
            <input value={totalPrice} className='input' type="text" placeholder='Amount' disabled />
            <input onChange={(e) => setEmail(e.target.value)} className='input ' type="text" placeholder='Your Email' />
          </div>
          <div>
            <input minLength={16} maxLength={16} onChange={(e) => setCardNumber(e.target.value)} className='inputCard' type="text" placeholder='Card Number' />
          </div>
          <div>
            <input onChange={(e) => setName(e.target.value)} className='inputCard' type="text" placeholder='Name' />
          </div>
          <div className='flex mt-5 justify-around gap-4'>
            <input maxLength={4} onChange={(e)=> setLastDate(e.target.value)} className='input ' type="text" placeholder='Valid thru' />
            <input maxLength={3} minLength={3} onChange={(e) => setCvc(e.target.value)} className='input ' type="text" placeholder='CVC' />
          </div>
        </div>
        <div className='border w-32 text-center mt-5 bg-green-600 hover:bg-green-400 text-white py-1 rounded-2xl'>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
