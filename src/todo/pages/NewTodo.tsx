import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Todo, Status } from '../../todo.model';
import { createDate } from '../../utility/DateSelectBox';
import { Redirect } from 'react-router';
import Button from '../../shared/components/FormElements/Button';
import Spinner from '../../shared/components/UIElements/Spinner';


type NewTodoProps = {
  onAddTodo: (todo: Todo) => Promise<any>,
  loading: boolean
}

type FormData  = {
  title: string,
  memo: string,
  year: string,
  month: string,
  day: string,
  status: Status,
}

const NewTodo: React.FC<NewTodoProps> = (props: NewTodoProps) => {

  const [isCreated, setIsCreated] = useState<boolean>(false)

  const { register, handleSubmit, errors } = useForm<FormData>()

  const submitHandler = handleSubmit((data) => {

    const enteredDate = data.year + data.month.padStart(2, '0') + data.day.padStart(2, '0');
    const inputObject: Todo = {
        title: data.title,
        memo: data.memo,
        status: data.status,
        due: enteredDate,
    }
    setIsCreated(true);
    props.onAddTodo(inputObject);

  })

  useEffect(() => {
    !props.loading && !isCreated && createDate();
  });

  if (props.loading) {
    return (
      <div className="todoForm">
        <Spinner />
      </div>
    )
  } else {
    if(isCreated) {
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
                ref={register({required: true})}/>
            {errors.title && <p className="errMsg">タイトルを入力してください</p>}
        </div>
        <div>
            <h2>メモ</h2>
            <textarea
                name="memo"
                ref={register}
                className="todoForm__memo"
                id="memo" cols={80} rows={3}
                placeholder="留意事項・途中経過など">
            </textarea>
        </div>
        <div>
            <h2>期日</h2>
            <select className="todoForm__due" id="year" name="year" ref={register}></select>
            <select className="todoForm__due" id="month" name="month" ref={register}></select>
            <select className="todoForm__due" id="date" name="day" ref={register}></select>
        </div>
        <div className="status">
            <h2 className="status__title">状態</h2>
            <input
                type="radio"
                className="radio__input"
                name="status"
                value="non-active"
                id="non-active"
                defaultChecked={true}
                ref={register}
              />
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
                ref={register}
              />
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
                ref={register}
              />
            <label htmlFor="completed" className="radio__label">
                <span className="radio__button"></span>
                完了
            </label>
         </div>
         <div className="btnGroup">
            <Button type="submit" className="todoForm__btn">Create New Todo</Button>
         </div>
      </form>
    </div>
  );
};

export default NewTodo;