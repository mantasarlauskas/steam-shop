import C from "../constants";

export const openMenu = () => ({
  type: C.OPEN_MENU
});

export const startClosingMenu = () => ({
  type: C.START_CLOSING_MENU
});

export const closeMenu = () => ({
  type: C.CLOSE_MENU
});
