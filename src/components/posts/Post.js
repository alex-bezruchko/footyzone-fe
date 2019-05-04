import React from 'react';
import { viewPost } from '../../actions/postsActions';
import blank from './../../img/blank.jpeg';
import { connect } from 'react-redux';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        this.props.viewPost(id);
    }

    render() {
        return(
            <div className="container post">
                <h1>{this.props.post.title}</h1>
                {this.props.post.postMainImg ? 
                    <img src={this.props.post.postMainImg} alt={this.props.post.title}/>
                    :
                    <img src={blank} alt="blank " />
                }
                <div className="body">
                    {this.props.post.body? 
                        <div className="body">{this.props.post.body}</div>
                        :
                        <div className="body">Tottenham 'consider selling TWELVE players this summer' with Trippier, Eriksen and Alderweireld among. Tottenham 'consider selling TWELVE players this summer' with Trippier, Eriksen and Alderweireld among. Tottenham 'consider selling TWELVE players this summer' with Trippier, Eriksen and Alderweireld among</div>
                    }
                </div>
            </div>
        )
    }
}

const MapStateToProps = ({ postsReducer: state }) => {
    return {
        post: state.post
    }
}
export default connect(MapStateToProps, {viewPost} )(Post);
