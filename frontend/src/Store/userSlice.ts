import { logoutSuccess } from "./useReducer";

export const checkTokenExpirationMiddleware =
  (store: any) => (next: any) => (action: any) => {
    const state = store.getState().user;
    const currentTime = Math.floor(Date.now() / 1000);

    console.log(currentTime);
    if (state.tokenExpiration && currentTime >= state.tokenExpiration) {
      store.dispatch(logoutSuccess());
    }

    return next(action);
  };

export default checkTokenExpirationMiddleware;
