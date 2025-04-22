'use client';
import {
  contactuslocalization,
} from '@/constants/localization/localization';
import Button from '@/shared/Button/Button';
import Input from '@/shared/Inputs/Inputs';
import React from 'react';
import { FaPinterest, FaTelegramPlane } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { RiInstagramFill } from 'react-icons/ri';
import { IoLogoWhatsapp } from 'react-icons/io';
import { MdContactPhone } from 'react-icons/md';
import { BsEnvelopePaperFill } from 'react-icons/bs';
import { FaMapLocationDot } from 'react-icons/fa6';
import Map from './Map/Map';

export default function Contact() {
  return (
    <div className="font-sahel flex flex-col gap-10">
      <ToastContainer />
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="text-2xl font-bold">{contactuslocalization.contact}</h1>
        <div className="flex flex-col justify-center items-center">
          <p>{contactuslocalization.detailcontact}</p>
          <p>{contactuslocalization.contactdetai2}</p>
        </div>
      </div>
      <div className="flex flex-row-reverse justify-center items-center gap-10 text-2xl text-custom-500">
        <FaTelegramPlane />
        <IoLogoWhatsapp />
        <RiInstagramFill />
        <FaPinterest />
      </div>
      <div className="flex items-center justify-center flex-row-reverse gap-12">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="flex gap-12">
            <Input
              name={'email'}
              type={'email'}
              placeholder={contactuslocalization.email}
              className="bg-custom-50 p-3 rounded-2xl border text-xs outline-none focus:border-custom-400"
            />
            <Input
              name={'phone'}
              type={'phone'}
              placeholder={contactuslocalization.phonenumber}
              className="bg-custom-50 p-3 rounded-2xl text-xs border outline-none focus:border-custom-400"
            />
          </div>
          <Input
            name={'name'}
            type={'text'}
            placeholder={contactuslocalization.name}
            className="bg-custom-50 p-3 text-xs rounded-2xl w-[24rem] border outline-none focus:border-custom-400"
          />
          <Input
            name="message"
            type={'text'}
            placeholder={contactuslocalization.message}
            className="bg-custom-50 p-3 w-[24rem] h-[8rem] pb-24 text-xs border rounded-2xl outline-none focus:border-custom-400"
          />
          <Button
            className="bg-custom-200 py-2 px-6 rounded-2xl active:scale-95"
            children={contactuslocalization.submit}
            onClick={() => toast.success(contactuslocalization.toatssuccess)}
          />
        </div>
        <div className="suppot-bg h-[18rem] w-[25rem] rounded-xl">
          <div className="bg-custom-100 h-[18rem] rounded-xl bg-opacity-70 flex flex-col justify-center items-start gap-8 p-5">
            <h1 className="font-semibold text-2xl">
              {contactuslocalization.supporttittel}
            </h1>
            <div className="text-xl">
              <p>{contactuslocalization.supportp1}</p>
              <p>{contactuslocalization.supportp2}</p>
              <p>{contactuslocalization.supportp3}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-row-reverse items-center gap-14">
        <div className="bg-custom-400 p-8 rounded-2xl">
          <div className="flex flex-row-reverse gap-4 pb-4 font-semibold items-center">
            <MdContactPhone className="text-4xl" />
            <h1 className="text-lg mt-1">6789 345 912 (+98)</h1>
          </div>
          <p className="text-sm">{contactuslocalization.telp1}</p>
          <p className="text-sm">{contactuslocalization.telp2}</p>
        </div>
        <div className="bg-custom-200 p-8 rounded-2xl">
          <div className="flex flex-row-reverse gap-4 pb-4 font-semibold items-center">
            <BsEnvelopePaperFill className="text-3xl" />
            <h1 className="text-lg mt-2">aikagallery@gmail.com</h1>
          </div>
          <p className="text-sm">{contactuslocalization.emailp1}</p>
          <p className="text-sm">{contactuslocalization.emailp2}</p>
        </div>
       <div className="bg-custom-100 p-8 rounded-2xl">
          <div className="flex flex-row-reverse gap-4 pb-4 font-semibold items-center">
            <FaMapLocationDot className="text-3xl" />
            <h1 className="text-lg mt-2">{contactuslocalization.iran}</h1>
          </div>
          <p className="text-sm">{contactuslocalization.locationp1}</p>
          <p className="text-sm">{contactuslocalization.locationp2}</p>
        </div>
      </div>
      <div>
        <Map/>
      </div>
    </div>
  );
}
