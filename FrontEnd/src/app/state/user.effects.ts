import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { loginSuccess, loginFailure } from './user.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Auth] Login'),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(response => loginSuccess({ user: response })),
          catchError(error => of(loginFailure({ error })))
        )
      )
    )
  );
}
