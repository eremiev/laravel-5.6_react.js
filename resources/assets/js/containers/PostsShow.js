import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions/posts';

class PostsShow extends Component {

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        const {id} = this.props.match.params;

        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    onUpdateClick() {
        const {id} = this.props.match.params;
        this.props.history.push(`/posts/${id}/edit`);
    }

    render() {
        const {post} = this.props;

        if (!post) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <Link to="/">Back To Index</Link>
                <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>
                    Delete Post
                </button>
                <button className="btn btn-primary pull-xs-right" onClick={this.onUpdateClick.bind(this)}>
                    Update Post
                </button>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
            </div>
        );

    }
}

function mapStateToProps({posts}, ownProps) {
    return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);