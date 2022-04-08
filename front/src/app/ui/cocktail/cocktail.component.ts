import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Cocktail } from '../../models/cocktail.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { publishCocktailRequest, removeCocktailRequest } from '../../store/cocktails/cocktails.actions';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.sass']
})
export class CocktailComponent implements OnInit, OnDestroy {
  @Input() cocktail!: Cocktail;

  removeLoading: Observable<boolean>;
  publishLoading: Observable<boolean>;
  publishSub!: Subscription;

  toBePublishCocktail = '';
  toBeDeletedCocktail = '';

  constructor(private store:Store<AppState>) {
    this.removeLoading = store.select(state => state.cocktails.removeLoading);
    this.publishLoading = store.select(state => state.cocktails.publishLoading);
  }

  ngOnInit(): void {
    this.publishSub = this.publishLoading.subscribe(isPublish => {
      if (!isPublish) {
        this.toBePublishCocktail = '';
      }
    })
  }

  removeCocktail() {
    this.toBeDeletedCocktail = this.cocktail._id;
    this.store.dispatch(removeCocktailRequest({id: this.cocktail._id}));
  }

  publishCocktail() {
    this.toBePublishCocktail = this.cocktail._id;
    this.store.dispatch(publishCocktailRequest({id: this.cocktail._id}));
  }

  ngOnDestroy(): void {
    this.publishSub.unsubscribe();
  }
}
