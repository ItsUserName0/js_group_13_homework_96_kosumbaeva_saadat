import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { usersReducer } from './users/users.reducer';
import { UsersEffects } from './users/users.effects';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { cocktailsReducer } from './cocktails/cocktails.reducer';
import { CocktailsEffects } from './cocktails/cocktails.effects';

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
};

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

const reducers = {
  users: usersReducer,
  cocktails: cocktailsReducer,
};

const effects = [UsersEffects, CocktailsEffects];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
  ],
  exports: [StoreModule, EffectsModule],
})
export class AppStoreModule {}
