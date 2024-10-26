import { useSelector } from "react-redux"
import { selectTheme } from "../../../store/Theme/selectors"


export const AddEmployee = () => {
    const { theme } = useSelector(selectTheme)
    return (
        <div className={theme === 'dark' ? 'form' : 'form form-light'}>
            <div className='input-wrap'>
                <label>ФИО</label>
                <input type='text' />
            </div>
            <div className='input-wrap'>
                <label>Телефон</label>
                <input type='text' />
            </div>
            <div className='input-wrap'>
                <label>Логин</label>
                <input type='text' />
            </div>
            <div className='input-wrap'>
                <label>Уровень</label>
                <input type='text' />
            </div>
            <div className='input-wrap'>
                <label>Пароль</label>
                <input type='text' />
            </div>
            <div className='input-wrap'>
                <label>Доступ</label>
                <input type='text' />
            </div>
            <div className='input-wrap'>
                <label>Должность</label>
                <input className='inp7' type='text' />
            </div>
            <button className='form-btn'>Добавить</button>
        </div>
    )
}

