import {
  ApplicationActions,
  ApplicationActionTypes
} from '../actions/application.actions';

export interface State {
  globalLoading: boolean;
}

export const initialState: State = {
  globalLoading: false
};

export function reducer(
  state = initialState,
  action: ApplicationActions
): State {
  switch (action.type) {
    case ApplicationActionTypes.SetGlobalLoading: {
      const globalLoading = action.payload.loading;
      return {
        ...state,
        globalLoading
      };
    }

    default: {
      return state;
    }
  }
}

export const getGlobalLoading = (state: State) => state.globalLoading;
