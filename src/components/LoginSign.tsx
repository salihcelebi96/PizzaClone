import React from 'react';
import SignUp from '../pages/SignUp';
import Login from '../components/Login';
import {  useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const LoginSign: React.FC = () => {
  const signOpen = useSelector((state: RootState) => state.login.isSignUp);
  const loginComp = useSelector((state: RootState) => state.login.isAuthenticated);

  return (
    <div>
      {signOpen && !loginComp && <SignUp />}
      {!signOpen && loginComp && <Login />}
    </div>
  );
};

export default LoginSign;
