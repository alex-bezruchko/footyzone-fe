import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setSearchTerm } from '../../actions/newsActions';
import { Input, Form, Button } from 'reactstrap';
import { FaSearch } from 'react-icons/fa';

// import loading from './../../../src/loading.gif'
class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            term: ''
        }
    }
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    searchTermHandler = e => {
        e.preventDefault();
        this.props.setSearchTerm(this.state.term);
        if (this.props.isOpen === true) {
            this.props.toggleNav();

        }
        this.setState({ term: '', loading: false });
        this.props.history.push('/search')
    }
    render() {
        return (
            <Form id="search-nav" className="nav-search-form" onSubmit={this.searchTermHandler}>
                <Input
                    placeholder="Search"
                    value={this.state.term}
                    name="term"
                    onChange={this.changeHandler}
                />
                <Button type="submmit" color="white"><FaSearch /></Button>
            </Form>
        )
    }
}

const mapStateToProps = ({ postsReducer: state }) => {
    return {
        posts: state.posts,
        loading: state.loading
    };
};

export default withRouter(connect(mapStateToProps, { setSearchTerm })(SearchForm));

