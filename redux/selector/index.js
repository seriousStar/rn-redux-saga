import { createSelector } from 'reselect';

const auth$ = state => state.auth;
export const authSelector = createSelector(auth$, auth => ({
  auth,
}));
