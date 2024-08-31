import React from "react";
import Select from "react-select";
import { CustomIndicator } from "./custom-indicator";
import { customStylesSelectDepartment } from "../constants/styles";
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
  const [isOpen, setIsOpen] = React.useState(false);
  const [optionsValue, setOptionsValue] = React.useState<FacultyOption>({
    value: faculty,
    label: faculty,
  });

  const { faculties, isLoading, error } = useFaculty();

  const options = faculties?.map((faculty) => ({
    value: faculty.toLocaleUpperCase(),
    label: faculty.toLocaleUpperCase(),
  }));

  const handleFacultyChange = (selectedOption: FacultyOption) => {
    setFaculty(selectedOption.value);
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
      styles={customStylesSelectDepartment}
      components={{
        DropdownIndicator: () => <CustomIndicator isOpen={isOpen} />,
      }}
      isSearchable={false}
      placeholder={""}
      onChange={handleFacultyChange}
      value={isLoading || !!error ? null : optionsValue}
      onMenuOpen={() => setIsOpen(true)}
      onMenuClose={() => setIsOpen(false)}
      className={className}
      isDisabled={isLoading || !!error}
    />
  );
};
