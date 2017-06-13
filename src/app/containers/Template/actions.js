import { TOGGLE_DRAWER, TOGGLE_SIDEBAR } from './constants'

export function toggleDrawer(className) {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_DRAWER,
      className
    })
  }
}
export function toggleSidebar(classNameSidebar) {
  return (dispatch) => {
    dispatch ({
      type: TOGGLE_SIDEBAR,
      classNameSidebar
    })
  }
}
