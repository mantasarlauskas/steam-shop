import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {
	FaHome,
	FaShoppingCart,
	FaUserAlt,
	FaUpload,
	FaGamepad,
	FaFirstOrder
} from 'react-icons/fa';

class Menu extends Component {
	state = {
		mainPages: [
			{
				link: '',
				Icon: FaHome,
				title: 'Home'
			},
			{
				link: 'games',
				Icon: FaGamepad,
				title: 'Games'
			}
		],
		userPages: [
			{
				link: 'cart',
				Icon: FaShoppingCart,
				title: 'Cart'
			},
			{
				link: 'orders',
				Icon: FaFirstOrder,
				title: 'Orders'
			}
		],
		adminPages: [
			{
				link: 'users',
				Icon: FaUserAlt,
				title: 'Users'
			},
			{
				link: 'keys',
				Icon: FaUserAlt,
				title: 'Keys'
			},
			{
				link: 'product-upload',
				Icon: FaUpload,
				title: 'Game upload'
			},
			{
				link: 'key-upload',
				Icon: FaUpload,
				title: 'Key upload'
			}
		]
	};

	componentDidMount() {
		document.addEventListener('click', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleClickOutside);
	}

	handleClickOutside = event => {
		const {toggleMenu} = this.props;
		if (this.navbarRef && !this.navbarRef.contains(event.target)) {
			toggleMenu();
		}
	};

	renderLink = ({link, Icon, title}) => {
		const {toggleMenu} = this.props;
		return (
			<Link
				key={link}
				className="list-group-item bg-dark"
				to={`/${link}`}
				onClick={toggleMenu}
			>
				<Icon/> {title}
			</Link>
		);
	};

	render() {
		const {mainPages, userPages, adminPages} = this.state;
		const {role, isClosing} = this.props;
		return (
			<nav
				ref={x => (this.navbarRef = x)}
				className={`menu bg-dark ${isClosing && 'closing'}`}
			>
				<ul className="list-group">
					{mainPages.map(this.renderLink)}
					{(role === 0 || role === 1) && userPages.map(this.renderLink)}
					{role === 1 && adminPages.map(this.renderLink)}
				</ul>
			</nav>
		);
	}
}

Menu.propTypes = {
	toggleMenu: PropTypes.func.isRequired,
	role: PropTypes.number.isRequired,
	isClosing: PropTypes.bool.isRequired
};

export default Menu;
