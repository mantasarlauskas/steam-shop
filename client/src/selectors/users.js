import {createSelector} from 'reselect';
import sortBy from 'lodash.sortby';

const usersSelector = state => state.auth.users;
const paginationSelector = state => state.pagination;

export const usersSortedByNameSelector = createSelector(
	[usersSelector],
	users => sortBy(users, [user => user.registration_date]).reverse()
);

export const usersPaginationSelector = createSelector(
	[usersSortedByNameSelector, paginationSelector],
	(users, {currentPage, itemsPerPage}) =>
		users.filter(
			(user, index) =>
				index >= currentPage * itemsPerPage &&
				index < currentPage * itemsPerPage + itemsPerPage
		)
);
