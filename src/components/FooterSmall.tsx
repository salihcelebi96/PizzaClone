import React from 'react'
import Logo from "../assets/logo/logo-white.svg";
import { FaPhoneAlt } from "react-icons/fa";
import "../css/footer.css";
import Google from "../assets/logo/googleplay.png";
import { CiTwitter } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { SiInstagram } from "react-icons/si";
import { CiYoutube } from "react-icons/ci";

const FooterSmall: React.FC = () => {

    const googleStore = "https://play.google.com/store/apps/details?id=tr.com.pizzahut";





    return (

        <div className='h-auto   flex justify-center gap-5 items-center flex-col bg-black text-white'>
            <div>
                <div className='flex justify-center mt-2 flex-col items-center'>
                    <div className=''>
                        <img className='w-24' src={Logo} alt="" />
                    </div>
                    <div className='border bg-gray-700 cursor-pointer  h-[40px] border-none w-[120px] hover:scale-90 duration-300   flex   p-2 gap-2 my-5 justify-center items-center rounded-3xl'>
                        <FaPhoneAlt />
                        <p>444 6 555</p>
                    </div>
                </div>
            </div>

            <div>
                <div className='border p-2'>
                    <a className='' href={googleStore} target='_blank' rel='noopener noreferrer'>
                        <img className='w-28' src={Google} alt="" />
                    </a>
                </div>

            </div>

            <div className='flex-col items-center text-sm gap-2 flex'>
                <p>Temassız Teslimat Nedir ?</p>
                <p>Her Dilime Güven</p>
                <p>Kişisel Verilerin Korunması</p>
                <p>Çerez Politikası</p>
                <p>Kullanım Koşulları</p>
                <p>Alerjen Listesi</p>
                <p>Hut'la Katla Koşulları</p>
                <p>İK Başvuru Formu</p>
                <p>İletişim</p>
            </div>
            <div>
                <div className='flex gap-5 icon-container '>
                    <CiTwitter size="2em" />
                    <CiFacebook size="2em" />
                    <SiInstagram size="2em" />
                    <CiYoutube size="2em" />
                </div>
            </div>

            <div className='flex flex-col text-sm mx-5 gap-2 mb-3  items-center    '>
                <div>
                    © Pizza Hut Türkiye 2020. Tüm hakları saklıdır.
                </div>
                <div>
                    Ürünlerimiz gluten, balık, süt ürünleri ve susam ürünleri bulaşma riski olan alanda üretilmiştir.
                </div>
            </div>
         </div>
    )
}

export default FooterSmall;
