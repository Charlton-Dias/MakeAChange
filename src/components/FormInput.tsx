import React from 'react';
import {
  AlertCircleIcon,
  Box,
  CircleIcon,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
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
  Textarea,
  TextareaInput,
} from '@gluestack-ui/themed';

type FormInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: 'text' | 'password';
  error?: string;
  helper?: string;
};

const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  type,
  error,
  helper,
}: FormInputProps) => (
  <FormControl
    size="md"
    my={5}
    mb={10}
    isRequired
    isInvalid={error?.length > 0}>
    <FormControlLabel mb="$1">
      <FormControlLabelText>{label}:</FormControlLabelText>
    </FormControlLabel>
    <Input borderColor="black">
      <InputField
        type={type}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </Input>
    {helper && (
      <FormControlHelper>
        <FormControlHelperText>{helper}</FormControlHelperText>
      </FormControlHelper>
    )}
    {error && (
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>{error}</FormControlErrorText>
      </FormControlError>
    )}
  </FormControl>
);

const FormTextArea = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  helper,
}: FormInputProps) => (
  <FormControl size="md" my={5} mb={10}>
    <FormControlLabel mb="$1">
      <FormControlLabelText>{label}:</FormControlLabelText>
    </FormControlLabel>
    <Textarea>
      <TextareaInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </Textarea>
    {helper && (
      <FormControlHelper>
        <FormControlHelperText>{helper}</FormControlHelperText>
      </FormControlHelper>
    )}
    {error && (
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>{error}</FormControlErrorText>
      </FormControlError>
    )}
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
  <Box display={'flex'} flexDirection="row" my={5} mb={10}>
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

export {FormRadioGroup, FormTextArea};
