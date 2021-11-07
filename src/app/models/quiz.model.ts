import { ParticipantInterface, QuestionInterface } from "../interfaces";

export class QuizModel {
  constructor(
    id: number,
    title: string,
    author: string,
    code: string,
    questions: QuestionInterface[],
    participants: ParticipantInterface[]
  ) {}
}

// TODO: Check the questions & participants array
