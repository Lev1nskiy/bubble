import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/Theme/selectors';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './profile.css';

interface UserProfile {
    login: string;
    name: string;
    surname: string;
    patronymic: string;
    progress: string;
    role: string;
}

export const Profile = () => {
    const { theme } = useSelector(selectTheme);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const navigate = useNavigate();

    const calculateLevelAndProgress = (points: number) => {
        const level = Math.floor(points / 100) + 1;
        const currentLevelPoints = points % 100;
        const progressPercentage = (currentLevelPoints / 100) * 100;

        return {
            level,
            progressPercentage,
            currentLevelPoints,
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('jwtToken');
            const activeUserId = document.cookie
                .split('; ')
                .find(row => row.startsWith('user_id='))
                ?.split('=')[1];
        
            if (!activeUserId) {
                navigate('/404');
                return;
            }

            try {
                const response = await axios.post(
                    'http://localhost:5000/profile',
                    {
                        user_id: activeUserId,
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    }
                );

                const data = response.data;
                if (!data.user_data) {
                    navigate('/404');
                    return;
                }

                setUserProfile(data.user_data);
                setPhotoUrl(data.photo_url || null);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                navigate('/404');
            }
        };

        fetchData();
    }, [navigate]);

    const progressPoints = userProfile ? parseInt(userProfile.progress) : 0;
    const { level, progressPercentage, currentLevelPoints } = calculateLevelAndProgress(progressPoints);

    return (
        <div className='profileWrap'>
            <div className='profileInf'>
                <img className='profileImg' src={photoUrl || '/lbImg/profile.svg'} alt='Profile' />
                <div className='textProfile'>
                    <div className='nameProfile'>
                        {userProfile ? `${userProfile.name} ${userProfile.surname} ${userProfile.patronymic}` : 'Имя пользователя'}
                    </div>
                    <div className='login'>
                        <div className='it1'>
                            Логин
                        </div>
                        <div className='it2'>
                            {userProfile?.login || 'Неизвестно'}
                        </div>
                    </div>
                    <div className='post'>
                        <div className='it1'>
                            Должность
                        </div>
                        <div className='it2'>
                            {userProfile?.role || 'Не указана'}
                        </div>
                    </div>
                </div>
                <div className='employee-inf'>
                    <div className='status'>
                        Статус: {userProfile?.role === 'admin' ? 'Администратор' : 'Сотрудник'}
                    </div>
                    <div className='achieves'>
                        Достижения <div>45</div>
                        <div className='achieves-icons'>
                            <img src="/Ellipse 5.svg" alt="" className="icon-achieves" />
                            <img src="/Ellipse 6.png" alt="" className="icon-achieves" />
                            <img src="/Ellipse 7.png" alt="" className="icon-achieves" />
                            <img src="/Ellipse 8.png" alt="" className="icon-achieves" />
                            <div className="dots">
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                            </div>
                        </div>
                    </div>
                    <div className='lvl-emp'>
                        {level} уровень
                        <div>
                            {currentLevelPoints}/100
                        </div>
                    </div>
                </div>
            </div>
            <div className='coursesWrap'>
                <div className={theme === 'dark' ? 'textBlock' : 'textBlock textBlockLight'}>
                    Мои курсы
                </div>
                <div className='coursesList'>
                    <div className='course'>
                        <img className='courseImg' src='/lbImg/Rectangle4.svg' alt='Course' />
                        <div className='courseTitle'>
                            Курсы диджитал дизайна
                            <div className='completion'>
                                Cтепень прохождения 0/100%
                            </div>
                        </div>
                        <button className='courseBtn'>Продолжить</button>
                    </div>
                    <div className='course'>
                        <img className='courseImg' src='/lbImg/Rectangle5.svg' alt='Course' />
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
    );
}
