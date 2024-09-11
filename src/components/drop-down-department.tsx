import React from "react";
import Select, { OnChangeValue } from "react-select";
import { useStore } from "../store/store";

interface IProps {
  faculties: string[];
  isLoading: boolean;
  error: null | Error;
  className: string;
}

interface IFacultyOption {
  value: string;
  label: string;
  isDisabled?: boolean;
}

export const DropDownDepartment: React.FC<IProps> = ({ faculties, isLoading, error, className }) => {
  const faculty = useStore((state) => state.faculty);
  const setFaculty = useStore((state) => state.setFaculty);
  const [optionsValue, setOptionsValue] = React.useState<IFacultyOption | null>(
    null
  );
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const options =
    faculties?.map((fac) => ({
      value: fac.toUpperCase(),
      label: fac.toUpperCase(),
    })) || [];

  const handleFacultyChange = (
    newValue: OnChangeValue<IFacultyOption, false>
  ) => {
    if (newValue) {
      setFaculty((newValue as IFacultyOption).value.toLowerCase());
      setIsMenuOpen(false);
    }
  };

  React.useEffect(() => {
    setOptionsValue(
      faculty
        ? { value: faculty.toUpperCase(), label: faculty.toUpperCase() }
        : null
    );
  }, [faculty]);

  return (
    <Select
      options={options.filter((fac) => fac.value !== optionsValue?.value)}
      classNamePrefix="department-select"
      isSearchable={false}
      placeholder="ФАКУЛЬТЕТ"
      onChange={handleFacultyChange}
      value={optionsValue}
      className={className}
      isDisabled={isLoading || !!error}
      onMenuOpen={() => setIsMenuOpen(true)}
      onMenuClose={() => setIsMenuOpen(false)}
      menuIsOpen={isMenuOpen}
    />
  );
};
