import React, {useState, useEffect} from 'react';
import { Todo, Status } from '../../todo.model';
import'../../App.css';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import { createDate } from '../../utility/DateSelectBox';
import { useForm } from 'react-hook-form';

import Spinner from '../../shared/components/UIElements/Spinner';
import Button from '../../shared/components/FormElements/Button';

interface params {
    id: string
}

interface UpdateTodo  {
    loading: boolean,
    onLoadTodo: (id: string) => Promise<Todo>;
    onEditTodo: (id: string, todo: Todo) => void;
    onDeleteTodo: (id: string) => void;
}

type FormData  = {
    title: string,
    memo: string,
    year: string,
    month: string,
    day: string,
    status: Status,
}

type Props =  UpdateTodo  & RouteComponentProps<params>

const UpdateTodo :React.FC<Props> = (props: Props): any => {
    const [loadTodo, setLoadTodo] = useState<Todo>({
        title: '',
        memo: '',
        status: 'non-active',
        due: ''
    });

    const [isEdited, setIsEdited] = useState<boolean>(false);

     useEffect(() => {
        props.onLoadTodo(props.match.params.id)
        .then(res => {
            setLoadTodo(res);
        })
        .catch(err => {
            console.log(err);
        });
    },[props.match.url]);

    useEffect(() => {
        if(!props.loading && !isEdited) {
            createDate(parseInt(loadTodo.due.slice(0,4)),
            parseInt(loadTodo.due.slice(4,6)),
            parseInt(loadTodo.due.slice(6,8)));
        }
    });

    const { register, handleSubmit, errors, formState } = useForm<FormData>();

    const deleteTodoHandler = () => {
        props.onDeleteTodo(props.match.params.id);
        setIsEdited(true)
    };

    const submitHandler = handleSubmit((data) => {
        const enteredDate = data.year + data.month.padStart(2, '0') + data.day.padStart(2, '0');
        const inputObject: Todo = {
            title: data.title,
            memo: data.memo,
            status: data.status,
            due: enteredDate,
        }
        props.onEditTodo(props.match.params.id, inputObject);
        setIsEdited(true)

    })
    if (props.loading) {
        return(
            <div className="todoForm">
                <Spinner />
            </div>
        );
    } else {
        if(isEdited) {
            return (
                <Redirect to="/"/>
            );
        }
    }

    return (
        <div className="todoForm">
            <form id="todoForm" className="todoForm__form" onSubmit={submitHandler}>
                <div>
                    <h2>タイトル</h2>
                    <input
                        type="text"
                        placeholder="やるべきこと"
                        className="todoForm__title"
                        name="title"
                        defaultValue={loadTodo.title}
                        ref={register({required: true})}/>
                    {errors.title && <p className="errMsg">タイトルを入力してください</p>}
                </div>
                <div>
                    <h2>メモ</h2>
                    <textarea
                        name="memo"
                        ref={register}
                        className="todoForm__memo"
                        id="memo"
                        cols={80}
                        rows={3}
                        placeholder="留意事項・途中経過など"
                        defaultValue={loadTodo.memo}>
                    </textarea>
                </div>
                <div>
                    <h2>期日</h2>
                    <select className="todoForm__due" id="year" name="year" ref={register} ></select>
                    <select className="todoForm__due" id="month" name="month" ref={register}></select>
                    <select className="todoForm__due" id="date" name="day" ref={register}></select>
                </div>
                <div className="status">
                    <h2 className="status__title">状態</h2>
                    <input
                        type="radio"
                        className="radio__input"
                        name="status"
                        id="non-active"
                        value="non-active"
                        defaultChecked={loadTodo.status === 'non-active' ? true : false}
                        ref={register} />
                    <label className="radio__label" htmlFor="non-active">
                        <span className="radio__button"></span>
                        未実行
                    </label>

                    <input
                        type="radio"
                        className="radio__input"
                        name="status"
                        id="active"
                        value="active"
                        defaultChecked={loadTodo.status === 'active' ? true : false}
                        ref={register}
                        onChange={() => setLoadTodo({...loadTodo, status: 'active'})}/>
                    <label className="radio__label" htmlFor="active">
                        <span className="radio__button"></span>
                        実行中
                    </label>

                    <input
                        type="radio"
                        className="radio__input"
                        name="status"
                        id="completed"
                        value="completed"
                        defaultChecked={loadTodo.status === 'completed' ? true : false}
                        ref={register}/>
                    <label htmlFor="completed" className="radio__label">
                        <span className="radio__button"></span>
                        完了
                    </label>
                </div>
                <div className="btnGroup">
                    <Button type="submit" className="todoForm__btn">Edit Todo</Button>
                    <Button onClick={deleteTodoHandler} danger>Delete Todo</Button>
                </div>
            </form>
        </div>
  );
}

export default withRouter(UpdateTodo);