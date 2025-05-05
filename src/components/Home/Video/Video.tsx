import { homelocalization } from '@/constants/localization/localization';
import React from 'react'

export default function Video() {
  return (
    <div className="flex justify-center items-center gap-20 px-56 py-14">
      <div className="leading-relaxed">
        <h2 className="font-semibold text-2xl mb-7">
          {homelocalization.aika1}
        </h2>
        <p className="mb-4">{homelocalization.aika2}</p>
        <p className="mb-4">{homelocalization.aika3}</p>
        <p className="mb-4">{homelocalization.aika4}</p>
      </div>
      <video
        src="/videos/hero.mp4"
        controls
        autoPlay
        muted
        loop
        className="w-[31rem] h-[36rem] rounded-xl shadow-lg"
      ></video>
    </div>
  );
}
