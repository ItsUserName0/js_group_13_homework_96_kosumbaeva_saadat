import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchCocktailRequest } from '../../store/cocktails/cocktails.actions';
import { Observable, Subscription } from 'rxjs';
import { Cocktail } from '../../models/cocktail.model';

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.sass']
})
export class CocktailDetailsComponent implements OnInit, OnDestroy {
  cocktail: Observable<null | Cocktail>;
  cocktailSub!: Subscription;
  cocktailData: null | Cocktail = null;
  loading: Observable<boolean>;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,) {
    this.cocktail = store.select(state => state.cocktails.item);
    this.loading = store.select(state => state.cocktails.itemFetchLoading);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.store.dispatch(fetchCocktailRequest({id: params['id']}));
    });
    this.cocktailSub = this.cocktail.subscribe(cocktail => {
      this.cocktailData = cocktail;
    });
  }

  ngOnDestroy() {
    this.cocktailSub.unsubscribe();
  }
}
