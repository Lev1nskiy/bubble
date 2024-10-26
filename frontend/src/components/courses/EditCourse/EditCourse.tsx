import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { coursesMocks } from "../../../mock";
import { Course, Lesson, Step } from "../../../interfaces";
import s from './EditCourse.module.scss';
import { FaCaretRight } from "react-icons/fa";
import { orderToStringName } from "../../../utils/orderToStringName";
import { EditLessonCard } from "./EditStep/EditLesson/EditLessonCard";
import { nanoid } from "nanoid";
import { EditLesson } from "./EditStep/EditLesson/EditLesson";
import { AddDeleteBtn } from "./EditStep/EditLesson/AddDeleteBtn/AddDeleteBtn";
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
export const EditCourse = () => {
    const [course, setCourse] = useState<Course | null>(null)
    const [show, setShow] = useState('course');
    const lessonToShow = useRef<Lesson>(initialLesson);
    const stepToShow = useRef<Step>(initialStep);
    const { id } = useParams();

    const getCourse = async (id: string) => {
        try {
            //Добавляем запрос GET на получение одного курса айди 
            const res = await axios.get(`http://localhost:5000/course/${id}`)
            console.log('res', res);
     
            if (res.status == 200) {
                console.log(res);
                setCourse(res.data)
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
    function openNewLesson(step: Step) {
        const newLesson: Lesson = {
            id: nanoid() as string,
            description: '',
            tasks: [],
            achivments: [],
            title: '',
            img: '',
        };
        lessonToShow.current = newLesson;
        stepToShow.current = step;
        // setCourse({
        //     ...course, steps: (course as Course).steps.map((step: Step) => (
        //         step.id === idStep
        //             ?
        //             { ...step, lessons: [...step.lessons, newLesson] }
        //             :
        //             step
        //     )
        //     )
        // } as Course
        // )

        setShow('lesson')

    }

    async function addNewStep() {
        let order = 0;
        let newSteps: Step[] = [{ id: (nanoid().toString() as string), order, lessons: [] }];
        if (course?.steps) {
            console.log('hui hui')
            console.log(course?.steps)
            order = (course as Course).steps.length > 0 ? (course as Course).steps.length + 1 : 0;
            newSteps = [...(course as Course).steps, ({ id: (nanoid().toString() as string), order, lessons: [] })];

        }
        setCourse(({ ...course, steps: newSteps } as Course))
        // setCourse({...course, steps: course?.steps.push({id: nanoid(), order: course?.steps.length, lessons: []})})
    }
    function deleteLessing(id: string) {
        const newLessons = stepToShow.current.lessons.filter((les: Lesson) => les.id !== lessonToShow.current.id);
        stepToShow.current = { ...stepToShow.current, lessons: newLessons };
        const newSteps: Step[] = (course as Course).steps.filter((s: Step) => s.id !== stepToShow.current.id);
        newSteps.push(stepToShow.current);
        // .sort((a: Step, b: Step) => );
        // newSteps.push();
        console.log(newSteps);
        setCourse({ ...course, steps: newSteps } as unknown as Course);
        setShow('course')
        console.log(course);
    }
    function addLesson(lesson: Lesson) {
        if (stepToShow.current.lessons.map(l => l.id).includes(lesson.id)) {
            const newLessons = stepToShow.current.lessons.map((le: Lesson) => le.id === lesson.id ? le = lesson : le);
            const newSteps: Step[] = (course as Course).steps.map((s: Step) => s.id === stepToShow.current.id ? s = { ...s, lessons: newLessons } : s);
            setCourse({ ...course, steps: newSteps } as Course);
        } else {
            const newLessons = [...stepToShow.current.lessons, lesson];
            const newSteps: Step[] = (course as Course).steps.map((s: Step) => s.id === stepToShow.current.id ? s = { ...s, lessons: newLessons } : s);
            setCourse({ ...course, steps: newSteps } as Course);
        }
        setShow('course')
    }
    function addCourse() {
        //Добавляем запрос POST на соранение курса
        // const res = await axios.post('/id', course)
        //Ответ если всё загрузилось { error: false, course: course }
        console.log('Add course', course)
    }
    function deleteCourse() {
        //Добавляем запрос POST на удаление курса айди, думаю можно просто по айди удалить 
        // const res = await axios.post('/id', course.id)
        //Ответ если всё загрузилось { error: false, course: course }
        console.log('Delete course', course)
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
                                <div className={s.img_course} style={{ backgroundImage: `url(${course.img || '/mocks/4.png'})` }} />
                                <div className={s.wrapper}>
                                    <h1 className={s.title_course}>{course?.title}</h1>
                                    <button className="courseBtn">Назначить спцеиальность курса <FaCaretRight /></button>
                                    <div>
                                        <div>Ваш прогресс</div>
                                        {/* <div>
    
                                </div> */}
                                        <div className={s.progress_line}>
                                            <div className={s.progress_line__achivment} style={{ left: '50%' }}>
                                                <img src="/question_logo.png" />
                                                <div className={s.progress_line__achivment__divider}>|</div>
                                                <div>60%</div>
                                            </div>
                                            <div className={s.progress_line__achivment} style={{ left: '70%' }}>
                                                <img src="/question_logo.png" />
                                                <div className={s.progress_line__achivment__divider}>|</div>
                                                <div>80%</div>
                                            </div>
                                            <div className={s.progress_line__achivment} style={{ left: '90%' }}>
                                                <img src="/question_logo.png" />
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
                                                            <EditLessonCard id={les.id} img={les.img} title={les.title} newLesson={false} activeLesson={() => openLesson(les, step)} />
                                                        )
                                                    }
                                                    <EditLessonCard newLesson={true} activeLesson={() => openNewLesson(step)} />
                                                </div>


                                            </div>
                                        </div>)
                                }
                                <div className="textBlockGrey"
                                    style={{ marginTop: '110px' }}
                                    onClick={() => addNewStep()}
                                >
                                    добавть шаг +
                                </div>
                                <AddDeleteBtn what="курс" onDelete={() => deleteCourse()} onAdd={() => addCourse()} />

                            </div>


                        }
                        {
                            show === 'lesson'
                            &&
                            <EditLesson lessonProp={lessonToShow.current} addLessonProps={(lesson: Lesson) => addLesson(lesson)} deleteLessonProps={(id: string) => deleteLessing(id)} />
                        }
                    </div>
                    :
                    "Курс не прогрузился, или не найден"
            }



        </div>
    )
}