import React, { useEffect } from "react";
import cn from "classnames";
import Select from "react-select";
import { useStore } from "../store/store";

interface IProps {
  className: string;
  isLoading: boolean;
  error: null | Error;
  groups: string[] | undefined;
}

interface IGroupOption {
  value: string;
  label: string;
}

interface IStoredGroup {
  state: {
    faculty: string;
    selectedCourse: number;
    group: string;
  };
  version: number;
}

export const DropDownGroup: React.FC<IProps> = ({
  groups,
  isLoading,
  error,
  className,
}) => {
  const [optionsValue, setOptionsValue] = React.useState<IGroupOption | null>(
    null
  );
  const group = useStore((state) => state.group);
  const setGroup = useStore((state) => state.setGroup);
  const groupAuth = useStore((state) => state.groupAuth);
  const faculty = useStore((state) => state.faculty);
  const selectedCourse = useStore((state) => state.selectedCourse);
  const isFirstRender = React.useRef<boolean>(true);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const options =
    groups
      ?.filter((groupItem) => groupItem.toUpperCase() !== group)
      .map((groupItem) => ({
        value: groupItem.toUpperCase(),
        label: groupItem.toUpperCase(),
      })) || [];

  const handleGroupChange = (value: IGroupOption | null) => {
    if (value) {
      setGroup(value.value);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (!groupAuth) {
      const storedGroup = localStorage.getItem("schedule-storage");
      if (storedGroup) {
        const parsedStoredGroup = JSON.parse(storedGroup) as IStoredGroup;
        const storedGroupValue = parsedStoredGroup.state.group;
        if (storedGroupValue) {
          setGroup(storedGroupValue.toUpperCase());
          setOptionsValue({
            value: storedGroupValue.toUpperCase(),
            label: storedGroupValue.toUpperCase(),
          });
        }
      }
    }
  }, [groupAuth, setGroup]);

  useEffect(() => {
    if (group) {
      setOptionsValue({
        value: group.toUpperCase(),
        label: group.toUpperCase(),
      });
    } else {
      setOptionsValue(null);
    }
  }, [group]);

  useEffect(() => {
    if (!isFirstRender.current) {
      if (!group) {
        setOptionsValue(null);
      }
      setGroup("");
    } else {
      isFirstRender.current = false;
    }
  }, [faculty, selectedCourse]);

  const isDisabled = isLoading || !!error || !faculty || !groups;

  return (
    <Select
      options={options}
      classNamePrefix={"group-select"}
      isSearchable={false}
      placeholder={"ГРУППА"}
      onChange={handleGroupChange}
      value={optionsValue}
      onMenuOpen={() => setIsMenuOpen(true)}
      onMenuClose={() => setIsMenuOpen(false)}
      className={cn(className, "group", {
        "!cursor-not-allowed": isDisabled,
      })}
      isDisabled={isDisabled}
      menuIsOpen={isMenuOpen}
      noOptionsMessage={() => (
        <span style={{ color: "white", fontSize: "1.5rem" }}>
          Больше нет групп
        </span>
      )}
    />
  );
};
