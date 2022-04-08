import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CocktailsService } from '../../services/cocktails.service';
import { HelpersService } from '../../services/helpers.service';
import {
  fetchCocktailFailure,
  fetchCocktailRequest,
  fetchCocktailsFailure,
  fetchCocktailsRequest,
  fetchCocktailsSuccess, fetchCocktailSuccess
} from './cocktails.actions';
import { map, mergeMap } from 'rxjs';

@Injectable()
export class CocktailsEffects {

  constructor(private actions: Actions,
              private cocktailsService: CocktailsService,
              private helpers: HelpersService,
              ) {}

  fetchCocktails = createEffect(() => this.actions.pipe(
    ofType(fetchCocktailsRequest),
    mergeMap(({id}) => this.cocktailsService.fetchCocktails(id).pipe(
      map(items => fetchCocktailsSuccess({items})),
      this.helpers.catchServerError(fetchCocktailsFailure),
    )),
  ));

  fetchCocktail = createEffect(() => this.actions.pipe(
    ofType(fetchCocktailRequest),
    mergeMap(({id}) => this.cocktailsService.fetchCocktail(id).pipe(
      map(item => fetchCocktailSuccess({item})),
      this.helpers.catchServerError(fetchCocktailFailure),
    )),
  ));
}
