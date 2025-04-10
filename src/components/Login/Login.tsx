import { loginLocalization } from '@/constants/localization/localization';
import Input from '@/shared/Inputs/Inputs';
import Button from '@/shared/Button/Button';

export default function Login() {
  return (
    <div className="relative w-full h-[45.5rem] p-6 font-sahel">
      <div className="background-login absolute inset-0 bg-white/30 backdrop-blur-xl -z-10"></div>

      <div className="relative h-[40rem] mt-5 z-10 bg-white/10 rounded-2xl flex justify-between px-24 mx-40 items-center">
        <div className="text-white flex flex-col gap-4 ">
          <p className="text-2xl mb-3 font-semibold">{loginLocalization.shine}✨</p>
          <div className="text-xl font-light">
            <p>{loginLocalization.text1}</p>
            <p>{loginLocalization.text2}</p>
          </div>
          <div className="text-xl font-light">
            <p>{loginLocalization.text3}</p>
            <p>{loginLocalization.text4}</p>
          </div>
        </div>
        <div className="h-[26rem] w-[24rem] mt-5 z-10 bg-black/10 p-8 backdrop-blur-xl rounded-2xl flex flex-col gap-6 items-center">
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
        </div>
      </div>
    </div>
  );
}
