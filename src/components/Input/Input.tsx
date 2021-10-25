import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { handleLocationName } from "../../config/api/api";
import { customStyles } from "./StyledInput";

interface IOptions {
  value: number;
  label: string;
}

function Input({ handleInputChoice }: any) {
  const [options, setOptions] = useState<IOptions[]>([
    { value: 2459115, label: "New York" },
    { value: 1118370, label: "Tokyo" },
    { value: 455825, label: "Rio de Janeiro" },
    { value: 2471217, label: "Philadelphia" },
    { value: 44418, label: "London" },
  ]);

  async function handleInputChange(cityLetter: string) {
    if (cityLetter) {
      const CitiesList = await handleLocationName(cityLetter);
      try {
        for (let i = 0; i < options.length; i++) {
          if (options[i].label === CitiesList[0].title) {
            return;
          }
        }

        setOptions([
          ...options,
          {
            value: CitiesList[0].woeid,
            label: CitiesList[0].title,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const filterCities = (inputValue: string) => {
    try {
      return options.filter((i: IOptions) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    } catch (error) {
      return options;
    }
  };

  function loadOptions(inputValue: string, callback: any) {
    setTimeout(() => {
      callback(filterCities(inputValue));
    }, 1000);
  }

  return (
    <AsyncSelect
      styles={customStyles}
      defaultOptions={options}
      placeholder="Search Location"
      onChange={handleInputChoice}
      onInputChange={handleInputChange}
      loadOptions={loadOptions}
    />
  );
}

export default Input;
