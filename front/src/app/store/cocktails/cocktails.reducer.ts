import { CocktailsState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  fetchCocktailFailure,
  fetchCocktailRequest,
  fetchCocktailsFailure,
  fetchCocktailsRequest,
  fetchCocktailsSuccess, fetchCocktailSuccess
} from './cocktails.actions';

const initialState: CocktailsState = {
  items: [],
  fetchLoading: false,
  item: null,
  itemFetchLoading: false,
};

export const cocktailsReducer = createReducer(
  initialState,
  on(fetchCocktailsRequest, state => ({...state, fetchLoading: true})),
  on(fetchCocktailsSuccess, (state, {items}) => ({...state, fetchLoading: false, items})),
  on(fetchCocktailsFailure, state => ({...state, fetchLoading: false})),
  on(fetchCocktailRequest, state => ({...state, itemFetchLoading: true})),
  on(fetchCocktailSuccess, (state, {item}) => ({...state, itemFetchLoading: false, item})),
  on(fetchCocktailFailure, state => ({...state, itemFetchLoading: false})),
);
