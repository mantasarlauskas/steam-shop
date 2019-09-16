import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {withStyles} from '@material-ui/core/styles';
import TextField from '../textField';
import Loading from '../loading';
import withForm from '../withForm';
import {styles} from '../../styles/form';

const textFields = [
	{
		value: '',
		empty: false,
		id: 'game_id'
	},
	{
		value: '',
		id: 'steam_key',
		label: 'Key',
		empty: false
	}
];

class KeyForm extends Component {
	componentDidMount() {
		const {onKeyLoad, id} = this.props;
		id ? onKeyLoad(id) : onKeyLoad();
	}

	componentWillUnmount() {
		const {resetKey, id} = this.props;
		id && resetKey();
	}

	componentDidUpdate({productKey: prevKey}) {
		const {productKey, id, initState} = this.props;
		id && productKey && prevKey !== productKey && initState(productKey);
	}

	handleSubmit = async event => {
		const {
			submitKey,
			productKey,
			history,
			validateForm,
			translateValuesToObject
		} = this.props;
		event.preventDefault();
		if (validateForm()) {
			const values = translateValuesToObject();
			if (productKey) {
				await submitKey({
					...values,
					id: productKey.id
				});
			} else {
				await submitKey(values);
			}
			history.push('/keys');
		}
	};

	renderForm = () => {
		const {
			classes,
			products,
			productKey,
			textFields,
			handleChange
		} = this.props;
		return (
			<form onSubmit={this.handleSubmit} noValidate>
				<FormControl>
					<InputLabel htmlFor="game">Select game</InputLabel>
					<Select
						className={classes.select}
						value={textFields[0].value}
						displayEmpty
						onChange={handleChange(textFields[0].id)}
						inputProps={{
							id: 'game'
						}}
					>
						{products.map(({id, title}) => (
							<MenuItem key={id} value={id}>
								{title}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField
					{...textFields[1]}
					onChange={handleChange}
					item={productKey}
				/>
				<div className={classes.submitWrapper}>
					<Button
						variant="contained"
						color="primary"
						type="submit"
						size="large"
						className={classes.submit}
						align="center"
					>
						Submit
					</Button>
				</div>
			</form>
		);
	};

	render() {
		const {
			classes,
			id,
			isProductsLoading,
			isLoading,
			productKey,
			renderError,
			error
		} = this.props;
		return (
			<div className={`${classes.root} container`}>
				<h1 className="title">Key form</h1>
				<hr/>
				{isProductsLoading || (id && isLoading) ? (
					<Loading size={100}/>
				) : id && !isLoading && !productKey ? (
					<Typography variant="h6">Key does not exist</Typography>
				) : (
					<Paper className={classes.body}>
						{error && renderError()}
						{this.renderForm()}
					</Paper>
				)}
			</div>
		);
	}
}

KeyForm.propTypes = {
	onKeyLoad: PropTypes.func.isRequired,
	id: PropTypes.number,
	resetKey: PropTypes.func,
	initState: PropTypes.func.isRequired,
	productKey: PropTypes.object,
	submitKey: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	products: PropTypes.array.isRequired,
	isProductsLoading: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool,
	validateForm: PropTypes.func.isRequired,
	translateValuesToObject: PropTypes.func.isRequired,
	textFields: PropTypes.array.isRequired,
	handleChange: PropTypes.func.isRequired,
	renderError: PropTypes.func.isRequired,
	error: PropTypes.string.isRequired
};

KeyForm.defaultValues = {
	id: null,
	resetKey: null,
	productKey: null,
	isLoading: false
};

export default withStyles(styles)(withForm(KeyForm, textFields));
