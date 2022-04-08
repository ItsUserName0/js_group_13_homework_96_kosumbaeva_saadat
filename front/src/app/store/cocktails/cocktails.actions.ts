import { createAction, props } from '@ngrx/store';
import { Cocktail } from '../../models/cocktail.model';

export const fetchCocktailsRequest = createAction('[Cocktails] Fetch Request', props<{ id?: string }>());
export const fetchCocktailsSuccess = createAction('[Cocktails] Fetch Success', props<{ items: Cocktail[] }>());
export const fetchCocktailsFailure = createAction('[Cocktails] Fetch Failure');
