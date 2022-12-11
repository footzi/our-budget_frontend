import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { initialState } from './constants';
import { AppDispatch, RootState } from './interfaces';

const slice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user = null;
    },
    setBalance(state, action) {
      state.balance = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setSavingGoals(state, action) {
      state.savingGoals = action.payload;
    },
    setSavings(state, action) {
      state.savings = action.payload;
    },
    setExpensesFact(state, action) {
      state.expenses.fact = action.payload;
    },
    setExpensesPlan(state, action) {
      state.expenses.plan = action.payload;
    },
    setIncomesFact(state, action) {
      state.incomes.fact = action.payload;
    },
    setIncomesPlan(state, action) {
      state.incomes.plan = action.payload;
    },
    setOnBoardingStep(state, action) {
      state.onBoardingStep = action.payload;
    },
  },
});

export const {
  removeUser,
  setUser,
  setBalance,
  setCategories,
  setSavingGoals,
  setSavings,
  setExpensesFact,
  setExpensesPlan,
  setIncomesFact,
  setIncomesPlan,
  setOnBoardingStep,
} = slice.actions;

export const store = configureStore({
  reducer: slice.reducer,
});

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector = () => useSelector((state: RootState): RootState => state);
