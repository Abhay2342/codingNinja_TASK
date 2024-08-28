import { createReducer, on, Action } from '@ngrx/store';
import { loginSuccess } from './user.actions';

export interface UserState {
  user: { id: string; username: string; email: string; token: string } | null;
  loggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  loggedIn: false
};

const _userReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loggedIn: true
  }))
);

export function userReducer(state: UserState | undefined, action: Action) {
  return _userReducer(state, action);
}
