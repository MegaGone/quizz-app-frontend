export interface Quiz {
    id?: string | number;
    name: string;
    icon?: string;
    code: string;
    participants: number;
}

export const Quizzes: Quiz[] = [
    {
        id: '1',
        name: 'Quiz1',
        code: 'abc',
        participants: 10
    },
    {
        id: '2',
        name: 'Quiz2',
        code: 'abc',
        participants: 10
    },
    {
        id: '3',
        name: 'Quiz3',
        code: 'abc',
        participants: 10
    },
    {
        id: '4',
        name: 'Quiz4',
        code: 'abc',
        participants: 10
    },
    {
        id: '5',
        name: 'Quiz5',
        code: 'abc',
        participants: 10
    }
]