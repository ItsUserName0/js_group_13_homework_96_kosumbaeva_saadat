import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CocktailsComponent } from './pages/cocktails/cocktails.component';
import { CocktailDetailsComponent } from './pages/cocktail-details/cocktail-details.component';
import { EditCocktailComponent } from './pages/edit-cocktail/edit-cocktail.component';
import { RoleGuardService } from './services/role-guard.service';

const routes: Routes = [
  {path: '', component: CocktailsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cocktails/:id', component: CocktailDetailsComponent},
  {
    path: 'my_cocktails',
    component: CocktailsComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['user', 'admin']},
  },
  {
    path: 'cocktails/create/new',
    component: EditCocktailComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['user', 'admin']},
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
