export interface Course {
    id: string;
    title: string;
    img?: string;
    description: string;
    type: string;
    steps: Step[];
}

export interface Step {
    id: string;
    order: number;
    lessons: Lesson[];
}
export interface Lesson {
    id: string;
    description?: string;
    tasks: Task[];
    achivments?: string[];
    title: string;
    img: string;
}
export interface Task {
    id: string;
    //один ответ, много ответов, открытый вопрос
    type: 'one' | 'many' | 'open';
    description: string;
    // answers - только для one и many
    answers?: string[];
    rightAnsewrs?: string[];
    //answer - только для open
    answer?: string;
}

export interface ResultLesson {
    answers: ResultAnswer[];
}
export interface ResultAnswer {
    taskId: string;
    userAnswers: string[];
}