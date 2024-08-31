import cn from "classnames";

interface Props {
  isOpen: boolean;
}

export const CustomIndicator: React.FC<Props> = ({ isOpen }) => {
  return (
    <div
      className={cn(
        "absolute right-[1rem] top-[1.5rem] bg-no-repeat w-[2rem] h-[2rem] indicator",
        {
          'bg-[url("/assets/images/down-arrow.svg")]': !isOpen,
          'bg-[url("/assets/images/up-arrow.svg")]': isOpen,
        }
      )}
    />
  );
};
