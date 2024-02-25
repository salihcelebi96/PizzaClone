import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ProfilPage :React.FC = () => {
    const profilName = useSelector((state: RootState) => state.login.profilName);
    
  return (
    <div>
      <div>
        <div>
            <FaRegUser />
        </div>
        <div>
            {profilName}
        </div>
      
      </div>
      
      
    </div>
  )
}

export default ProfilPage 
