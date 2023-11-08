import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Pressable,
  ScrollView,
} from '@gluestack-ui/themed';
import {ButtonGroup} from '@gluestack-ui/themed';

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
      <FormControl size="md" isReadOnly={false}>
        <FormControlLabel mb="$1">
          <FormControlLabelText>Task Name:</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Task Name"
            value={taskName}
            onChangeText={setTaskName}
          />
        </Input>

        <FormControlLabel mb="$1">
          <FormControlLabelText>Description:</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            multiline
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
        </Input>

        <FormControlLabel mb="$1">
          <FormControlLabelText>Points:</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Points"
            value={points}
            onChangeText={setPoints}
          />
        </Input>

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
      </FormControl>
    </ScrollView>
  );
}

export default CreateTask;
