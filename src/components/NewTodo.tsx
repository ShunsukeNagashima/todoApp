import React, { useEffect, useState } from 'react'
import { Todo } from '../todo.model';
import { Status } from '../todo.model';
import { validate } from 'class-validator'
import { clTodo} from '../todo.model';
import { createDate } from '../utility/DateSelectBox';
import classes from '../App.module.css';
import { withRouter, Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';

interface newTodoProps {
    onAddTodo: (object: Todo) => void;
}

type Props = newTodoProps & RouteComponentProps

const NewTodo: React.FC<Props> = (props: Props) => {

    interface errMgs {
        title?: string,
        due?: string
    }

    const [errMsg, setErrMsg] = useState<errMgs>({});
    const [isCreated, setIsCreated] = useState(false);

    useEffect (() => {
        createDate();
    }, [])

    const titleRef = React.createRef<HTMLInputElement>();
    const memoRef = React.createRef<HTMLTextAreaElement>();
    const yearRef = React.createRef<HTMLSelectElement>();
    const monthRef = React.createRef<HTMLSelectElement>();
    const dateRef = React.createRef<HTMLSelectElement>();

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredTitle: string = titleRef.current!.value;
        const enteredDiscription: string = memoRef.current!.value;
        const enteredDate: string = `${yearRef.current!.value}${monthRef.current!.value.padStart(2, '0')}${dateRef.current!.value.padStart(2, '0')}`
        const statuses = document.getElementsByName("status")　as NodeListOf<HTMLInputElement>;
        let enteredStatus: Status = 'non-active';
        statuses.forEach(status => {
            if (status.checked) {
                switch ( status.value) {
                    case 'non-active':
                        enteredStatus = 'non-active'
                        break;
                    case 'active':
                        enteredStatus = 'active'
                        break;
                    case 'completed':
                        enteredStatus = 'completed'
                        break;
                }
            }
        })
        const inputObject = new clTodo( enteredTitle,
                                        enteredDiscription,
                                        enteredStatus,
                                        enteredDate)
        validate(inputObject).then(errors => {
            if (errors.length > 0) {
                errors.map(error => {
                    switch(error.property) {
                        case 'title':
                            setErrMsg({title: 'titleを入力してださい'});
                            break;
                        case 'due':
                            setErrMsg({due: '正しい値を入力してください'});
                            break;
                    }
                })
                return
            } else {
                props.onAddTodo(inputObject);
                let titleInput = document.getElementById('title')! as HTMLInputElement;
                titleInput.value = '';
                let memoInput = document.getElementById('memo')! as HTMLTextAreaElement;
                memoInput.value = '';
                if (errMsg !== null) {
                    setErrMsg({});
                }
                setIsCreated(true);
            }
        })
    }

    const redirect = isCreated ? <Redirect to="/todos" /> : null;

    return (
        <div className={classes.todoForm}>
            { redirect }
            <form id="todoForm" onSubmit={submitHandler} className={classes.todoForm__form}>
                <div>
                   <h2>タイトル</h2>
                    <input type="text" placeholder="やるべきこと"  className={classes.todoForm__title} id="title" ref={titleRef}/>
                    <p className={classes.errMsg}>{errMsg.title}</p>
                </div>
                <div>
                    <h2>メモ</h2>
                    <textarea name="text" className={classes.todoForm__memo} id="memo" cols={80} rows={3} placeholder="留意事項・途中経過など" ref={memoRef}></textarea>
                </div>
                <div>
                    <h2>期日</h2>
                    <select className={classes.todoForm__due} id="year" name="year" ref={yearRef}></select>
                    <select className={classes.todoForm__due} id="month" name="month" ref={monthRef}></select>
                    <select className={classes.todoForm__due} id="date" name="date" ref={dateRef}></select>
                </div>
                <div className={classes.status}>
                    <h2 className={classes.status__title}>状態</h2>
                    <input type="radio" className={classes.radio__input} defaultChecked={true} name="status" id="non-active" value="non-active"/>
                    <label htmlFor="non-active" className={classes.radio__label}>
                        <span className={classes.radio__button}></span>
                        未実行
                    </label>

                    <input type="radio" className={classes.radio__input} name="status" id="active" value="active" />
                    <label htmlFor="active" className={classes.radio__label}>
                        <span className={classes.radio__button}></span>
                        実行中
                    </label>

                </div>
                <button type="submit" className={classes.todoForm__btn}>Create New Todo</button>
            </form>
        </div>

    );
};



export default withRouter(NewTodo);