import { Link } from "react-router-dom";
import s from './CourseCard.module.scss'
export interface PropsCourseEditCard{
    id: string;
    title: string;
    img: string;
}
export const CourseEditCard = ({ id, title, img }: PropsCourseEditCard) => {

    return (
        <div className={s.container} key={id}>
            <img className={s.img_card} src={img || '/mocks/2.png'} />
            <div className='courseTitle'>
                { title }
            </div>
            <Link to={`/course/edit/${id}`} style={{textDecoration: 'none', marginTop: '25px', display: 'inline-block'}} className='courseBtn'>Редактировать</Link>
        </div>
    )
}