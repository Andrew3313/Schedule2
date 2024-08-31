import cn from "classnames";
import { useStore } from "../store/store";
import React from "react";

interface Props {
  text: string;
}

export const CustomIndicator: React.FC<Props> = ({ text }) => {
  const isOpenDepartment = useStore((state) => state.isOpenDepartment);
  const setIsOpenDepartment = useStore((state) => state.setIsOpenDepartment);
  const isOpenGroup = useStore((state) => state.isOpenGroup);
  const setIsOpenGroup = useStore((state) => state.setIsOpenGroup);

  const isOpen = text === 'Факультет' ? isOpenDepartment : isOpenGroup;
  const setIsOpen = text === 'Факультет' ? setIsOpenDepartment : setIsOpenGroup;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={cn(
        "absolute right-[1rem] top-[1.5rem] bg-no-repeat w-[2rem] h-[2rem] indicator",
        {
          'bg-[url("/assets/images/down-arrow.svg")]': !isOpen,
          'bg-[url("/assets/images/up-arrow.svg")]': isOpen,
        }
      )}
      onClick={handleClick}
    />
  );
};
