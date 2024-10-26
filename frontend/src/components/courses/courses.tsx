import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './courses.css';
import { selectTheme } from '../../store/Theme/selectors';
import axios from 'axios';

export const Courses: React.FC = () => {
    const { theme } = useSelector(selectTheme);
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        const activeUserId = document.cookie
            .split('; ')
            .find(row => row.startsWith('user_id='))
            ?.split('=')[1];

        if (activeUserId) {
            axios.get(`http://localhost:5000/user_courses`, {
                params: { user_id: activeUserId }
            })
            .then(response => {
                const fetchedCourses = response.data.map((course: any) => ({
                    id: String(course.id),
                    title: course.name,
                    img: `/lbImg/Rectangle${course.id % 8 + 4}.svg`,
                    description: `Курс по теме: ${course.theme}, ${course.points} баллов.`, // Описание курса
                }));
                setCourses(fetchedCourses);
            })
            .catch(error => {
                console.error('Ошибка при получении курсов:', error);
            });
        }
    }, []);

    const handleCourseClick = (id: string) => {
        window.location.href = `pass/course/${id}`;
    };

    const hasCourses = courses.length > 0;

    return (
        <div className='coursesWrap'>
            <div className={theme === 'dark' ? 'textBlock' : 'textBlock textBlockLight'}>
               { hasCourses ? 'Все предложенные вам курсы:' : 'Пока для вас нет предложенных курсов'}
            </div>
            <div className='coursesList'>
                {courses.map((course) => (
                    <div className='course' key={course.id} onClick={() => handleCourseClick(course.id)}>
                        <img className='courseImg' src={course.img} alt={course.title} />
                        <h3 className='courseTitle'>{course.title}</h3>
                        <button className='courseBtn'>Подробнее</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
