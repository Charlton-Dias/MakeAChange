import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TaskDataProps} from '../types'; // Import your TaskDataProps type

type TasksState = {
  completed: TaskDataProps[];
  created: TaskDataProps[];
  selected: TaskDataProps[];
};

const initialState: TasksState = {
  completed: [],
  created: [],
  selected: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setCompletedTasks: (state, action: PayloadAction<TaskDataProps[]>) => {
      state.completed = action.payload;
    },
    setCreatedTasks: (state, action: PayloadAction<TaskDataProps[]>) => {
      state.created = action.payload;
    },
    setSelectedTasks: (state, action: PayloadAction<TaskDataProps[]>) => {
      state.selected = action.payload;
    },
    // updateProfileTask: (state, action: PayloadAction<TaskDataProps>) => {
    //   const index = state.findIndex(item => item.id === action.payload.id);
    //   state.created[index] = action.payload;
    // },
  },
});

export const {
  setCompletedTasks,
  setCreatedTasks,
  setSelectedTasks,
  // updateProfileTask,
} = profileSlice.actions;

export default profileSlice.reducer;
