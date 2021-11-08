import { ParticipantInterface, QuestionInterface } from ".";

export interface QuizInterface {
    id?: string,
    title: string,
    description: string,
    author: string,
    code: string,
    participants: Array<ParticipantInterface>,
    questions: Array<QuestionInterface>
}

export const QuizzesExample: QuizInterface[] = [
    {
        "id": "aaaaaaaaaa1",
        "title": "Quiz I",
        "description": "Description I",
        "questions": [
            {
                "title": "Pregunta 1",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 2",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 3",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 4",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 5",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            }
        ],
        "author": "611da32861eecc1f28dfbde3",
        "code": "GKFPSYN",
        "participants": [
            {
                "correctAnswers": 0,
                "name": "Javier",
                "userId": "611da32861eecc1f28dfbde3",
                "joinIn": "Aug 27th 21"
            },
            {
                "correctAnswers": 0,
                "name": "Admintest",
                "userId": "6122f9cb1b6fa70016443a80",
                "joinIn": "Aug 28th 21"
            }
        ]
    },
    {
        "id": "aaaaaaaaaa2",
        "title": "Quiz II",
        "description": "Description II",
        "questions": [
            {
                "title": "Pregunta 1",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 2",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 3",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 4",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 5",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            }
        ],
        "author": "611da32861eecc1f28dfbde3",
        "code": "GKFPSYN",
        "participants": [
            {
                "correctAnswers": 0,
                "name": "Javier",
                "userId": "611da32861eecc1f28dfbde3",
                "joinIn": "Aug 27th 21"
            },
            {
                "correctAnswers": 0,
                "name": "Admintest",
                "userId": "6122f9cb1b6fa70016443a80",
                "joinIn": "Aug 28th 21"
            }
        ]
    },
    {
        "id": "aaaaaaaaaa3",
        "title": "Quiz III",
        "description": "Description III",
        "questions": [
            {
                "title": "Pregunta 1",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 2",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 3",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 4",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 5",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            }
        ],
        "author": "611da32861eecc1f28dfbde3",
        "code": "GKFPSYN",
        "participants": [
            {
                "correctAnswers": 0,
                "name": "Javier",
                "userId": "611da32861eecc1f28dfbde3",
                "joinIn": "Aug 27th 21"
            },
            {
                "correctAnswers": 0,
                "name": "Admintest",
                "userId": "6122f9cb1b6fa70016443a80",
                "joinIn": "Aug 28th 21"
            }
        ]
    },
    {
        "id": "aaaaaaaaaa4",
        "title": "Quiz IV",
        "description": "Description IV",
        "questions": [
            {
                "title": "Pregunta 1",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 2",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 3",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 4",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 5",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            }
        ],
        "author": "611da32861eecc1f28dfbde3",
        "code": "GKFPSYN",
        "participants": [
            {
                "correctAnswers": 0,
                "name": "Javier",
                "userId": "611da32861eecc1f28dfbde3",
                "joinIn": "Aug 27th 21"
            },
            {
                "correctAnswers": 0,
                "name": "Admintest",
                "userId": "6122f9cb1b6fa70016443a80",
                "joinIn": "Aug 28th 21"
            }
        ]
    },
    {
        "id": "aaaaaaaaaa5",
        "title": "Quiz V",
        "description": "Description V",
        "questions": [
            {
                "title": "Pregunta 1",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 2",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 3",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 4",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 5",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            }
        ],
        "author": "611da32861eecc1f28dfbde3",
        "code": "GKFPSYN",
        "participants": [
            {
                "correctAnswers": 0,
                "name": "Javier",
                "userId": "611da32861eecc1f28dfbde3",
                "joinIn": "Aug 27th 21"
            },
            {
                "correctAnswers": 0,
                "name": "Admintest",
                "userId": "6122f9cb1b6fa70016443a80",
                "joinIn": "Aug 28th 21"
            }
        ]
    },
    {
        "id": "aaaaaaaaaa6",
        "title": "Quiz VI",
        "description": "Description VI",
        "questions": [
            {
                "title": "Pregunta 1",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 2",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 3",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 4",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 5",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            }
        ],
        "author": "611da32861eecc1f28dfbde3",
        "code": "GKFPSYN",
        "participants": [
            {
                "correctAnswers": 0,
                "name": "Javier",
                "userId": "611da32861eecc1f28dfbde3",
                "joinIn": "Aug 27th 21"
            },
            {
                "correctAnswers": 0,
                "name": "Admintest",
                "userId": "6122f9cb1b6fa70016443a80",
                "joinIn": "Aug 28th 21"
            }
        ]
    },
    {
        "id": "aaaaaaaaaa7",
        "title": "Quiz VII",
        "description": "Description VII",
        "questions": [
            {
                "title": "Pregunta 1",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 2",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 3",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 4",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 5",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            }
        ],
        "author": "611da32861eecc1f28dfbde3",
        "code": "GKFPSYN",
        "participants": [
            {
                "correctAnswers": 0,
                "name": "Javier",
                "userId": "611da32861eecc1f28dfbde3",
                "joinIn": "Aug 27th 21"
            },
            {
                "correctAnswers": 0,
                "name": "Admintest",
                "userId": "6122f9cb1b6fa70016443a80",
                "joinIn": "Aug 28th 21"
            }
        ]
    },
    {
        "id": "aaaaaaaaaa8",
        "title": "Quiz VII",
        "description": "Description VIII",
        "questions": [
            {
                "title": "Pregunta 1",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 2",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 3",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 4",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 5",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            }
        ],
        "author": "611da32861eecc1f28dfbde3",
        "code": "GKFPSYN",
        "participants": [
            {
                "correctAnswers": 0,
                "name": "Javier",
                "userId": "611da32861eecc1f28dfbde3",
                "joinIn": "Aug 27th 21"
            },
            {
                "correctAnswers": 0,
                "name": "Admintest",
                "userId": "6122f9cb1b6fa70016443a80",
                "joinIn": "Aug 28th 21"
            }
        ]
    },
    {
        "id": "aaaaaaaaaa9",
        "title": "Quiz IX",
        "description": "Description IX",
        "questions": [
            {
                "title": "Pregunta 1",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 2",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 3",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 4",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 5",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            }
        ],
        "author": "611da32861eecc1f28dfbde3",
        "code": "GKFPSYN",
        "participants": [
            {
                "correctAnswers": 0,
                "name": "Javier",
                "userId": "611da32861eecc1f28dfbde3",
                "joinIn": "Aug 27th 21"
            },
            {
                "correctAnswers": 0,
                "name": "Admintest",
                "userId": "6122f9cb1b6fa70016443a80",
                "joinIn": "Aug 28th 21"
            }
        ]
    },
    {
        "id": "aaaaaaaaaa10",
        "title": "Quiz X",
        "description": "Description X",
        "questions": [
            {
                "title": "Pregunta 1",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 2",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 3",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 4",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            },
            {
                "title": "Pregunta 5",
                "answers": [
                    {
                        "isCorrect": false,
                        "title": "Res 1"
                    },
                    {
                        "isCorrect": true,
                        "title": "Res 2"
                    }
                ]
            }
        ],
        "author": "611da32861eecc1f28dfbde3",
        "code": "GKFPSYN",
        "participants": [
            {
                "correctAnswers": 0,
                "name": "Javier",
                "userId": "611da32861eecc1f28dfbde3",
                "joinIn": "Aug 27th 21"
            },
            {
                "correctAnswers": 0,
                "name": "Admintest",
                "userId": "6122f9cb1b6fa70016443a80",
                "joinIn": "Aug 28th 21"
            }
        ]
    }
]