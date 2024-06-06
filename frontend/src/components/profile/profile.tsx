import { useSelector } from 'react-redux'
import './profile.css'
import { selectTheme } from '../../store/Theme/selectors'
import { Link } from 'react-router-dom'

export const Profile = () => {
    const { theme } = useSelector(selectTheme)
    return (
        <div className='profileWrap'>
            <div className='profileInf'>
                <img className='profileImg' src='/lbImg/profile.svg' />
                <div className='textProfile'>
                    <div className='nameProfile'>
                    Райан Гослинг-Стетхем
                    </div>
                    <div className='login'>
                        <div className='it1'>
                            Логин
                        </div>
                        <div className='it2'>
                        ribov_prodayote@yandex.ru
                        </div>
                    </div>
                    <div className='post'>
                        <div className='it1'>
                            Должность
                        </div>
                        <div className='it2'>
                        быть солнышком
                        </div>
                    </div>
                    <div className='phone-num'>
                        <div className='it1'>
                            Телефон
                        </div>
                        <div className='it2'>
                        8 (800) 555-35-35
                        </div>
                    </div>
                    <div className='about'>
                        <div className='it1'>
                            О себе 
                        </div>
                        <div className='it2'>
                        гений, миллионер, плейбой, филантроп, а ещё спортсменка, комсомолка и просто красавица
                        </div>
                    </div>
                </div>
                <div className='employee-inf'>
                    <div className='status'>
                        Статус: сотрудник
                    </div>
                    <div className='achieves'>
                        Достижения <div>45</div>
                        <div className='achieves-icons'>
                            <img   src="/Ellipse 5.svg" alt="" className="icon-achieves" />
                            <img   src="/Ellipse 6.png" alt="" className="icon-achieves" />
                            <img   src="/Ellipse 7.png" alt="" className="icon-achieves" />
                            <img   src="/Ellipse 8.png" alt="" className="icon-achieves" />
                            <div className="dots">
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                            </div>
                        </div>
                    </div>
                    <div className='lvl-emp'>
                        2 уровень
                        <div style={{borderRadius: '30px', background: 'rgba(0, 156, 79, 1)', width: '50%', margin: '10px auto 0 auto'}}>
                            50/100
                        </div>
                    </div>
                </div>
                {/* <div className='rack'>
                    <img className='profileImg imgRack' src='/lbImg/rack.svg' />
                    <div className='ellipse e1'></div>
                    <div className='ellipse e2'></div>
                    <div className='ellipse e3'></div>
                    <div className='ellipse e4'></div>
                    <div className='ellipse e5'></div>
                </div> */}
            </div>
            <div className={theme === 'dark' ? 'map' : 'map map-light'}>
                <img className='mapImg' src='/lbImg/Group.svg' />
            </div>
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/leaderboard">
            <div className={theme === 'dark' ? 'lb-table-btn' : 'lb-table-btn table-btn-light'} >
                        Посмотреть таблицу лидеров
                    </div>
                </Link>
            <div className='coursesWrap'>
                <div className={theme === 'dark' ? 'textBlock' : 'textBlock textBlockLight'}>
                    Мои курсы
                </div>
                <div className='coursesList'>
                    <div className='course'>
                        <img className='courseImg' src='/lbImg/Rectangle4.svg' />
                        <div className='courseTitle'>
                            Курсы диджитал дизайна
                            <div className='completion'>
                                Cтепень прохождения 0/100%
                            </div>
                        </div>
                        <button className='courseBtn'>Продолжить</button>
                    </div>
                    <div className='course'>
                        <img className='courseImg' src='/lbImg/Rectangle5.svg' />
                        <div className='courseTitle'>
                            Курсы как жить эту жизнь
                            <div className='completion'>
                                Cтепень прохождения 50/100%
                            </div>
                        </div>
                        <button className='courseBtn'>Приступить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}