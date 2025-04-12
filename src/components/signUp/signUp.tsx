import { loginLocalization, signLocalization } from '@/constants/localization/localization';
import Button from '@/shared/Button/Button';
import Input from '@/shared/Inputs/Inputs';
import Link from 'next/link';
import React from 'react'

export default function SignUp() {
  return (
    <div className="relative w-full h-[45.5rem] p-6 font-sahel">
      <div className="background-signUp absolute inset-0 bg-white/30 backdrop-blur-xl -z-10"></div>

      <div className="relative h-[40rem] mt-5 z-10 bg-white/10 rounded-2xl flex justify-between px-24 mx-40 items-center">
        <div className="text-white flex flex-col gap-4 ">
          <p className="text-2xl mb-3 font-semibold">
            {signLocalization.shine}✨
          </p>
          <div className="text-xl font-light">
            <p>{signLocalization.text1}</p>
            <p>{signLocalization.text2}</p>
          </div>
          <div className="text-xl font-light">
            <p>{signLocalization.text3}</p>
            <p>{signLocalization.text4}</p>
          </div>
        </div>
        <form className="h-[30rem] w-[24rem] mt-5 z-10 bg-black/10 p-8 backdrop-blur-xl rounded-2xl flex flex-col gap-6 items-center">
          <p className="text-white text-xl font-semibold">
            {signLocalization.signUpAccount}
          </p>
          <Input
            label={signLocalization.firstname}
            name="firstname"
            type="text"
            className="p-3 w-72 text-xs rounded-md outline-none  focus:border-2 focus:border-black"
            value=""
            placeholder={signLocalization.enterEmail}
          />
          <Input
            label={signLocalization.username}
            name="email"
            type="email"
            className="p-3 w-72 text-xs rounded-md outline-none  focus:border-2 focus:border-black"
            value=""
            placeholder={signLocalization.enterEmail}
          />
          <Input
            label={signLocalization.password}
            name="password"
            type="password"
            className="p-3 w-72 text-xs rounded-md outline-none  focus:border-2 focus:border-black"
            value=""
            placeholder={signLocalization.enterPassword}
          />
          <Link href="">
            <Button
              className="bg-gray-100 mt-3 text-gray-500 w-24 h-9 pb-1 rounded-lg active:scale-95"
              children={loginLocalization.login}
            />
          </Link>
          <div className="flex gap-1 items-center text-nowrap text-white">
            <p className="text-sm font-light">
              {signLocalization.doYouWantAccount}
            </p>
            <Link
              className="text-white text-xs underline font-thin"
              href="login"
            >
              {signLocalization.loginAccount}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
