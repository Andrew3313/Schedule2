import React from "react";
import { useStore } from "../store/store";

export const Footer: React.FC = () => {
  const loading = useStore((state) => state.loading);
  return (
    <>
      {!loading && (
        <footer className="opacity-40 mb-[2rem] px-[1rem] h-[8rem]">
          <div className="flex justify-center items-center mb-[2rem]">
            <div className="w-[8.5rem] h-0 border-b-[.1rem] border-solid border-[#4B8B8B] mr-[1rem] last:mr-0" />
            <div className="text-[1.3rem] mr-[1rem] font-normal">
              ByGroup344© 2024
            </div>
            <div className="w-[8.5rem] h-0 border-b-[.1rem] border-solid border-[#4B8B8B] mr-[1rem] last:mr-0" />
          </div>
          <div className="flex justify-between">
            <a href="https://t.me/VinGP" className="text-[1.3rem]">
              <div className="inline-block mr-[1rem]">
                <img src="/assets/images/tg.svg" alt="tg icon" />
              </div>
              BackEnd
            </a>
            <a href="https://t.me/Andrew13145" className="text-[1.3rem]">
              <div className="inline-block mr-[1rem]">
                <img src="/assets/images/tg.svg" alt="tg icon" />
              </div>
              FrontEnd
            </a>
            <a href="https://t.me/y_sklv" className="text-[1.3rem]">
              <div className="inline-block mr-[1rem]">
                <img src="/assets/images/tg.svg" alt="tg icon" />
              </div>
              Design
            </a>
          </div>
        </footer>
      )}
    </>
  );
};
