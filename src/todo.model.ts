import { IsNotEmpty } from 'class-validator';

const status = ['non-active', 'active', 'completed'] as const;
export type Status = typeof status[number]


// Redux store's state
export interface Todo {
    id?: string,
    title: string,
    memo: string,
    status: Status
    due: string
}

export class clTodo implements Todo {
    @IsNotEmpty()
    title: string;
    memo: string;
    status: Status;
    @IsNotEmpty()
    due: string;

    constructor ( title: string, description:string, status: Status, due: string) {
        this.title = title;
        this.memo = description;
        this.status = status;
        this.due = due;
    }
}