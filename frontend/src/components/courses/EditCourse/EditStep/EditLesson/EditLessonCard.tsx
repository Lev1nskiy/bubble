import { Link } from "react-router-dom"
import s from './EditLessonCard.module.scss';
export interface PropsLessonEditCard{
    id?: string;
    title?: string;
    img?: string;
    newLesson: boolean;
    activeLesson: ()=>void;
}
export const EditLessonCard = ({ id, title, img, newLesson, activeLesson }: PropsLessonEditCard) => {

    return (
        <div className={s.container} key={id}>
            <img className={s.img_card} style={{backgroundImage: `url(${newLesson ? '/quastion_card.png' : img})`}} />
            <div className='courseTitle'>
                { title }
            </div>
            <button onClick={() => activeLesson()} className='courseBtn'>
            {
                newLesson
                ?
                'добавить урок'
                :
                'редактировать'
            }
            
            </button>
        </div>
    )
}