import React, {Component} from 'react';
import CreatePostForm from './CreatePostForm';
import {createPost} from '../../models/post';
import {showInfo} from '../../utils/utils';
export default class CreatePostPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            inputDisabled: true,
            date: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onCreateSuccess = this.onCreateSuccess.bind(this);
    }

    onChangeHandler(event) {
        event.preventDefault();

        let newState = {};
        newState[event.target.name] = event.target.value;
        if (event.target.name === "title") {
            if (event.target.value.length < 3) {
                newState.inputDisabled = true;
            } else {
                newState.inputDisabled = false;
            }
        }

        this.setState(newState);
    }

    onSubmitHandler(event){
        event.preventDefault();
        createPost(this.state.title, this.state.content, Date.now(), this.onCreateSuccess, 'kinvey');
    }

    onCreateSuccess(result) {
        if (result === true) {
            showInfo('Post Was Successfully Created!');
            this.context.router.push('/listPosts');
        }

    }

    render() {
        return (
            <div className="container">
                <h1>Create New Post</h1>
                <CreatePostForm
                    title={this.state.title}
                    content={this.state.content}
                    inputDisabled={this.state.inputDisabled}
                    onChange={this.onChangeHandler}
                    onSubmit={this.onSubmitHandler}
                />
            </div>
        )
    }
}

CreatePostPage.contextTypes = {
    router: React.PropTypes.object
};