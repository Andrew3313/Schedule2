import React from "react";
import cn from "classnames";
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
  const [optionsValue, setOptionsValue] = React.useState<FacultyOption | null>(
    null
  );

  const { faculties, isLoading, error } = useFaculty();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const options = React.useMemo(() => {
    return (
      faculties
        ?.filter((fac) => fac.toLocaleUpperCase() !== faculty)
        .map((faculty) => ({
          value: faculty.toLocaleUpperCase(),
          label: faculty.toLocaleUpperCase(),
        })) || []
    );
  }, [faculties, faculty]);

  const handleFacultyChange = (selectedOption: FacultyOption) => {
    setFaculty(selectedOption.value);
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
      styles={customStylesSelect}
      isSearchable={false}
      placeholder={""}
      onChange={handleFacultyChange}
      value={isLoading || !!error ? null : optionsValue}
      onMenuOpen={() => {
        setIsMenuOpen(true);
      }}
      onMenuClose={() => {
        setIsMenuOpen(false);
      }}
      className={cn(className, "department")}
      isDisabled={isLoading || !!error}
      menuIsOpen={isMenuOpen}
    />
  );
};
