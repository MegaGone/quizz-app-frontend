import { ParticipantInterface, QuestionInterface } from "../interfaces";

export class QuizModel {
  constructor(
    id: number,
    description: string,
    title: string,
    author: string,
    code: string,
    questions: Array<QuestionInterface>,
    participants: Array<ParticipantInterface>
  ) {}
}

// TODO: Check the questions & participants array
