import React from "react";
// import cn from "classnames";
import Select, { OnChangeValue } from "react-select";
// import { customStylesSelect } from "../constants/styles";
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
  const [optionsValue, setOptionsValue] = React.useState<FacultyOption | null>(
    null
  );

  const { faculties, isLoading, error } = useFaculty();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const options =
    faculties
      ?.filter((fac) => fac.toLocaleUpperCase() !== faculty)
      .map((faculty) => ({
        value: faculty.toLocaleUpperCase(),
        label: faculty.toLocaleUpperCase(),
      })) || [];

  const handleFacultyChange = (
    newValue: OnChangeValue<FacultyOption, false>
  ) => {
    setFaculty((newValue as FacultyOption).value);
    setIsMenuOpen(false);
  };

  React.useEffect(() => {
    if (faculty) {
      setOptionsValue({
        value: faculty,
        label: faculty,
      });
    } else {
      setOptionsValue(null);
    }
  }, [faculty]);

  return (
    <Select
      options={options}
      classNamePrefix="department-select"
      isSearchable={false}
      placeholder={""}
      onChange={handleFacultyChange}
      value={optionsValue}
      className={className}
      isDisabled={isLoading || !!error}
      onMenuOpen={() => {
        setIsMenuOpen(true);
      }}
      onMenuClose={() => {
        setIsMenuOpen(false);
      }}
      menuIsOpen={isMenuOpen}
    />
  );
};

// onMenuOpen={() => {
//   setIsMenuOpen(true);
// }}
// onMenuClose={() => {
//   setIsMenuOpen(false);
// }}
// isLoading={isLoading || !!error}

// menuIsOpen={isMenuOpen}
