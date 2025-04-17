import { loginLocalization } from '@/constants/localization/localization';
import Input from '@/shared/Inputs/Inputs';
import Button from '@/shared/Button/Button';
import Link from 'next/link';

export default function Login() {
  
  return (
    <div className="relative w-full h-[45.5rem] p-6 font-sahel">
      <div className="background-login absolute inset-0 bg-white/30 backdrop-blur-xl -z-10"></div>

      <div className="relative h-[40rem] mt-5 z-10 bg-white/10 rounded-2xl flex justify-center px-24 mx-40 items-center">
        <div className="h-[26rem] w-[24rem] mt-5 z-10 bg-black/10 p-8 backdrop-blur-xl rounded-2xl flex flex-col gap-6 items-center">
          <p className="text-white text-xl font-semibold">
            {loginLocalization.loginToAccount}
          </p>
          <Input
            label={loginLocalization.username}
            name="username"
            type="text"
            className="p-3 w-72 text-xs rounded-md outline-none focus:border-2 focus:border-black"
            value=""
            placeholder={loginLocalization.enterUsername}
          />
          <Input
            label={loginLocalization.password}
            name="password"
            type="password"
            className="p-3 w-72 text-xs rounded-md outline-none focus:border-2 focus:border-black"
            value=""
            placeholder={loginLocalization.enterPassword}
          />
          <Link className="text-white text-xs ml-48 underline" href="signUp">
            {loginLocalization.fogetPassword}
          </Link>
          <Link href="">
            <Button
              className="bg-gray-100 text-gray-500 w-24 h-9 pb-1 rounded-lg active:scale-95"
              children={loginLocalization.login}
            />
          </Link>
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
        </div>
      </div>
    </div>
  );
}
