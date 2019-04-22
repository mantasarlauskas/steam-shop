import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Loading from "../loading";
import TextField from "../textField";
import withForm from "../withForm";
import { styles } from "../../styles/form";

const textFields = [
  {
    value: "",
    empty: false,
    id: "title",
    label: "Pavadinimas"
  },
  {
    value: "",
    empty: false,
    id: "price",
    label: "Kaina"
  },
  {
    value: "",
    empty: false,
    id: "description",
    label: "Aprašymas"
  }
];

class ProductForm extends Component {
  state = {
    logo: {
      value: null,
      empty: false
    }
  };

  componentDidMount() {
    const { id, getProducts } = this.props;
    id && getProducts();
  }

  componentDidUpdate({ product: prevProduct }) {
    const { product, initState, id } = this.props;
    id && prevProduct !== product && product && initState(product);
  }

  handleFileChange = ({ target: { files } }) => {
    this.setState({
      logo: {
        value: files.length > 0 ? files : null,
        empty: false
      }
    });
  };

  validateForm = () => {
    const { validateForm, setError, product } = this.props;
    const { logo } = this.state;
    let errCount = 0;
    errCount += !validateForm();
    logo.value === null &&
      !product &&
      errCount++ &&
      setError("Formoje negali būti tuščių laukų");
    return errCount === 0;
  };

  handleSubmit = async event => {
    const { logo } = this.state;
    const {
      product,
      history,
      submitProduct,
      translateValuesToObject
    } = this.props;
    event.preventDefault();
    if (this.validateForm()) {
      const values = translateValuesToObject();
      values.logo = logo.value;
      if (product) {
        await submitProduct({
          ...values,
          id: product.id
        });
      } else {
        await submitProduct(values);
      }
      history.push("/games");
    }
  };

  renderForm = () => {
    const { classes, product, textFields, handleChange } = this.props;
    const { logo } = this.state;
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <TextField {...textFields[0]} onChange={handleChange} item={product} />
        <TextField
          {...textFields[1]}
          onChange={handleChange}
          additionalProps={{
            type: "number",
            inputProps: { min: "0", step: "1" }
          }}
          item={product}
        />
        <TextField
          {...textFields[2]}
          onChange={handleChange}
          additionalProps={{ multiline: true }}
          item={product}
        />
        <input
          type="file"
          alt="Product Logo"
          accept="image/png,image/jpeg"
          style={{ display: "none" }}
          id="logo"
          onChange={this.handleFileChange}
        />
        <label htmlFor="logo" className={classes.label}>
          <Button component="span" variant="outlined">
            Pasirinkti paveikslėlį
          </Button>
        </label>
        {logo.value && (
          <Typography className={classes.fileName} variant="body2">
            {logo.value[0].name}
          </Typography>
        )}
        <div className={classes.submitWrapper}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            className={classes.submit}
            align="center"
          >
            Patvirtinti
          </Button>
        </div>
      </form>
    );
  };

  render() {
    const { classes, id, product, isLoading, error, renderError } = this.props;
    return (
      <div className={`${classes.root} container`}>
        <h1 className="title">Žaidimo forma</h1>
        <hr />
        {id && isLoading ? (
          <Loading size={100} />
        ) : id && !isLoading && !product ? (
          <Typography variant="h6">Tokio žaidimo nėra</Typography>
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

ProductForm.propTypes = {
  product: PropTypes.object,
  id: PropTypes.number,
  getProducts: PropTypes.func,
  initState: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  translateValuesToObject: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  submitProduct: PropTypes.func.isRequired,
  textFields: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  renderError: PropTypes.func.isRequired
};

ProductForm.defaultValues = {
  product: null,
  id: null,
  getProducts: null,
  isLoading: false
};

export default withStyles(styles)(withForm(ProductForm, textFields));
