import { useRef, useState } from "react";
import { Lesson, ResultAnswer, ResultLesson, Task } from "../../../interfaces"
import s from './PassLesson.module.scss';
import { PassTaskOne } from "./PassTask/PassTaskOne";
import { PassTaskMany } from "./PassTask/PassTaskMany";
import { PassTaskOpen } from "./PassTask/PassTaskOpen";
interface PassLessonProps {
    lessonProp: Lesson;
    // passLessonProps: (results: ResultLesson) => void;
    totalLessons: number;
    endCourseProps: (results: ResultAnswer[])=> void;
    nextCourseProps: (results: ResultAnswer[]) => void;
    lastCourse: boolean;
}

const initinalTask: Task = {
    id: "",
    type: "open",
    description: ""
}
const initilaAnswer: ResultAnswer = {
    taskId: "",
    userAnswers: []
}

export const PassLesson = ({ lessonProp, totalLessons, endCourseProps, nextCourseProps, lastCourse }: PassLessonProps) => {
    const [show, setShow] = useState('description_lesson');
    const [showResults, setShowResults] = useState({ total: 0, right: 0 })
    const showTask = useRef(initinalTask);
    const numberTask = useRef(0);
    // const endCourseProc = countTotalLessons
    const maxTasks = lessonProp.tasks.length;
    const [results, setResults] = useState<ResultAnswer[]>([initilaAnswer]);

    const { tasks } = lessonProp;

    function startTasks() {
        if (tasks.length < 1) {
            alert('Вы уроке не добавлены задания, обрратитесь к администратору')
            return;
        }
        showTask.current = tasks[numberTask.current];
        setShow('task');
    }
    function nextTusk(res: ResultAnswer) {
        console.log(res);
        numberTask.current++;
        if (numberTask.current === maxTasks) {
            setResults([...results, res]);

            setShowResults(checkResult())
            setShow('endLesson');
        } else {
            showTask.current = tasks[numberTask.current];
            setResults([...results, res]);

        }

    }
    function checkResult() {
        let userRA = 0;
        const rightAnswers = lessonProp.tasks.map(a => ({ taskId: a.id, userAnswers: a.rightAnsewrs }));
        console.log(rightAnswers);
        let rALesson = rightAnswers.length;
        for (let i = 0; i < rightAnswers.length; i++) {
            const rA = rightAnswers[i];
            for (let i = 0; i < results.length; i++) {
                const res = results[i];
                console.log(res);
                if (rA.taskId === res.taskId) {
                    const rAA = rightAnswers.map(a => a.userAnswers).sort()
                    const userrAA = rightAnswers.map(a => a.userAnswers).sort()
                    if (JSON.stringify(rAA) === JSON.stringify(userrAA)) {
                        userRA++;
                    }
                }
            }

        }
        console.log({ rALesson, userRA })
        return { total: rALesson, right: userRA };

    }
    function endCourse() {
        endCourseProps(results);
    }
    function nextCourse() {
        nextCourseProps(results);
    }
    return (
        <div>
            {
                show === 'description_lesson'
                &&
                <div>
                    <div
                        className={s.img_big}
                        style={{ backgroundImage: `url(${lessonProp.img ?? '/lesson_no_picture.png'})` }}>

                    </div>
                    <div className={s.wrapper}>
                        <h1 className={s.title_lesson}>{lessonProp.title}</h1>
                        <div className={s.description}>
                            {lessonProp.description}
                        </div>
                        <div
                            className={s.wrapper_btn}>
                            <button
                                className={s.btn_add}
                                onClick={() => startTasks()}
                            >
                                приступить к уроку
                            </button>
                        </div>
                    </div>
                </div>
            }
            {
                show === 'task'
                &&
                <div>
                    <div className={s.wrapper}>
                        <h1 className={s.title_lesson}>Задание {numberTask.current + 1}</h1>
                        <div className={s.description}>
                            {showTask.current.description}
                        </div>
                        {
                            showTask.current.type === 'one'
                            &&
                            <PassTaskOne task={showTask.current} nextTask={(res) => nextTusk(res)} />
                        }
                        {
                            showTask.current.type === 'many'
                            &&
                            <PassTaskMany task={showTask.current} nextTask={(res) => nextTusk(res)} />


                        }
                        {
                            showTask.current.type === 'open'
                            &&
                            <PassTaskOpen task={showTask.current} nextTask={(res) => nextTusk(res)} />
                        }
                    </div>
                </div>
            }
            {
                show === 'endLesson'
                &&
                <div className={s.wrapper}>
                    <div>
                        <h1 className={s.title_lesson}>Вы прошли урок на {showResults.right}/{showResults.total} баллов!</h1>
                        <div className={s.description}>
                            вы отлично справились с уроком!
                            прошли курс на 5%!
                        </div>
                        <div
                            className={s.wrapper_btn_duble}>
                            <button
                                className={s.btn_add}
                                onClick={() => endCourse()}
                            >
                                закончить урок
                            </button>
                            {/* <button
                                className={s.btn_add}
                                onClick={() => nextCourse()}
                            >
                                перейти к следующему
                            </button> */}
                        </div>
                    </div>
                </div>

            }
        </div>
    )
}