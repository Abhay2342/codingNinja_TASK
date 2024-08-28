import { Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TaskManagerComponent } from './components/task-manager/task-manager.component';

export const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'tasks', component: TaskManagerComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
