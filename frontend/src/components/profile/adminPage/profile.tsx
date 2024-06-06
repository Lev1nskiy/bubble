import { useSelector } from 'react-redux'
import './profile2.css'
import { selectTheme } from '../../../store/Theme/selectors'
import { Link } from 'react-router-dom'

export const AdminPage = () => {
    const { theme } = useSelector(selectTheme)
    return (
        <div className='profileWrap'>
            <div className='profileInf'>
                <img className='profileImg' src='/Rectangle 147.png' />
                <div className='textProfile'>
                    <div className='nameProfile'>
                        Стехем Ёмаё
                    </div>
                    <div className='login'>
                        <div className='it1'>
                            Логин
                        </div>
                        <div className='it2'>
                            net_pokazivaem@yandex.ru
                        </div>
                    </div>
                    <div className='post'>
                        <div className='it1'>
                            Должность
                        </div>
                        <div className='it2'>
                            раздавать лещей
                        </div>
                    </div>
                    <div className='phone-num'>
                        <div className='it1'>
                            Телефон
                        </div>
                        <div className='it2'>
                            +7 989 758 84 84
                        </div>
                    </div>
                    <div className='about'>
                        <div className='it1'>
                            О себе
                        </div>
                        <div className='it2'>
                            Волк не тот кто волк, а тот кто волк.
                            Когда меня рожали... собственно тогда я и родился.
                        </div>
                    </div>
                </div>
                <div className='employee-inf'>
                    <div className='status' style={{ border: 'none' }}>
                        Статус: администратор
                    </div>
                </div>
            </div>
            <div className={theme === 'dark' ? 'textBlock' : 'textBlock textBlockLight'}>
                Управление
            </div>
            <div className='control-wrap'>  
                <div className='tabs'>
                    <div className="tab">Добавление сотрудника</div>
                    <div className="tab">Добавление курса</div>
                    <div className="tab">Прогресс сотрудников</div>
                </div>
                <div className={theme === 'dark' ? 'form' : 'form form-light'}>
                    <div className='input-wrap'>
                        <label>ФИО</label>
                        <input type='text'/>
                    </div>
                    <div className='input-wrap'>
                        <label>Телефон</label>
                        <input type='text'/>
                    </div>
                    <div className='input-wrap'>
                        <label>Логин</label>
                        <input type='text'/>
                    </div>
                    <div className='input-wrap'>
                        <label>Уровень</label>
                        <input type='text'/>
                    </div>
                    <div className='input-wrap'>
                        <label>Пароль</label>
                        <input type='text'/>
                    </div>
                    <div className='input-wrap'>
                        <label>Доступ</label>
                        <input type='text'/>
                    </div>
                    <div className='input-wrap'>
                        <label>Должность</label>
                        <input className='inp7' type='text'/>
                    </div>
                    <button className='form-btn'>Добавить</button>
                </div>
            </div>
        </div>
    )
}