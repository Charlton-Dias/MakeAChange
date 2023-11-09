import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Button,
  ButtonText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Pressable,
  ScrollView,
} from '@gluestack-ui/themed';
import {ButtonGroup} from '@gluestack-ui/themed';
import FormInput from '../components/FormInput';

function CreateTask({onClose}: any) {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    const formData = {taskName, description, points, date};
    console.log(formData);
  };

  return (
    <ScrollView>
      <FormInput
        label="Task Name"
        placeholder="Task Name"
        value={taskName}
        onChangeText={setTaskName}
      />

      <FormInput
        label="Description"
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <FormInput
        label="Points"
        placeholder="Points"
        value={points}
        onChangeText={setPoints}
      />

      <FormControlLabel mb="$1">
        <FormControlLabelText>Deadline:</FormControlLabelText>
      </FormControlLabel>
      <Pressable onPress={() => setShowDatePicker(true)}>
        <Input isDisabled>
          <InputField>{date.toDateString()}</InputField>
        </Input>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setDate(currentDate);
            setShowDatePicker(false);
          }}
        />
      )}

      <ButtonGroup w={'100%'}>
        <Button w="48%" variant="outline" onPress={onClose}>
          <ButtonText>Discard</ButtonText>
        </Button>
        <Button w="48%" onPress={handleSubmit}>
          <ButtonText>Create</ButtonText>
        </Button>
      </ButtonGroup>
    </ScrollView>
  );
}

export default CreateTask;
