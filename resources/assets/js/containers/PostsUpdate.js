import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchPost, updatePost} from '../actions/posts';

class PostsUpdate extends Component {

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchPost(id);
    }

    onSubmit(values) {
        const {id} = this.props.match.params;
        this.props.updatePost(id, values, () => {
            this.props.history.push('/');
        });
    }

    renderField({input, label, test, meta: {touched, error, warning}}) {
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        //TODO get old value not working

        return (
            <div className={className}>
                <label htmlFor="title">{label}</label>
                <input className="form-control" type="text" value=""
                    {...input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    render() {
        const {handleSubmit, post} = this.props;

        if (!post) {
            return <div>Loading...</div>
        }

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field label="Title" name="title" test={post.title} component={this.renderField}/>
                <Field label="Post description" name="description" test={post.description} component={this.renderField}/>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to='/' className="btn btn-danger">Cancel</Link>
            </form>
        );
    }

}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = 'Enter a title!';
    }

    if (!values.description) {
        errors.description = 'Enter a description!';
    }
    //if errors is empty, the form is fine to submit
    return errors;
}


function mapStateToProps({posts}, ownProps) {
    return {post: posts[ownProps.match.params.id]};
}

export default reduxForm({
    validate,
    form: 'PostsUpdateForm'
})(
    connect(mapStateToProps, {fetchPost, updatePost})(PostsUpdate)
);