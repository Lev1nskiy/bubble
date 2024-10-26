import { useSelector } from "react-redux";
import { selectTheme } from "../../../store/Theme/selectors";
import s from './addCourse.module.scss';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AddCourse = () => {
    const { theme } = useSelector(selectTheme);
    const navigate = useNavigate();
    
    const addCourse = async (e: any) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const formJSON = Object.fromEntries(formData.entries());

        try {
            const token = localStorage.getItem('jwtToken');
            
            const response = await axios.post(
                'http://localhost:5000/profile/add_courses',
                formJSON,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status === 200 && !response.data.error) {
                navigate('/edit_courses');
            } else {
                console.error('Ошибка при добавлении курса:', response.data);
            }
        } catch (error) {
            console.error('Ошибка при добавлении курса:', error);
        }
    };

    return (
        <form
            className={`${theme === 'dark' ? 'form' : 'form form-light'} ${s.wrapper_form}`}
            onSubmit={(e) => addCourse(e)}
        >
            <div className={s.form_first_part}>
                <div>
                    <label>название курса</label>
                    <input type='text' name="name" className={s.form_input} required />
                </div>
                <div>
                    <label style={{ verticalAlign: 'top' }}>тема курса</label>
                    <textarea name="theme" className={s.form_input_big} required />
                </div>
                <div>
                    <label>баллы (Points)</label>
                    <input type='number' name="points" className={s.form_input} required min="0" />
                </div>
            </div>

            <div className={s.form_second_part}>
                <img className={s.add_img} src='/course_add_img.png' alt="Изображение курса" />
                <div>Изображение курса</div>
            </div>

            <button type="submit" className='form-btn'>Добавить</button>
        </form>
    );
};
