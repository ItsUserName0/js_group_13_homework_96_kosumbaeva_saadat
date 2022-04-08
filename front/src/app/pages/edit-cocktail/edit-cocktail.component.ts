import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../store/types';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CreateError } from '../../models/cocktail.model';
import { createCocktailRequest } from '../../store/cocktails/cocktails.actions';

@Component({
  selector: 'app-edit-cocktail',
  templateUrl: './edit-cocktail.component.html',
  styleUrls: ['./edit-cocktail.component.sass']
})
export class EditCocktailComponent implements OnInit {
  cocktailForm!: FormGroup;
  loading: Observable<boolean>;
  error: Observable<null | CreateError>;
  errSub!: Subscription;
  errMsg = '';

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.cocktails.createLoading);
    this.error = store.select(state => state.cocktails.createError);
  }

  ngOnInit(): void {
    this.cocktailForm = new FormGroup({
      title: new FormControl('', Validators.required),
      ingredients: new FormArray([], Validators.required),
      recipe: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });

    this.errSub = this.error.subscribe(error => {
      if (error) {
        this.errMsg = error.errors.title.message;
      } else {
        this.errMsg = '';
      }
    });
  }

  createCocktail() {
    const cocktailData = this.cocktailForm.value;
    this.store.dispatch(createCocktailRequest({cocktailData}));
  }

  fieldHasError(fieldName: string, errorType: string, index?: number) {
    if (fieldName === 'ingTitle' || fieldName === 'ingAmount') {
      const ingredients = <FormArray>this.cocktailForm.get('ingredients');
      if (!index) {
        index = 0;
      }
      const step = <FormGroup>ingredients.controls[index];
      const field = step.get(fieldName);
      return field && field.touched && field.errors?.[errorType];
    }

    const field = this.cocktailForm.get(fieldName);
    return field && field.touched && field.errors?.[errorType];
  }

  createIngGroup() {
    return new FormGroup({
      ingTitle: new FormControl('', Validators.required),
      ingAmount: new FormControl('', Validators.required),
    });
  }

  addIng() {
    const ingredients = <FormArray>this.cocktailForm.get('ingredients');
    const ingredient = this.createIngGroup();
    ingredients.push(ingredient);
  }

  getIngControls() {
    const ingredients = <FormArray>this.cocktailForm.get('ingredients');
    return ingredients.controls;
  }

  onIngRemove(index: number) {
    const ingredients = <FormArray>this.cocktailForm.get('ingredients');
    ingredients.removeAt(index);
  }
}
