import {  provideRouter } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TaskManagerComponent } from './components/task-manager/task-manager.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './state/user.reducer';
import { UserEffects } from './state/user.effects';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'tasks', component: TaskManagerComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ensure 'pathMatch' is either 'full' or 'prefix'
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes),    
        StoreModule.forRoot({ user: userReducer }),
        EffectsModule.forRoot([UserEffects])],
        
    exports: [RouterModule]
  })
  export class AppRoutingModule { }