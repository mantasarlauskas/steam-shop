import React, { Component } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import { Link } from 'react-router-dom';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            show: false
        };
    };

    showSearch = () => {
        this.setState({
            show: true
        });
    };

    handleClickOutside = () => {
        this.setState({
            show: false
        })
    };

    displayCard = ({ id, logo, title }) => {
        return (
            <Link key={id} onClick={this.handleClickOutside} className="card search-card" to={`/product/${id}`}>
                <img className="card-img-top" src={logo} alt="Card image cap" />
                <div className="card-body">
                    <p className="card-text">{title}</p>
                </div>
            </Link>
        )
    };

    displayEmptyCard = () => {
        return (
            <div className="card">
                <div className="card-body">
                    <p className="card-text">Paieška neatitinka jokių rezultatų</p>
                </div>
            </div>
        )
    }

    render() {
        const {  games, searchForProducts } = this.props;
        const { show } = this.state;
        return (
            <div className="search-input" onClick={this.showSearch}>
                <input type="text" className="form-control" placeholder="Ieškoti" onChange={searchForProducts} />
                {show && (
                    <div className="search-cards">
                        {games 
                            ? games.length > 0 
                            ? games.map(this.displayCard)
                            : this.displayEmptyCard()
                            : null        
                        }
                    </div>
                )}
            </div>
                
        );
    };
}

export default enhanceWithClickOutside(Search);