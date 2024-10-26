import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/Theme/selectors';
import axios from 'axios';
import './leaderBoard.css';

interface User {
    login: string;
    name: string;
    surname: string;
    patronic: string;
    progress: number;
}

export const LeaderBoardPage = () => {
    const { theme } = useSelector(selectTheme);

    const [users, setUsers] = useState<User[]>([]);
    const [photoUrl, setPhotoUrl] = useState<string[]>([]);
    const [activeUser, setActiveUser] = useState<User | null>(null);
    const [activeUserPosition, setActiveUserPosition] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('jwtToken');
            const activeUserId = document.cookie
                .split('; ')
                .find(row => row.startsWith('user_id='))
                ?.split('=')[1];
        
            try {
                const response = await axios.post(
                    'http://localhost:5000/leaderboard',
                    {
                        active_user_id: activeUserId,
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    }
                );
        
                const data = response.data;
        
                setUsers(data.users || []);
                setPhotoUrl(data.photo_url || []);
                setActiveUser(data.active_user || null);
                setActiveUserPosition(data.active_user_position || null);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };
        fetchData();
    }, []);

    const finalUsers = [...users];

    if (activeUser && activeUserPosition && activeUserPosition > 10) {
        finalUsers.push(activeUser);
    }

    return (
        <div className='page-wrap'>
            <div className="title-page">Таблица лидеров</div>
            <div className='page-container'>
                <div className={theme === 'dark' ? 'lbWrap' : 'lbWrap lbWraplight'}>
                    {/* Логика отображения лучших 3 пользователей */}
                    <div className='lbItem'>
                        <div className='lbItem-container i1'>
                            <img className='itemImg' src={photoUrl[1]} />
                            <div className='itemName'>
                                {users[1]?.name} {users[1]?.surname} {users[1]?.patronic}
                            </div>
                            <div className='lvl'>
                                {users[1]?.progress} уровень
                            </div>
                        </div>
                        <div className='union'>
                            <img className='unionImg' src='/Union2.svg' />
                            <div className='unionNum num2'>
                                2
                            </div>
                            <div className='ellipses'>
                                <div className='ellipseLb e1'></div>
                                <div className='ellipseLb e2'></div>
                                <div className='ellipseLb e3'></div>
                            </div>
                        </div>
                    </div>

                    <div className='lbItem'>
                        <div className='lbItem-container i2'>
                            <img className='itemImg' src={photoUrl[0]} />
                            <div className='itemName'>
                                {users[0]?.name} {users[0]?.surname} {users[0]?.patronic}
                            </div>
                            <div className='lvl'>
                                {users[0]?.progress} уровень
                            </div>
                        </div>
                        <div className='union'>
                            <img className='unionImg' src='/Union1.svg' />
                            <div className='unionNum num2'>
                                1
                            </div>
                            <div className='ellipses'>
                                <div className='ellipseLb ee1'></div>
                                <div className='ellipseLb ee2'></div>
                                <div className='ellipseLb ee3'></div>
                                <div className='ellipseLb ee4'></div>
                            </div>
                        </div>
                    </div>

                    <div className='lbItem'>
                        <div className='lbItem-container i3'>
                            <img className='itemImg' src={photoUrl[2]} />
                            <div className='itemName'>
                                {users[2]?.name} {users[2]?.surname} {users[2]?.patronic}
                            </div>
                            <div className='lvl'>
                                {users[2]?.progress} уровень
                            </div>
                        </div>
                        <div className='union'>
                            <img className='unionImg' src='/Union3.svg' />
                            <div className='unionNum num2'>
                                3
                            </div>
                            <div className='ellipses'>
                                <div className='ellipseLb e4'></div>
                                <div className='ellipseLb e5'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='table'>
                    <ul className='table-header'>
                        <li>Место</li>
                        <li>ФИО</li>
                        <li>Достижения</li>
                        <li>Баллы</li>
                    </ul>
                    <ul className="table-list">
                        {finalUsers.slice(0, 10).map((user, index) => (
                            <li className="list-item" key={index}>
                                <div>{index + 1}</div>
                                <div>{user.name} {user.surname} {user.patronic}</div>
                                <div>{user.progress}</div>
                                <div>{user.progress}</div>
                            </li>
                        ))}
                        {activeUser && activeUserPosition && activeUserPosition > 10 && (
                            <li className="list-item" key={'active-user'}>
                                <div>{activeUserPosition}</div>
                                <div>{activeUser.name} {activeUser.surname} {activeUser.patronic}</div>
                                <div>{activeUser.progress}</div>
                                <div>{activeUser.progress}</div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
