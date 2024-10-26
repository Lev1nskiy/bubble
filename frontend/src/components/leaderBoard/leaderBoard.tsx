import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { themeReducer } from '../../store/Theme/reducer'
import { selectTheme } from '../../store/Theme/selectors'
import axios from 'axios';
import './leaderBoard.css'

interface User {
    login: string;
    name: string;
    surname: string;
    patronic: string;
    progress: number;
}

export const LeaderBoard = () => {
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
        <div className={theme === 'dark' ? 'lbWrap' : 'lbWrap lbWraplight'}>
            <div className='lbItem'>
                        <div className='lbItem-container i1'>
                            <img className='itemImg' src={photoUrl[1]} />
                            <div className='itemName'>
                                {users[1]?.name} {users[1]?.surname} {users[1]?.patronic}
                            </div>
                            <div className='lvl'>
                                {users[1]?.progress} {users[1]?.progress %10 === 1 ? 'балл' : (users[1]?.progress % 10 >= 2 && users[1]?.progress % 10 <= 4 ? 'балла' : 'баллов')}
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
                                {users[0]?.progress} {users[0]?.progress %10 === 1 ? 'балл' : (users[0]?.progress % 10 >= 2 && users[0]?.progress % 10 <= 4 ? 'балла' : 'баллов')}
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
                                {users[2]?.progress} {users[2]?.progress %10 === 1 ? 'балл' : (users[2]?.progress % 10 >= 2 && users[2]?.progress % 10 <= 4 ? 'балла' : 'баллов')}
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
    )
}