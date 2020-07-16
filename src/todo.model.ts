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
