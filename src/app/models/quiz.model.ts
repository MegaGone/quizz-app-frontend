import { ParticipantInterface, QuestionInterface } from "../interfaces";

export class QuizModel {
  constructor(
    id: string,
    description: string,
    title: string,
    author: string,
    code: string,
    questions: Array<QuestionInterface>,
    participants: Array<ParticipantInterface>
  ) {}
}

// TODO: Check the questions & participants array
