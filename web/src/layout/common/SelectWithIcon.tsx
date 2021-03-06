import { isNull, isUndefined } from 'lodash';
import React from 'react';
import Select, { components, ValueType } from 'react-select';

import { OptionWithIcon } from '../../types';
import styles from './SelectWithIcon.module.css';

interface Props {
  label: string;
  options: OptionWithIcon[];
  selected?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
}

const { Option } = components;
const CustomSelectOption = (props: any) => (
  <Option {...props}>
    <CustomSelectValue {...props} />
  </Option>
);

const CustomSelectValue = (props: any) => (
  <div className={`d-flex flex-row align-items-center ${styles.option}`}>
    <span className="mr-2">{props.data.icon}</span>
    <div>{props.data.label}</div>
  </div>
);

const SelectWithIcon = (props: Props) => {
  const handleOnChange = (selectedOption: ValueType<OptionWithIcon>) => {
    if (!isNull(selectedOption) && !isUndefined(selectedOption)) {
      const value = (selectedOption as OptionWithIcon).value;
      props.onChange(value);
    }
  };

  const getSelectedValue = (): OptionWithIcon | undefined => {
    if (!isUndefined(props.selected)) {
      const selected = props.options.find((opt: OptionWithIcon) => props.selected === opt.value);
      return selected;
    }
    return props.options[0];
  };

  const selectedOption = getSelectedValue();

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: '1px solid #ced4da',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #bed6e3',
      },
      '&:active': {
        border: '1px solid #bed6e3',
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#b2cede' : 'white',
      color: state.isSelected ? '#38383f' : '#38383f',
    }),
  };

  if (isUndefined(selectedOption)) return null;

  return (
    <div className="mb-4">
      <label className={`font-weight-bold ${styles.label}`} htmlFor="description">
        {props.label}
      </label>
      <Select
        styles={customStyles}
        options={props.options}
        components={{ Option: CustomSelectOption, SingleValue: CustomSelectValue }}
        value={selectedOption}
        onChange={handleOnChange}
        isDisabled={props.disabled}
        required={props.required}
      />
    </div>
  );
};

export default SelectWithIcon;
