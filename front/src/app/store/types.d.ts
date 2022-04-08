import { LoginError, RegisterError, User } from '../models/user.model';
import { Cocktail, CreateError } from '../models/cocktail.model';

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
  fbLoginLoading: boolean,
};

export type CocktailsState = {
  item: null | Cocktail,
  itemFetchLoading: boolean,
  items: Cocktail[],
  fetchLoading: boolean,
  createLoading: boolean,
  createError: null | CreateError,
  removeLoading: boolean,
  publishLoading: boolean,
}

export type AppState = {
  users: UsersState,
  cocktails: CocktailsState
};
