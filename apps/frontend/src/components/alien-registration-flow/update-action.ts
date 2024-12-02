import { GlobalState } from 'little-state-machine';

// TODO fix the typing of updateAction so it uses the dto
export default function updateAction(
  state: GlobalState,
  payload: Partial<GlobalState['data']>,
) {
  console.log('state:', state);
  console.log('payload:', payload);
  return {
    ...state,
    data: {
      ...state.data,
      ...payload,
    },
  };
}
