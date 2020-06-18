import React, {useState, useEffect} from 'react';
import { Todo, clTodo, Status } from '../todo.model';
import classes from '../App.module.css';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import { createDate } from '../utility/DateSelectBox';
import { validate } from 'class-validator'

interface params {
    id: string
}

interface FullTodoProps {
    onLoadTodo: (id: string) => Promise<Todo>;
    onEditTodo: (id: string, todo: Todo) => void;
    onDeleteTodo: (id: string) => void;
}

interface errMgs {
    title?: string,
    due?: string
}

type Props =  FullTodoProps & RouteComponentProps<params>

const FullTodo:React.FC<Props> = (props: Props) => {

    const [loadTodo, setLoadTodo] = useState<Todo>({
        title: '',
        memo: '',
        status: 'non-active',
        due: ''
    });
    const [errMsg, setErrMsg] = useState<errMgs>({})
    const [isEdited, setIsEdited] = useState(false);

    useEffect(() => {

        props.onLoadTodo(props.match.params.id)
            .then(res => {
                setLoadTodo(res)
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    useEffect(() => {
        createDate(parseInt(loadTodo.due.slice(0,4)),
                    parseInt(loadTodo.due.slice(4,6)),
                    parseInt(loadTodo.due.slice(6,8)));
    })


    const yearRef = React.createRef<HTMLSelectElement>();
    const monthRef = React.createRef<HTMLSelectElement>();
    const dateRef = React.createRef<HTMLSelectElement>();

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
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
        const inputObject = new clTodo( loadTodo.title,
                                        loadTodo.memo,
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
                props.onEditTodo(props.match.params.id, inputObject);
                let titleInput = document.getElementById('title')! as HTMLInputElement;
                titleInput.value = '';
                let memoInput = document.getElementById('memo')! as HTMLTextAreaElement;
                memoInput.value = '';
                if (errMsg !== null) {
                    setErrMsg({});
                }
                setIsEdited(true);
            }
        })
    }

    const deleteTodoHandler = () => {
        props.onDeleteTodo(props.match.params.id);
        setIsEdited(true);
    }

    const redirect = isEdited ? <Redirect to="/" /> : null;

    return (
        <div className={classes.todoForm}>
        {redirect}
        <form id="todoForm" className={classes.todoForm__form}>
            <div>
                <h2>タイトル</h2>
                <input
                    type="text"
                    placeholder="やるべきこと"
                    className={classes.todoForm__title}
                    id="title"
                    value={loadTodo.title}
                    onChange={(event: React.FormEvent<HTMLInputElement>) => setLoadTodo({...loadTodo, title: event.currentTarget.value})}/>

                <p className={classes.errMsg}>{errMsg.title}</p>
            </div>
            <div>
                <h2>メモ</h2>
                <textarea
                    name="text"
                    className={classes.todoForm__memo}
                    id="memo" cols={80} rows={3}
                    placeholder="留意事項・途中経過など"
                    value={loadTodo.memo}
                    onChange={(event: React.FormEvent<HTMLTextAreaElement>) => setLoadTodo({...loadTodo, memo: event.currentTarget.value})}>
                </textarea>
            </div>
            <div>
                <h2>期日</h2>
                <select className={classes.todoForm__due} id="year" name="year" ref={yearRef}></select>
                <select className={classes.todoForm__due} id="month" name="month" ref={monthRef}></select>
                <select className={classes.todoForm__due} id="date" name="date" ref={dateRef}></select>
            </div>
            <div className={classes.status}>
                <h2 className={classes.status__title}>状態</h2>
                <input
                    type="radio"
                    className={classes.radio__input}
                    name="status"
                    id="non-active"
                    value="non-active"
                    checked={loadTodo.status==='non-active' ? true : false}
                    onChange={() => setLoadTodo({...loadTodo, status: 'non-active'})}/>
                <label className={classes.radio__label} htmlFor="non-active">
                    <span className={classes.radio__button}></span>
                    未実行
                </label>

                <input
                    type="radio"
                    className={classes.radio__input}
                    name="status"
                    id="active"
                    value="active"
                    checked={loadTodo.status==='active' ? true : false}
                    onChange={() => setLoadTodo({...loadTodo, status: 'active'})}/>
                <label className={classes.radio__label} htmlFor="active">
                    <span className={classes.radio__button}></span>
                    実行中
                </label>

                <input
                    type="radio"
                    className={classes.radio__input}
                    name="status"
                    id="completed"
                    value="completed"
                    checked={loadTodo.status==='completed' ? true : false}
                    onChange={() => setLoadTodo({...loadTodo, status: 'completed'})} />
                <label htmlFor="completed" className={classes.radio__label}>
                    <span className={classes.radio__button}></span>
                    完了
                </label>
            </div>
        </form>
        <div className={classes.btnGroup}>
            <button onClick={submitHandler} className={classes.todoForm__btn}>Edit Todo</button>
            <button onClick={deleteTodoHandler} className={classes.todoForm__delbtn}>Delete Todo</button>
        </div>
    </div>
    );
}


export default withRouter(FullTodo);