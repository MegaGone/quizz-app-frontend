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

export const QuizzesExample: QuizInterface[] = [
    {
        "_id": "aaaaaaaaaa1",
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
        "_id": "aaaaaaaaaa2",
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
        "_id": "aaaaaaaaaa3",
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
        "_id": "aaaaaaaaaa4",
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
        "_id": "aaaaaaaaaa5",
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
        "_id": "aaaaaaaaaa6",
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
        "_id": "aaaaaaaaaa7",
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
        "_id": "aaaaaaaaaa8",
        "title": "Quiz VIII",
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
        "_id": "aaaaaaaaaa9",
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
        "_id": "aaaaaaaaaa10",
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

export const QuizzExample: QuizInterface = {
    "_id": "aaaaaaaaaa1",
    "title": "Quiz I",
    "description": "Description I",
    "questions": [
        {
            "id": "Question1",
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
            "id": "Question2",
            "title": "Pregunta 2",
            "answers": [
                {
                    "isCorrect": false,
                    "title": "Res 1"
                },
                {
                    "isCorrect": true,
                    "title": "Res 2"
                },
                {
                    "isCorrect": true,
                    "title": "Res 3"
                }
            ]
        },
        {
            "id": "Question3",
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
            "id": "Question4",
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
            "id": "Question5",
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
        },
        {
            "id": "Question6",
            "title": "Pregunta 6",
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
            "id": "Question7",
            "title": "Pregunta 7",
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
            "id": "Question8",
            "title": "Pregunta 8",
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
            "id": "Question9",
            "title": "Pregunta 9",
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
            "id": "Question10",
            "title": "Pregunta 10",
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
    "code": "ABCDE",
    "participants": [
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
}