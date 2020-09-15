import React, { Component } from 'react';
import './todo-list-item.css';

export default class ToDoListItem extends Component {

    render() {
        const { label, onDeleted, 
                onToggleImportant,
                onToggleDone,
                important, done} = this.props;

        let classNames = 'todo-list-item';

        if (done) {
            classNames += ' done';
        }

        if (important) {
            classNames += ' important';
        }

        return (
            <span className={classNames}>
                <span 
                    className="todo-list-item" 
                    onClick={ onToggleDone }>
                    {label}
                </span>
                <div className="icons-wrapper">
                    <i 
                        className="fa fa-trash"
                        on onClick={onDeleted}>
                    </i>
                    <i 
                        className="fa fa-exclamation"
                        onClick={ onToggleImportant }>
                    </i>
                </div>
            </span>
        );
    };
}