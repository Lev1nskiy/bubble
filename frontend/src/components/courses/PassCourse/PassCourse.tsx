import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { coursesMocks } from "../../../mock";
import { Course, Lesson, ResultAnswer, ResultLesson, Step } from "../../../interfaces";
import s from './PassCourse.module.scss';
import { FaCaretRight } from "react-icons/fa";
import { orderToStringName } from "../../../utils/orderToStringName";
// import { EditLessonCard } from "./EditStep/EditLesson/EditLessonCard";
import { nanoid } from "nanoid";
// import { EditLesson } from "./EditStep/EditLesson/EditLesson";
import { AddDeleteBtn } from "../EditCourse/EditStep/EditLesson/AddDeleteBtn/AddDeleteBtn";
import { typeCourse } from "../../../utils/typeCourse";
import { PassLessonCard } from "./PassLessonCard/PassLessonCard";
import { PassLesson } from "./PassLesson";
import axios from "axios";

const initialLesson: Lesson = {
    id: nanoid() as string,
    description: '',
    tasks: [],
    achivments: [],
    title: '',
    img: '',
};
const initialStep: Step = {
    id: nanoid() as string,
    order: 0,
    lessons: [],
}
const initialResults: ResultAnswer = {
    taskId: 'sa',
    userAnswers: ['naaa']
}
export const PassCourse = () => {
    const [course, setCourse] = useState<Course | null>(null)
    const [show, setShow] = useState('course');
    const [results, setResults] = useState<ResultAnswer[]>([initialResults]);
    
    const lessonToShow = useRef<Lesson>(initialLesson);
    const stepToShow = useRef<Step>(initialStep);
    // const allLessons = 
    const { id } = useParams();
    const getCourse = async (id: string) => {
        try {
            //Добавляем запрос GET на получение одного курса айди 
            // const res = await axios.get('/id')
            //Ответ если всё загрузилось { error: false, course: course }
            console.log('getCourse');
            const res = await new Promise<any>((resolve, reject) => {
                setTimeout(() => resolve({ error: false, course: coursesMocks.find(({ id }) => id === id) }), 1000)
            })
            //имитация
            if (!res.error) {
                console.log(res);
                setCourse(res.course)
            } else {

            }
        } catch (error) {
            console.log(error)
        }
    }

    function openLesson(lesson: Lesson, step: Step) {
        lessonToShow.current = lesson;
        stepToShow.current = step;

        setShow('lesson')

    }

    // function passLesson(results: ResultLesson) {
    //     console.log(results);
    // }
    function countTotalLessons() {
        let res = 0;
        for (let i = 0; i < (course as Course).steps.length; i++) {
            const step = (course as Course).steps[i];
            for (let index = 0; index < step.lessons.length; index++) {
                // const element = step[index];
                res++;
                
            }
            
        }
        return res;
    }
    async function endCourse(res: ResultAnswer[]) {
        setResults([...results, ...res]);
        setShow('course');
        //Передаем результаты прохождения курса, вернее передаем ответы
        // const res = axios.post('/get_tesults', results)
    }
    function nextCourse(res: ResultAnswer[]) {
        setResults([...results, ...res]);

        setShow('lesson');
    }
    useEffect(() => {
        getCourse(id as string);
    }, [])
    return (
        <div>
            {
                course
                    ?
                    <div>
                        {
                            show === 'course'
                            &&
                            <div>
                                <div className={s.img_course} style={{ backgroundImage: `url(${course.img})` }} />
                                <div className={s.wrapper}>
                                    <h1 className={s.title_course}>{course?.title}</h1>
                                    <div style={{ textAlign: 'left', fontSize: '30px' }}>
                                        <button className="courseBtn">для {typeCourse(course.type)}</button>
                                        <div className={s.text_progress}>Ваш прогресс</div>
                                    </div>
                                    <div>

                                        {/* <div>
    
                                </div> */}
                                        <div className={s.progress_line}>
                                            <div className={s.progress_line__achivment} style={{ left: '50%' }}>
                                                <img className={s.bronze_cubok} src="/cubok.png" />
                                                <div className={s.progress_line__achivment__divider}>|</div>
                                                <div>60%</div>
                                            </div>
                                            <div className={s.progress_line__achivment} style={{ left: '70%' }}>
                                                <img className={s.silver_cubok} src="/cubok.png" />
                                                <div className={s.progress_line__achivment__divider}>|</div>
                                                <div>80%</div>
                                            </div>
                                            <div className={s.progress_line__achivment} style={{ left: '90%' }}>
                                                <img className={s.gold_cubok} src="/cubok.png" />
                                                <div className={s.progress_line__achivment__divider}></div>
                                                <div>100%</div>
                                            </div>

                                            <div className={s.progress_line__fill_in} style={{ width: '10%' }}></div>
                                        </div>

                                    </div>
                                </div>
                                {
                                    course.steps.length > 0
                                    &&
                                    course.steps.sort((a, b) => a.order - b.order).map((step: Step) =>
                                        <div
                                            key={step.id}>
                                            <div className="textBlock">
                                                {orderToStringName(step.order)}
                                            </div>
                                            <div className={s.wrapper}>
                                                <div className={s.lessons_container}>
                                                    {
                                                        step.lessons.map((les: Lesson) =>
                                                            <PassLessonCard id={les.id} img={les.img} title={les.title} activeLesson={() => openLesson(les, step)} />
                                                        )
                                                    }
                                                </div>


                                            </div>
                                        </div>)
                                }

                                {/* <AddDeleteBtn what="курс" onDelete={() => deleteCourse()} onAdd={() => addCourse()} /> */}

                            </div>


                        }
                        {
                            show === 'lesson'
                            &&
                            
                            <PassLesson 
                                lessonProp={lessonToShow.current}
                                // passLessonProps={(results: ResultLesson) => passLesson(results)}
                                totalLessons={countTotalLessons()} 
                                endCourseProps={(res)=> endCourse(res)} 
                                nextCourseProps={(res) => nextCourse(res)} 
                                lastCourse={false}   
                             />
                        }
                    </div>
                    :
                    "Курс не прогрузился, или не найден"
            }



        </div>
    )
}