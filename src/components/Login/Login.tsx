'use client';
import { loginLocalization } from '@/constants/localization/localization';
import Input from '@/shared/Inputs/Inputs';
import Button from '@/shared/Button/Button';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginUser } from '@/services/login/login';
import Link from 'next/link';
import Loading from '../Loading/Loading';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const validate = () => {
    const newErrors: { username?: string; password?: string } = {};

    const usernameRegex = /^[a-zA-Z]{3,20}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!username) {
      newErrors.username = loginLocalization.usernameriquired;
    } else if (!usernameRegex.test(username)) {
      newErrors.username = loginLocalization.usernamevalidate;
    }

    if (!password) {
      newErrors.password = loginLocalization.passwordriquired;
    } else if (!passwordRegex.test(password)) {
      newErrors.password = loginLocalization.passwordvalidate;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return; 
    setLoading(true);

    try {
      const response = await LoginUser({ username, password });

      if (response?.status === 200) {
        const userData = response.data.data.user;
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success(loginLocalization.toastsuccess);

       if (userData.role?.toLowerCase() === 'admin') {
         router.push('/homeAd');
         console.log('User data:', userData);
       } else {
         router.push('/');
       }
       localStorage.setItem('token', response.data.token.accessToken);
      } else {
        toast.error(loginLocalization.toasrerror);
      }
    } catch (error) {
      toast.error(loginLocalization.toasrerror);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-[45.5rem] p-6 font-sahel">
      <ToastContainer />
      <div className="background-login absolute inset-0 bg-white/30 backdrop-blur-xl -z-10"></div>

      <div className="relative h-[40rem] mt-5 z-10 bg-white/10 rounded-2xl flex justify-center px-24 mx-40 items-center">
        <form
          onSubmit={handleSubmit}
          className="h-[27rem] w-[24rem] mt-5 z-10 bg-black/10 p-8 backdrop-blur-xl rounded-2xl flex flex-col gap-6 items-center"
        >
          <p className="text-white text-xl font-semibold">
            {loginLocalization.loginToAccount}
          </p>

          <Input
            label={loginLocalization.username}
            name="username"
            type="text"
            className="p-3 w-72 text-xs rounded-md outline-none focus:border-2 focus:border-black"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder={loginLocalization.enterUsername}
          />
          {errors.username && (
            <span className="text-red-500 text-xs -mt-4 -mb-4">
              {errors.username}
            </span>
          )}

          <div className="relative">
            <Input
              label={loginLocalization.password}
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="p-3 w-72 text-xs rounded-md outline-none focus:border-2 focus:border-black"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={loginLocalization.enterPassword}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute left-3 bottom-1 transform -translate-y-1/2 text-lg text-custom-400"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs -mt-4 -mb-4">
              {errors.password}
            </span>
          )}

          <Link className="text-white text-xs ml-48 underline" href="signUp">
            {loginLocalization.fogetPassword}
          </Link>

          <Button
            type='submit'
            className="bg-gray-100 text-gray-500 w-24 h-9 pb-1 rounded-lg active:scale-95"
            children={loginLocalization.login}
          />

          <div className="flex gap-1 items-center text-nowrap text-white">
            <p className="text-sm font-light">
              {loginLocalization.doYouWantAccount}
            </p>
            <Link
              className="text-white text-xs underline font-thin"
              href="signUp"
            >
              {loginLocalization.signUp}
            </Link>
          </div>
        </form>

        {loading && <Loading />}
      </div>
    </div>
  );
}
