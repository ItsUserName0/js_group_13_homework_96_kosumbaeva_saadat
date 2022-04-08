import { createAction, props } from '@ngrx/store';
import { Cocktail } from '../../models/cocktail.model';

export const fetchCocktailsRequest = createAction('[Cocktails] Fetch Request', props<{ id?: string }>());
export const fetchCocktailsSuccess = createAction('[Cocktails] Fetch Success', props<{ items: Cocktail[] }>());
export const fetchCocktailsFailure = createAction('[Cocktails] Fetch Failure');

export const fetchCocktailRequest = createAction('[Cocktails] Fetch Cocktail Request', props<{ id: string }>());
export const fetchCocktailSuccess = createAction('[Cocktails] Fetch Cocktail Success', props<{ item: null | Cocktail }>());
export const fetchCocktailFailure = createAction('[Cocktails] Fetch Cocktail Failure');
