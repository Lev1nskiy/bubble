import { useEffect, useState } from "react"
import { coursesMocks } from "../../../mock";
import { CourseEditCard, PropsCourseEditCard } from "../CourseCard";
import { Course } from "../../../interfaces";
import s from './EditCourses.module.scss';
import axios from 'axios';


export const EditCourses = () => {
    const [courses, setCourses] = useState([]);
    const [recently, setRecently] = useState([]);
    const [show, setShow] = useState('null');

    const getCourses = async () => {
        try {
            //Добавляем запрос GET на получение всех курсов
            const res = await axios.get('http://localhost:5000/courses');
          
            if (res.status == 200) {
                setCourses(res.data)
                setRecently(getRecently(res.data));
            } else {
                console.log(res.data); 
            }
        } catch (error) {
            console.log(error)
        }
    }
    function getRecently(courses: Course[]) {
        const recently: any = [];
        for (let i = 0; i < courses.length; i++) {
            const el = courses[i];
            if (el.steps.length < 2) {
                recently.push(el);
            }

        }
        return recently;
    }

    const designer = courses.filter((c: Course) => c.type === 'Дизайн')
    const developer = courses.filter((c: Course) => c.type === 'Программирование')
    useEffect(() => {
        getCourses();
    },  [])
    return (
        <div>
            <div className="textBlock">
                все курсы
            </div>
            <div className={s.wrapper}>
                {
                    recently.length > 0
                    &&
                    <div>
                        <div className={s.typical_text}>
                            Недавно добавленные:
                        </div>
                        <div className={s.courses_container}>
                            {
                                recently.map((c: PropsCourseEditCard) => <CourseEditCard id={c.id} title={c.title} img={c.img} />)
                            }
                        </div>

                    </div>
                }
            </div>
            <div className={s.green_divider}>

            </div>
            <div className={s.wrapper}>

                <div className={s.block_btn}>
                    <button className="courseBtn" onClick={() => setShow('designer')}>Для дизайнеров</button>

                </div>
                {
                    show === 'designer'
                    &&
                    (designer.length > 0
                        ?
                        <div className={s.courses_container}>
                            {designer.map((c: PropsCourseEditCard) => <CourseEditCard id={c.id} title={c.title} img={c.img} />)}

                        </div>
                        :
                        'Ни один курс не добавлен')
                }
                <div className={s.block_btn}>
                    <button className="courseBtn" onClick={() => setShow('developer')}>Для разработчиков</button>

                </div>

                {
                    show === 'developer'
                    &&
                    (developer.length > 0
                        ?
                        <div className={s.courses_container}>
                            {
                                developer.map((c: PropsCourseEditCard) => <CourseEditCard id={c.id} title={c.title} img={c.img} />)

                            }
                        </div>
                        :
                        'Ни один курс не добавлен')
                }
            </div>

        </div>


    )
}