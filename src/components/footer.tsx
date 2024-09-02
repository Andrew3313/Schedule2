import React from "react";
import { useStore } from "../store/store";

export const Footer: React.FC = () => {
  const loading = useStore((state) => state.loading);
  const setDarkTheme = useStore((state) => state.setDarkTheme);
  return (
    <>
      {!loading && (
        <footer className="mb-[2rem] opacity-40 px-[1rem] h-[8rem] pt-[1rem]">
          {/* <div className="flex justify-start font-light items-center text-[1.3rem] mb-[1rem]">
            <h3 className="text-[1.3rem] font-light mr-[1.5rem] text-textPrimary">
              Светлая тема
            </h3>
            <label className="inline-block relative w-[3rem] h-[1.6rem]">
              <input type="checkbox" className="h-0 w-0 opacity-0 switch-input" onChange={() => setDarkTheme()} />
              <span className="absolute top-0 left-0 bottom-0 right-0 bg-[#2B3B48] switch-slider rounded-[4rem] cursor-pointer " />
            </label>
          </div> */}
          {/* <div className="opacity-40"> */}
          <div className="flex justify-center items-center mb-[2rem]">
            <div className="w-[8.5rem] h-0 border-b-[.1rem] border-solid border-[#4B8B8B] mr-[1rem] last:mr-0" />
            <div className="text-[1.3rem] mr-[1rem] font-normal">
              ByGroup344© 2024
            </div>
            <div className="w-[8.5rem] h-0 border-b-[.1rem] border-solid border-[#4B8B8B] mr-[1rem] last:mr-0" />
          </div>
          <div className="flex justify-between">
            <a href="https://t.me/VinGP" className="text-[1.3rem] font-normal">
              <div className="inline-block mr-[1rem]">
                <img src="/assets/images/tg.svg" alt="tg icon" />
              </div>
              BackEnd
            </a>
            <a href="https://t.me/Andrew13145" className="text-[1.3rem] font-normal">
              <div className="inline-block mr-[1rem]">
                <img src="/assets/images/tg.svg" alt="tg icon" />
              </div>
              FrontEnd
            </a>
            <a href="https://t.me/y_sklv" className="text-[1.3rem] font-normal">
              <div className="inline-block mr-[1rem]">
                <img src="/assets/images/tg.svg" alt="tg icon" />
              </div>
              Design
            </a>
          </div>
          <div className="flex justify-center items-center mt-[.5rem]">
            <h3 className="text-[1.3rem] font-normal">
              Designer в активном поиске !!!
            </h3>
          </div>
          {/* </div> */}
        </footer>
      )}
    </>
  );
};
