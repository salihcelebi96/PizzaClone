import React from 'react'
import Logo from "../assets/logo/logo-white.svg";
import { FaPhoneAlt } from "react-icons/fa";
import "../css/footer.css";
import Google from "../assets/logo/googleplay.png";
import { CiTwitter } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { SiInstagram } from "react-icons/si";
import { CiYoutube } from "react-icons/ci";


const Footer: React.FC = () => {

    const googleStore = "https://play.google.com/store/apps/details?id=tr.com.pizzahut";
    





    return (
        
        <div className='h-[470px] flex justify-center items-center flex-col bg-black text-white'>
            <div className='flex   gap-10 '>
                <div className='w-[284px] h-[169px]  flex flex-col  justify-between '>
                    <div className=''>
                        <div className=''>
                            <img className='' src={Logo} alt="" />
                        </div>
                        <div className='border bg-gray-700 cursor-pointer  h-[48px] border-none w-[166px] hover:scale-90 duration-300   flex   p-2 gap-2 my-5 justify-center items-center rounded-3xl'>
                            <FaPhoneAlt />
                            <p>444 6 555</p>
                        </div>
                    </div>


                </div>
                <div>
                    <ul className='list'>
                        <li className='list-item'>Kampnanyalar</li>
                        <li className='list-item'>Pizzalar</li>
                        <li className='list-item'>WingStreet</li>
                        <li className='list-item'>Yan Ürünler</li>
                        <li className='list-item'>Restoranlar</li>
                    </ul>
                </div>
                <div>
                    <ul className='list'>
                        <li className='list-item'>Temassız Teslimat Nedir?</li>
                        <li className='list-item'>Her Dilime Güven</li>
                        <li className='list-item'>Kişisel Verilerin Korunması</li>
                        <li className='list-item'>Çerez Politikası</li>
                        <li className='list-item'>Kullanım Koşulları</li>
                    </ul>
                </div>
                <div>
                    <ul className='list'>
                        <li className='list-item'>Alerjen Listesi</li>
                        <li className='list-item'>Hut'la Katla Koşulları</li>
                        <li className='list-item'>İK Başvuru Formu</li>
                        <li className='list-item'>İletişim</li>
                    </ul>
                </div>
                <div className='flex flex-col gap-5'>
                    <p>Uygulamamızı İndirin</p>
                    <div className='border p-2'>
                        <a className='' href={googleStore} target='_blank' rel='noopener noreferrer'>
                            <img className='w-40' src={Google} alt="" />
                        </a>
                    </div>

                    <p>Bizi Takip Edin</p>
                    <div className='flex gap-5 icon-container '>
                        <CiTwitter size="2em" />
                        <CiFacebook size="2em" />
                        <SiInstagram size="2em" />
                        <CiYoutube size="2em" />
                    </div>
                </div>



            </div>
            <div className='flex text-sm  justify-between sm:gap-7  lg:gap-28 my-7   '>
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

export default Footer;
