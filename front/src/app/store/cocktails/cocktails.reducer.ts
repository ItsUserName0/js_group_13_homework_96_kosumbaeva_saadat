import { CocktailsState } from '../types';
import { createReducer, on } from '@ngrx/store';
import { fetchCocktailsFailure, fetchCocktailsRequest, fetchCocktailsSuccess } from './cocktails.actions';

const initialState: CocktailsState = {
  items: [],
  fetchLoading: false,
};

export const cocktailsReducer = createReducer(
  initialState,
  on(fetchCocktailsRequest, state => ({...state, fetchLoading: true})),
  on(fetchCocktailsSuccess, (state, {items}) => ({...state, fetchLoading: false, items})),
  on(fetchCocktailsFailure, state => ({...state, fetchLoading: false})),
);
