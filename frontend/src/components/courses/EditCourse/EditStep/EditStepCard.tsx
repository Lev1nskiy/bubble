import { Link } from "react-router-dom"
export interface PropsCourseEditCard{
    id: string;
    title: string;
    img: string;
    // new: boolean;
}
export const EditStepCard = ({ id, title, img }: PropsCourseEditCard) => {

    return (
        <div className='course' key={id}>
            <img className='courseImg' src={img} />
            <div className='courseTitle'>
                { title }
            </div>
            <Link to={`/course/edit/${id}`} className='courseBtn'>
            {/* {
                new
                ?
                'добавить урок'
                :
                'редактировать'
            } */}
            
            </Link>
        </div>
    )
}