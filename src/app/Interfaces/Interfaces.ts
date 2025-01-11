export interface AnswerInterface {
    answer: string;
    key: string;
}

export interface SubjectInterface {
    _id: string;
    name: string;
    icon: string;
    createdAt: string;
}

export interface ExamInterface {
    _id: string;
    title: string;
    duration: number;
    subject: string;
    numberOfQuestions: number;
    active: boolean;
    createdAt: string;
}

export interface QuizQuestion {
    answers: AnswerInterface[];
    type: string;
    _id: string;
    question: string;
    correct: string;
    subject: SubjectInterface;
    exam: ExamInterface;
    createdAt: string;
}

export interface subjectWithExamsInterface {
    subjectName: string;
    exams: ExamInterface[];
  }

export interface UserAnswer {
    question: QuizQuestion,
    answer: string
}