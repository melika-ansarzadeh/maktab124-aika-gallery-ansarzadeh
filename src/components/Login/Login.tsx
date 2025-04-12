'use client';
import { loginLocalization } from '@/constants/localization/localization';
import Input from '@/shared/Inputs/Inputs';
import Button from '@/shared/Button/Button';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginUser } from '@/services/login/login';

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
      const response = await LoginUser({
        username: username,
        password: password,
      });

      if (response?.status === 200) {
        const userData = response.data;
        localStorage.setItem('user', JSON.stringify(response.data));
        toast.success(loginLocalization.toastsuccess);

        if (userData.role === 'ADMIN') {
          router.push('homeAd');
        } else {
          router.push('/');
        }
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
      <div className="background absolute inset-0 bg-white/30 backdrop-blur-xl -z-10"></div>
      <div className="relative h-[40rem] mt-5 z-10 bg-black/40 rounded-2xl flex justify-between px-48 items-center">
        <div className="text-white flex flex-col gap-4 ">
          <p className="text-2xl mb-3 font-semibold">
            {loginLocalization.shine}✨
          </p>
          <div className="text-xl font-light">
            <p>{loginLocalization.text1}</p>
            <p>{loginLocalization.text2}</p>
          </div>
          <div className="text-xl font-light">
            <p>{loginLocalization.text3}</p>
            <p>{loginLocalization.text4}</p>
          </div>
        </div>
        <form className="h-[26rem] w-[24rem] mt-5 z-10 bg-black/10 p-8 backdrop-blur-xl rounded-2xl flex flex-col gap-6 items-center">
          <p className="text-white text-xl font-semibold">
            {loginLocalization.loginToAccount}
          </p>
          <Input
            label={loginLocalization.email}
            name="email"
            type="email"
            className="p-1 w-72 rounded-md outline-none focus:outline focus:outline-black"
            value=""
          />
          <Input
            label={loginLocalization.password}
            name="password"
            type="password"
            className="p-1 w-72 rounded-md outline-none focus:outline focus:outline-black"
            value=""
          />
          <a className="text-white text-xs ml-48 underline" href="signUp">
            {loginLocalization.fogetPassword}
          </a>
          <a href="">
            <Button
              className="bg-gray-200 w-24 h-9 pb-1 rounded-lg active:scale-95"
              children={loginLocalization.login}
            />
          </a>
          <div className="flex gap-1 items-center text-nowrap text-white">
            <p className="text-sm font-light">
              {loginLocalization.doYouWantAccount}
            </p>
            <a className="text-white text-xs underline font-thin" href="signUp">
              {loginLocalization.signUp}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
