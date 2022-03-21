import { ParticipantInterface, QuestionInterface } from ".";

export interface QuizInterface {
    _id?: string | any,
    title: string,
    description: string,
    author: string,
    code: string,
    participants: Array<ParticipantInterface> | any,
    questions: Array<QuestionInterface>
}

export const ParticipantsExample: ParticipantInterface[] = [
        {
            "correctAnswers": 0,
            "name": "Javier",
            "userId": "611da32861eecc1f28dfbde3",
            "joinIn": "Tue Dec 28 2021"
        },
        {
            "correctAnswers": 0,
            "name": "Admintest",
            "userId": "6122f9cb1b6fa70016443a80",
            "joinIn": "Sep Nov 28 2002"
        }
]