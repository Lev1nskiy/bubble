import { useSelector } from 'react-redux'
import './courses.css'
import { selectTheme } from '../../store/Theme/selectors'




export const Courses = () => {

    const {theme} = useSelector(selectTheme)
    return (
        <div className='coursesWrap'>
            <div className={theme === 'dark' ? 'textBlock' : 'textBlock textBlockLight'}>
                Вам достуны следующие курсы:
            </div>
            <div className='coursesList'>
                <div className='course'>
                    <img className='courseImg' src='/lbImg/Rectangle4.svg' />
                    <div className='courseTitle'>
                        ИУЭС обязательно что-то придумает
                    </div>
                    <button className='courseBtn'>Подробнее</button>
                </div>
                <div className='course'>
                    <img className='courseImg' src='/lbImg/Rectangle5.svg' />
                    <div className='courseTitle'>
                        ИУЭС обязательно что-то придумает
                    </div>
                    <button className='courseBtn'>Подробнее</button>
                </div>
                <div className='course'>
                    <img className='courseImg' src='/lbImg/Rectangle6.svg' />
                    <div className='courseTitle'>
                        ИУЭС обязательно что-то придумает
                    </div>
                    <button className='courseBtn'>Подробнее</button>
                </div>
                <div className='course'>
                    <img className='courseImg' src='/lbImg/Rectangle7.svg' />
                    <div className='courseTitle'>
                        ИУЭС обязательно что-то придумает
                    </div>
                    <button className='courseBtn'>Подробнее</button>
                </div>
                <div className='course'>
                    <img className='courseImg' src='/lbImg/Rectangle4.svg' />
                    <div className='courseTitle'>
                        ИУЭС обязательно что-то придумает
                    </div>
                    <button className='courseBtn'>Подробнее</button>
                </div>
                <div className='course'>
                    <img className='courseImg' src='/lbImg/Rectangle5.svg' />
                    <div className='courseTitle'>
                        ИУЭС обязательно что-то придумает
                    </div>
                    <button className='courseBtn'>Подробнее</button>
                </div>
                <div className='course'>
                    <img className='courseImg' src='/lbImg/Rectangle6.svg' />
                    <div className='courseTitle'>
                        ИУЭС обязательно что-то придумает
                    </div>
                    <button className='courseBtn'>Подробнее</button>
                </div>
                <div className='course'>
                    <img className='courseImg' src='/lbImg/Rectangle7.svg' />
                    <div className='courseTitle'>
                        ИУЭС обязательно что-то придумает
                    </div>
                    <button className='courseBtn'>Подробнее</button>
                </div>
            </div>
        </div>
    )
}