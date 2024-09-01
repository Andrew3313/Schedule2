import React from "react";
import Select from "react-select";
import { customStylesSelect } from "../constants/styles";
import { useStore } from "../store/store";
import { useFaculty } from "../hooks/useFaculty";

interface Props {
  className: string;
}

interface FacultyOption {
  value: string;
  label: string;
  isDisabled?: boolean;
}

export const DropDownDepartment: React.FC<Props> = ({ className }) => {
  const faculty = useStore((state) => state.faculty);
  const setFaculty = useStore((state) => state.setFaculty);
  const setIsOpenDepartment = useStore((state) => state.setIsOpenDepartment);
  const [optionsValue, setOptionsValue] = React.useState<FacultyOption>({
    value: faculty,
    label: faculty,
  });

  const { faculties, isLoading, error } = useFaculty();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const options = faculties?.map((faculty) => ({
    value: faculty.toLocaleUpperCase(),
    label: faculty.toLocaleUpperCase(),
  }));

  const handleFacultyChange = (selectedOption: FacultyOption) => {
    setFaculty(selectedOption.value);
    setIsMenuOpen(false);
    setIsOpenDepartment(false);
  };

  React.useEffect(() => {
    if (faculty) {
      setOptionsValue({
        value: faculty,
        label: faculty,
      });
    }
  }, [faculty]);

  return (
    <Select
      options={options}
      styles={customStylesSelect}
      isSearchable={false}
      placeholder={""}
      onChange={handleFacultyChange}
      value={isLoading || !!error ? null : optionsValue}
      onMenuOpen={() => {
        setIsMenuOpen(true);
        setIsOpenDepartment(true);
      }}
      onMenuClose={() => {
        setIsMenuOpen(false);
        setIsOpenDepartment(false);
      }}
      className={className}
      isDisabled={isLoading || !!error}
      menuIsOpen={isMenuOpen}
    />
  );
};
