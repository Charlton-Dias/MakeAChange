import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TaskDataProps} from '../types'; // Import your TaskDataProps type

type TasksState = {
  data: TaskDataProps[];
};

const initialState: TasksState = {
  data: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TaskDataProps[]>) => {
      state.data = action.payload;
    },
    updateTask: (state, action: PayloadAction<TaskDataProps>) => {
      const index = state.data.findIndex(item => item.id === action.payload.id);
      state.data[index] = action.payload;
    },
  },
});

export const {setTasks, updateTask} = tasksSlice.actions;

export default tasksSlice.reducer;
