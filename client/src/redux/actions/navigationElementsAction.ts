export const TOGGLE_MENU = "TOGGLE_MENU";
export const TOGGLE_SIDEBAR_SLIDING_ELEMENT = "TOGGLE_SIDEBAR_SLIDING_ELEMENT";
export const SHOW_SIDEBAR_SLIDING_ELEMENT = "SHOW_SIDEBAR_SLIDING_ELEMENT";
export const HIDE_SIDEBAR_SLIDING_ELEMENT = "HIDE_SIDEBAR_SLIDING_ELEMENT";

export type ActionTypes =
  | { type: typeof TOGGLE_MENU }
  | { type: typeof TOGGLE_SIDEBAR_SLIDING_ELEMENT }
  | { type: typeof SHOW_SIDEBAR_SLIDING_ELEMENT; payload: boolean }
  | { type: typeof HIDE_SIDEBAR_SLIDING_ELEMENT; payload: boolean };

// MOBILE MENU
export const toggleMenu = (state: boolean): ActionTypes => ({
  type: TOGGLE_MENU,
});

// SIDEBAR SLIDING ELEMENT
export const toggleSidebarSlidingElement = (state: boolean): ActionTypes => ({
  type: TOGGLE_SIDEBAR_SLIDING_ELEMENT,
});

export const showSidebarSlidingElement = (state: boolean): ActionTypes => ({
  type: SHOW_SIDEBAR_SLIDING_ELEMENT,
  payload: true,
});

export const hideSidebarSlidingElement = (state: boolean): ActionTypes => ({
  type: HIDE_SIDEBAR_SLIDING_ELEMENT,
  payload: false,
});
