import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchCocktailsRequest } from '../../store/cocktails/cocktails.actions';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { Cocktail } from '../../models/cocktail.model';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.sass']
})
export class CocktailsComponent implements OnInit, OnDestroy {
  user: Observable<null | User>;
  userSub!: Subscription;
  userData: User | null = null;
  cocktails: Observable<Cocktail[]>;
  loading: Observable<boolean>;
  path = '';

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.cocktails = store.select(state => state.cocktails.items);
    this.loading = store.select(state => state.cocktails.fetchLoading);
  }

  ngOnInit(): void {
    this.userSub = this.user.subscribe(user => {
      this.userData = user;
    });
    this.path = <string>this.route.snapshot.routeConfig?.path;
    if (this.path === 'my_cocktails' && this.userData?._id) {
      this.store.dispatch(fetchCocktailsRequest({id: this.userData._id}));
    } else {
      this.store.dispatch(fetchCocktailsRequest({id: null}));
    }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
