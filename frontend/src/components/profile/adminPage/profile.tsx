import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../store/Theme/selectors';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './profile2.css';
import { AddEmployee } from './AddEmployee';
import { AddCourse } from './AddCourse';

interface UserProfile {
    login: string;
    name: string;
    surname: string;
    patronymic: string;
    progress: string;
    role: string;
}

export const AdminPage = () => {
    const { theme } = useSelector(selectTheme);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tab, setTab] = useState('employee');
    const navigate = useNavigate();

    // Состояние для хранения данных формы
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        patronymic: '',
        login: '',
        psw1: '',
        psw2: '',
        role: '',
    });

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
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        };

        fetchData();
    }, [navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.psw1 !== formData.psw2) {
            alert('Пароли не совпадают');
            return;
        }

        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.post(
                'http://localhost:5000/profile/add_user',
                {
                    name: formData.name,
                    surname: formData.surname,
                    patronymic: formData.patronymic,
                    login: formData.login,
                    password1: formData.psw1,
                    password2: formData.psw2,
                    role: formData.role,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status === 200 && response.data.message === "User successfully registered") {
                alert('Пользователь успешно добавлен');
            } else {
                alert('Ошибка при добавлении пользователя');
            }
        } catch (error) {
            console.error('Ошибка при добавлении пользователя:', error);
            alert('Произошла ошибка при добавлении пользователя');
        }
    };

    const progressPoints = userProfile ? parseInt(userProfile.progress) : 0;
    const { level, progressPercentage, currentLevelPoints } = calculateLevelAndProgress(progressPoints);

    if (isLoading) {
        return <div className="loading">Загрузка...</div>;
    }

    return (
        <div className='profileWrap'>
            <div className='profileInf'>
                <img className='profileImg' src={photoUrl || '/Rectangle 147.png'} alt='Profile' />
                <div className='textProfile'>
                    <div className='nameProfile'>
                        {userProfile ? `${userProfile.name} ${userProfile.surname} ${userProfile.patronymic}` : 'Стехем Ёмаё'}
                    </div>
                    <div className='login'>
                        <div className='it1'>Логин</div>
                        <div className='it2'>{userProfile?.login || 'net_pokazivaem@yandex.ru'}</div>
                    </div>
                    <div className='post'>
                        <div className='it1'>Должность</div>
                        <div className='it2'>{userProfile?.role || 'раздавать лещей'}</div>
                    </div>
                </div>
                <div className='employee-inf'>
                    <div className='status'>Статус: {userProfile?.role === 'admin' ? 'Администратор' : 'Сотрудник'}</div>
                </div>
            </div>
            <div className={theme === 'dark' ? 'textBlock' : 'textBlock textBlockLight'}>Управление</div>
            <div className='control-wrap'>  
                <div className='tabs'>
                    <div className={`tab ${tab === 'employee' && 'tab_select'}`} onClick={() => setTab('employee')}>Добавление сотрудника</div>
                    <div className={`tab ${tab === 'course' && 'tab_select'}`} onClick={() => setTab('course')}>Добавление курса</div>
                    <div className={`tab ${tab === 'progress' && 'tab_select'}`} onClick={() => setTab('progress')}>Прогресс сотрудников</div>
                </div>
                {
                    tab === 'employee' && (
                        <form className={theme === 'dark' ? 'form' : 'form form-light'} onSubmit={handleAddUser}>
                            <div className='input-wrap'>
                                <label style={{ color: 'black' }}>Имя:</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div className='input-wrap'>
                                <label style={{ color: 'black' }}>Фамилия:</label>
                                <input type="text" name="surname" value={formData.surname} onChange={handleInputChange} required />
                            </div>
                            <div className='input-wrap'>
                                <label style={{ color: 'black' }}>Отчество:</label>
                                <input type="text" name="patronymic" value={formData.patronymic} onChange={handleInputChange} required />
                            </div>
                            <div className='input-wrap'>
                                <label style={{ color: 'black' }}>Логин:</label>
                                <input type="text" name="login" value={formData.login} onChange={handleInputChange} required />
                            </div>
                            <div className='input-wrap'>
                                <label style={{ color: 'black' }}>Пароль:</label>
                                <input type="password" name="psw1" value={formData.psw1} onChange={handleInputChange} required />
                            </div>
                            <div className='input-wrap'>
                                <label style={{ color: 'black' }}>Повторите пароль:</label>
                                <input type="password" name="psw2" value={formData.psw2} onChange={handleInputChange} required />
                            </div>
                            <div className='input-wrap'>
                                <label style={{ color: 'black' }}>Должность:</label>
                                <input type="text" name="role" value={formData.role} onChange={handleInputChange} required />
                            </div>
                            <button type="submit" className='form-btn'>Добавить</button>
                        </form>
                    )
                }
                {
                    tab === 'course' && <AddCourse />
                }
                {
                    tab === 'progress' && <AddEmployee />
                }
            </div>
        </div>
    );
};
