import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default (WrappedComponent, checkLength = false) => {
	class WithPagination extends Component {
		state = {
			paginatedItems: []
		};

		componentDidMount() {
			const {getItems, items} = this.props;
			checkLength ? items.length === 0 && getItems() : getItems();
		}

		handleItemChange = paginatedItems => {
			this.setState({
				paginatedItems
			});
		};

		render() {
			const {paginatedItems} = this.state;
			return (
				<WrappedComponent
					paginatedItems={paginatedItems}
					handleItemChange={this.handleItemChange}
					{...this.props}
				/>
			);
		}
	}

	WithPagination.propTypes = {
		getItems: PropTypes.func.isRequired
	};

	return WithPagination;
};
