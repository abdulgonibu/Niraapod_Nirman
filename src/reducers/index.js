
import hotelghuest from '../reducers/hotelGuestReducer';
const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};
const exportedObject = {
  rehydrated,
  hotelghuest,
};

export default exportedObject