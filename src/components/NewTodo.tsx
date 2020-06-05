import React, { useEffect } from 'react'
import { Todo } from '../todo.model';
import { createDate } from '../utility/DateSelectBox';
import { NewTodoActions } from '../App';
import classes from '../App.module.css';

const NewTodo: React.SFC<NewTodoActions> = (props: NewTodoActions) => {

    useEffect (() => {
        createDate();
    }, [])

    const titleRef = React.createRef<HTMLInputElement>();
    const descriptionRef = React.createRef<HTMLTextAreaElement>();
    const yearRef = React.createRef<HTMLSelectElement>();
    const monthRef = React.createRef<HTMLSelectElement>();
    const dateRef = React.createRef<HTMLSelectElement>();

    const gatherInput = (): Todo => {
        const enteredTitle: string = titleRef.current!.value;
        const enteredDiscription: string = descriptionRef.current!.value;
        const enteredDate: string = `${parseInt(yearRef.current!.value)} / ${parseInt(monthRef.current!.value)} / ${parseInt(dateRef.current!.value)}`
        return {
            id: Math.random().toString(),
            title: enteredTitle,
            description: enteredDiscription,
            isCompleted: false,
            isActive: false,
            due: enteredDate
        }
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        props.onAddTodo(gatherInput())
    }

    return (
        <div className={classes.newTodo}>
            <form onSubmit={submitHandler}>
                <label htmlFor="title">title</label>
                <input type="text" placeholder="title" id="title" ref={titleRef}/>
                <label htmlFor="description">description</label>
                <textarea name="text" id="description" placeholder="text" ref={descriptionRef}></textarea>
                <select id="year" name="year" ref={yearRef}></select>
                <select id="month" name="month" ref={monthRef}></select>
                <select id="date" name="date" ref={dateRef}></select>
                <button type="submit">Create New Todo</button>
            </form>
        </div>

    );
};



export default NewTodo;