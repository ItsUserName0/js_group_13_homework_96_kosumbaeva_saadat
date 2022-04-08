import { CocktailsState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  createCocktailFailure,
  createCocktailRequest, createCocktailSuccess,
  fetchCocktailFailure,
  fetchCocktailRequest,
  fetchCocktailsFailure,
  fetchCocktailsRequest,
  fetchCocktailsSuccess,
  fetchCocktailSuccess,
  publishCocktailFailure,
  publishCocktailRequest,
  publishCocktailSuccess, removeCocktailFailure,
  removeCocktailRequest, removeCocktailSuccess
} from './cocktails.actions';

const initialState: CocktailsState = {
  items: [],
  fetchLoading: false,
  item: null,
  itemFetchLoading: false,
  createLoading: false,
  createError: null,
  removeLoading: false,
  publishLoading: false,
};

export const cocktailsReducer = createReducer(
  initialState,
  on(fetchCocktailsRequest, state => ({...state, fetchLoading: true})),
  on(fetchCocktailsSuccess, (state, {items}) => ({...state, fetchLoading: false, items})),
  on(fetchCocktailsFailure, state => ({...state, fetchLoading: false})),
  on(fetchCocktailRequest, state => ({...state, itemFetchLoading: true})),
  on(fetchCocktailSuccess, (state, {item}) => ({...state, itemFetchLoading: false, item})),
  on(fetchCocktailFailure, state => ({...state, itemFetchLoading: false})),
  on(createCocktailRequest, state => ({...state, createLoading: true, createError: null})),
  on(createCocktailSuccess, state => ({...state, createLoading: false})),
  on(createCocktailFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),
  on(publishCocktailRequest, state => ({...state, publishLoading: true})),
  on(publishCocktailSuccess, state => ({...state, publishLoading: false})),
  on(publishCocktailFailure, state => ({...state, publishLoading: false})),
  on(removeCocktailRequest, state => ({...state, removeLoading: true})),
  on(removeCocktailSuccess, state => ({...state, removeLoading: false})),
  on(removeCocktailFailure, state => ({...state, removeLoading: false})),
);
