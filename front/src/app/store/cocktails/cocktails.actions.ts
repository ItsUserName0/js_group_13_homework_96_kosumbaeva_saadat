import { createAction, props } from '@ngrx/store';
import { Cocktail, CocktailData, CreateError } from '../../models/cocktail.model';

export const fetchCocktailsRequest = createAction('[Cocktails] Fetch Request', props<{ id: null | string }>());
export const fetchCocktailsSuccess = createAction('[Cocktails] Fetch Success', props<{ items: Cocktail[] }>());
export const fetchCocktailsFailure = createAction('[Cocktails] Fetch Failure');

export const fetchCocktailRequest = createAction('[Cocktails] Fetch Cocktail Request', props<{ id: string }>());
export const fetchCocktailSuccess = createAction('[Cocktails] Fetch Cocktail Success', props<{ item: null | Cocktail }>());
export const fetchCocktailFailure = createAction('[Cocktails] Fetch Cocktail Failure');

export const createCocktailRequest = createAction('[Cocktails] Create Request', props<{ cocktailData: CocktailData }>());
export const createCocktailSuccess = createAction('[Cocktails] Create Success');
export const createCocktailFailure = createAction('[Cocktails] Create Failure', props<{ error: null | CreateError }>());

export const publishCocktailRequest = createAction('[Cocktails] Publish Request', props<{ id: string }>());
export const publishCocktailSuccess = createAction('[Cocktails] Publish Success');
export const publishCocktailFailure = createAction('[Cocktails] Publish Failure');

export const removeCocktailRequest = createAction('[Cocktails] Remove Request', props<{ id: string }>());
export const removeCocktailSuccess = createAction('[Cocktails] Remove Success');
export const removeCocktailFailure = createAction('[Cocktails] Remove Failure');
