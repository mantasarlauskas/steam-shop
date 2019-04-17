import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorIcon from "@material-ui/icons/Error";
import Loading from "../loading";
import TextField from "../textField";
import { styles } from "../../styles/form";
import { config, url, uploadImage } from "../../server";

class ProductForm extends Component {
  state = {
    textFields: {
      title: {
        value: "",
        empty: false,
        id: "title",
        label: "Pavadinimas"
      },
      price: {
        value: "",
        empty: false,
        id: "price",
        label: "Kaina"
      },
      description: {
        value: "",
        empty: false,
        id: "description",
        label: "Aprašymas"
      }
    },
    logo: {
      value: null,
      empty: false
    },
    error: false
  };

  componentDidMount() {
    const { product, onLoad } = this.props;
    onLoad();
    product && this.initState();
  }

  componentDidUpdate({ product: prevProduct }) {
    const { product } = this.props;
    prevProduct !== product && product && this.initState();
  }

  initState = () => {
    const { product } = this.props;
    this.setState(prevState => ({
      textFields: {
        title: {
          ...prevState.textFields.title,
          value: product.title
        },
        price: {
          ...prevState.textFields.price,
          value: product.price
        },
        description: {
          ...prevState.textFields.description,
          value: product.description
        }
      }
    }));
  };

  addProduct = async fields => {
    const { token } = this.props;
    const {
      data: { secure_url }
    } = await uploadImage(fields.logo[0]);
    await axios.post(
      `${url}/products`,
      { ...fields, logo: secure_url },
      config(token)
    );
  };

  editProduct = async fields => {
    const { token, product } = this.props;
    if (fields.logo === null) {
      fields.logo = product.logo;
    } else {
      const {
        data: { secure_url }
      } = await uploadImage(fields.logo[0]);
      fields.logo = secure_url;
    }
    await axios.put(`${url}/products`, fields, config(token));
  };

  handleChange = name => ({ target: { value } }) => {
    this.setState(prevState => ({
      textFields: {
        ...prevState.textFields,
        [name]: {
          ...prevState.textFields[name],
          value,
          empty: value.length === 0
        }
      }
    }));
  };

  handleFileChange = ({ target: { files } }) => {
    this.setState({
      logo: {
        value: files.length > 0 ? files : null,
        empty: false
      }
    });
  };

  validateField = field => {
    if (field.value === "") {
      this.setState(prevState => ({
        textFields: {
          ...prevState.textFields,
          [field.id]: {
            ...prevState.textFields[field.id],
            empty: true
          }
        }
      }));
      return false;
    }
    return true;
  };

  validateForm = () => {
    const { textFields, logo } = this.state;
    const { product } = this.props;
    let count = 0;
    Object.keys(textFields).forEach(
      key => !this.validateField(textFields[key]) && count++
    );
    logo.value === null && !product && count++;
    count > 0 && this.setState({ error: true });
    return count === 0;
  };

  handleSubmit = async event => {
    const {
      textFields: { title, price, description },
      logo
    } = this.state;
    const { product, history } = this.props;
    event.preventDefault();
    if (this.validateForm()) {
      const values = {
        title: title.value,
        price: price.value,
        description: description.value,
        logo: logo.value
      };
      if (product) {
        await this.editProduct({
          ...values,
          id: product.id
        });
      } else {
        await this.addProduct(values);
      }
      history.push("/games");
    }
  };

  renderForm = () => {
    const { classes, product } = this.props;
    const {
      textFields: { title, price, description },
      logo
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <TextField field={title} onChange={this.handleChange} item={product} />
        <TextField
          field={price}
          onChange={this.handleChange}
          additionalProps={{
            type: "number",
            inputProps: { min: "0", step: "1" }
          }}
          item={product}
        />
        <TextField
          field={description}
          onChange={this.handleChange}
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
    const { classes, id, product, isLoading } = this.props;
    const { error } = this.state;
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
            {error && (
              <SnackbarContent
                className={classes.error}
                message={
                  <span>
                    <ErrorIcon className={classes.errorIcon} />
                    Formoje negali būti tuščių laukų ir nepasirinkto
                    paveikslėlio
                  </span>
                }
              />
            )}
            {this.renderForm()}
          </Paper>
        )}
      </div>
    );
  }
}

ProductForm.propTypes = {
  product: PropTypes.object,
  onLoad: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  id: PropTypes.number,
  isLoading: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired
};

ProductForm.defaultValues = {
  product: null,
  id: null
};

export default withStyles(styles)(ProductForm);