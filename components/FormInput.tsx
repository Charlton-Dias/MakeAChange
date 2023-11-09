// FormInput.tsx
import React from 'react';
import {
  Box,
  CircleIcon,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  Text,
} from '@gluestack-ui/themed';

type FormInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: 'text' | 'password';
  multiline?: false | true;
};

const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  type,
  multiline,
}: FormInputProps) => (
  <FormControl size="md" my={5}>
    <FormControlLabel mb="$1">
      <FormControlLabelText>{label}:</FormControlLabelText>
    </FormControlLabel>
    <Input>
      <InputField
        type={type}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
      />
    </Input>
  </FormControl>
);

type FormRadioGroupProps = {
  label: string;
  options: {value: string; label: string}[];
  value: string;
  onChange: (value: string) => void;
};

const FormRadioGroup = ({
  label,
  options,
  value,
  onChange,
}: FormRadioGroupProps) => (
  <Box display={'flex'} flexDirection="row" my={5}>
    <Text fontSize={16} bold>
      {label}
    </Text>
    <RadioGroup value={value} onChange={onChange}>
      {options.map(option => (
        <Radio key={option.value} value={option.value} size="md">
          <RadioIndicator mr="$2">
            <RadioIcon as={CircleIcon} />
          </RadioIndicator>
          <RadioLabel>{option.label}</RadioLabel>
        </Radio>
      ))}
    </RadioGroup>
  </Box>
);

export default FormInput;

export {FormRadioGroup};
