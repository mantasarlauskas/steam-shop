import {openMenu, startClosingMenu, closeMenu} from '../actions/menu';

export const toggleMenu = () => (dispatch, getState) => {
	const {isOpen} = getState().menu;
	if (isOpen) {
		dispatch(startClosingMenu());
		setTimeout(() => dispatch(closeMenu()), 500);
	} else {
		dispatch(openMenu());
	}
};
