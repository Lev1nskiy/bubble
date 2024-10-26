import { Link } from "react-router-dom"
import s from './PassLessonCard.module.scss';
export interface PropsPassLessonCard{
    id?: string;
    title?: string;
    img?: string;
    // newLesson: boolean;
    activeLesson: ()=>void;
}
export const PassLessonCard = ({ id, title, img, activeLesson }: PropsPassLessonCard) => {

    return (
        <div className={s.container} key={id} onClick={() => activeLesson()}>
            <img className={s.img_card} style={{backgroundImage: `url(${img ? img : '/quastion_card.png'})`}} />
            <div className='courseTitle'>
                { title }
            </div>
           
        </div>
    )
}