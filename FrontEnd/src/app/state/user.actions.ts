// user.actions.ts
import { createAction, props } from '@ngrx/store';

export const logout = createAction('[Auth API] Logout');


export const setUser = createAction(
  '[User] Set User',
  props<{ user: any }>()
);



export const loginSuccess = createAction(
  '[Auth API] Login Success',
  props<{ user: { id: string; username: string; email: string; token: string } }>()
);

export const loginFailure = createAction(
  '[Auth API] Login Failure',
  props<{ error: any }>()
);



