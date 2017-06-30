import { fromJS } from 'immutable';
import { TOGGLE_DRAWER, TOGGLE_SIDEBAR } from './constants';

const initialState = fromJS({
  className: 'nav',
  classNameSidebar: 'menu-drawer'
});

function toggleDrawerReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return state.set('className', action.className);
    case TOGGLE_SIDEBAR:
      return state.set('classNameSidebar', action.classNameSidebar);
    default:
      return state;
  }
}

export default toggleDrawerReducer;
