import React from 'react';
import './App.css';
import Draggable from 'react-draggable';

class Note extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
    }

    componentWillMount = () => {
        this.style = {
            right: this.randomBetween(0, window.innerWidth-150, 'px'),
            top: this.randomBetween(0, window.innerHeight-150, 'px')
        }
    }

    randomBetween = (x, y, s) => {
        return (x+Math.random() * (y-x)) + s
    }

    editing = () => {
        this.setState(
            {
                editing: true
            }
        )
    }

    saving = () => {
        this.props.onChange(this.refs.newText.value, this.props.id)
        this.setState({editing: false})
    }

    deleting = (id) => {
        this.props.onRemove(this.props.id)
    }

    renderForm = () => {
        return(
            <div className="note" style={this.style}>
                <textarea ref="newText" placeholder={this.props.children}></textarea><br/>
                <button onClick={this.saving}>Save</button>    
            </div>
        )
    }

    renderDisplay = () => {
        return(
            <div className="note" style={this.style}>
                <p> {this.props.children} </p>
                <span>
                    <button onClick={this.editing}>Edit</button>
                    <button onClick={this.deleting}>Delete</button>
                </span>
            </div>
        )
    }

    render() {
        return (
            <Draggable>{
                (this.state.editing) ? this.renderForm() : this.renderDisplay()
            }</Draggable>
        )
    }
}

export default Note;