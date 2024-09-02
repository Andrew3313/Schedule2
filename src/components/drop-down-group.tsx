import React from "react";
import Select from "react-select";
import cn from "classnames";
import { customStylesSelect } from "../constants/styles";
import { useStore } from "../store/store";
import { useGroupsByFacultyAndCourse } from "../hooks/useGroupsByFacultyAndCourse";

interface Props {
  className: string;
}

interface GroupOption {
  value: string;
  label: string;
  isDisabled?: boolean;
}

interface StoredGroup {
  state: {
    faculty: string;
    selectedCourse: number;
    group: string;
  };
  version: number;
}

export const DropDownGroup: React.FC<Props> = ({ className }) => {
  const [optionsValue, setOptionsValue] = React.useState<GroupOption | null>(
    null
  );
  const group = useStore((state) => state.group);
  const setGroup = useStore((state) => state.setGroup);
  const faculty = useStore((state) => state.faculty);
  const selectedCourse = useStore((state) => state.selectedCourse);
  const { groups, isLoading, error } = useGroupsByFacultyAndCourse(
    faculty,
    selectedCourse
  );

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const options = React.useMemo(() => {
    return (
      groups
        ?.filter((groupItem) => groupItem !== group)
        .map((groupItem) => ({
          value: groupItem.toLocaleUpperCase(),
          label: groupItem.toLocaleUpperCase(),
        })) || [] 
    );
  }, [groups, group]);

  const handleGroupChange = React.useCallback(
    (value: GroupOption | null) => {
      if (value) {
        setGroup(value.value);
        setIsMenuOpen(false);
      }
    },
    [setGroup]
  );

  React.useEffect(() => {
    if (groups && groups.length > 0) {
      const storedGroup = localStorage.getItem("schedule-storage");
      if (storedGroup) {
        const parsedStoredGroup = JSON.parse(storedGroup) as StoredGroup;
        const storedGroupValue = parsedStoredGroup.state.group;

        if (groups.includes(storedGroupValue)) {
          setGroup(storedGroupValue);
        } else {
          setGroup(groups[0]);
        }
      } else {
        setGroup(groups[0]);
      }
    }
  }, [groups, setGroup]);

  React.useEffect(() => {
    if (group) {
      setOptionsValue({
        value: group,
        label: group,
      });
    } else {
      setOptionsValue(null);
    }
  }, [group]);

  return (
    <Select
      options={options}
      styles={customStylesSelect}
      isSearchable={false}
      placeholder={""}
      onChange={handleGroupChange}
      value={optionsValue}
      onMenuOpen={() => {
        setIsMenuOpen(true);
      }}
      onMenuClose={() => {
        setIsMenuOpen(false);
      }}
      className={cn(className, "group")}
      isDisabled={!faculty || isLoading || !groups || !!error} 
      menuIsOpen={isMenuOpen}
    />
  );
};
