import React from 'react';
import loading from './../../../src/loading.gif'
import axios from 'axios';

class Welcome extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            carousel: [],
            activeSlide: {},
            counter: 0,
            loading: false,
            message: ''
        }
    }

    componentDidMount() {

        this.setState({ loading: true })
        axios
        .get('https://footyzone-be.herokuapp.com/api/posts/welcome')
        .then(response => {
            if (response.data) {
                this.setState({ message: '', loading: false, carousel: response.data, activeSlide: response.data[0], counter: 0 })
            } else {
                this.setState({ message: 'Posts are not available.', loading: false, carousel: [], activeSlide: {}, counter: 0 })
            }
        })
        .catch(err => {
            this.setState({ message: `${err}`, loading: false, carousel: [] })
        })
    }

    previousPost = () => {
        const currentCounter = this.state.counter;
        const carousel = this.state.carousel;
        const length = this.state.carousel.length; // 5

        if (currentCounter !== 0) {
            this.setState({
                activeSlide: carousel[currentCounter - 1],
                counter: currentCounter - 1
            })
        } else {
            this.setState({
                activeSlide: carousel[length - 1],
                counter: length - 1
            })
        }
    }
    nextPost = () => {
        const currentCounter = this.state.counter;
        const carousel = this.state.carousel;
        const length = this.state.carousel.length; // 5
        
        if (currentCounter === 0 ) {
            this.setState({
               activeSlide: carousel[currentCounter + 1],
               counter: currentCounter + 1
            })
        } else if (currentCounter === length - 1) {
            this.setState({
                activeSlide: carousel[0],
                counter: 0
            })
        } else {
            this.setState({
               activeSlide: carousel[currentCounter + 1],
               counter: currentCounter + 1
           })
        }
    }
    
    render = () => {
        return (
            <div className="welcome-container">
                <h1>Home</h1>
                
                {this.state.loading ? 
                    <div><img alt='Loading gif' src={loading} /></div>
                    :
                    <div className="carousel-wrapper">
                        <div className="carousel-large">

                            {this.state.carousel.length > 0 ? 
                                <div className="carousel-container">

                                    <button onClick={this.previousPost} className="controls control-previous btn btn-danger btn-sm">Previous</button>
                                    <div className="carousel-post">
                                        <p className="carousel-title">{this.state.activeSlide.title}</p>
                                        <img alt={this.state.activeSlide.title} className="carousel-image" src="https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png"/>
                                    </div>
                                    <button onClick={this.nextPost} className="controls control-next btn btn-danger btn-sm">Next</button>
                                        
                                </div>
                                :
                                <div>No posts found</div>
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Welcome;