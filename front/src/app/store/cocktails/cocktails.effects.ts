import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CocktailsService } from '../../services/cocktails.service';
import { HelpersService } from '../../services/helpers.service';
import {
  createCocktailFailure,
  createCocktailRequest, createCocktailSuccess,
  fetchCocktailFailure,
  fetchCocktailRequest,
  fetchCocktailsFailure,
  fetchCocktailsRequest,
  fetchCocktailsSuccess,
  fetchCocktailSuccess, publishCocktailFailure,
  publishCocktailRequest, publishCocktailSuccess,
  removeCocktailFailure,
  removeCocktailRequest,
  removeCocktailSuccess
} from './cocktails.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { Router } from '@angular/router';

@Injectable()
export class CocktailsEffects {

  constructor(private actions: Actions,
              private cocktailsService: CocktailsService,
              private helpers: HelpersService,
              private store: Store<AppState>,
              private router: Router,
  ) {
  }

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

  createCocktail = createEffect(() => this.actions.pipe(
    ofType(createCocktailRequest),
    mergeMap(({cocktailData}) => this.cocktailsService.createCocktail(cocktailData).pipe(
      map(() => createCocktailSuccess()),
      tap(() => {
        this.helpers.openSnackBar('Your cocktail is under review by the moderator');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(createCocktailFailure),
    )),
  ));

  removeCocktail = createEffect(() => this.actions.pipe(
    ofType(removeCocktailRequest),
    mergeMap(({id}) => this.cocktailsService.removeCocktail(id).pipe(
      map(() => removeCocktailSuccess()),
      tap(() => this.store.dispatch(fetchCocktailsRequest({id: null}))),
      catchError(() => {
        this.helpers.openSnackBar('Could not delete cocktail');
        return of(removeCocktailFailure());
      }),
    )),
  ));

  publishCocktail = createEffect(() => this.actions.pipe(
    ofType(publishCocktailRequest),
    mergeMap(({id}) => this.cocktailsService.publishCocktail(id).pipe(
      map(() => publishCocktailSuccess()),
      tap(() => this.store.dispatch(fetchCocktailsRequest({id: null}))),
      catchError(() => {
        this.helpers.openSnackBar('Could not publish cocktail');
        return of(publishCocktailFailure());
      })
    ))
  ));
}
