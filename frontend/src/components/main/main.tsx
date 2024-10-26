import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Courses } from '../courses/courses';
import { LeaderBoard } from '../leaderBoard/leaderBoard';
import './main.css';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/Theme/selectors';
import axios from 'axios';

interface UserProfile {
    name: string;
    surname: string;
}

export const Main = () => {
    const { theme } = useSelector(selectTheme);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [activeUserId, setActiveUserId] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('jwtToken');
            const userId = document.cookie
                .split('; ')
                .find(row => row.startsWith('user_id='))
                ?.split('=')[1];

            setActiveUserId(userId || null);

            try {
                if (!userId) {
                    console.warn('user_id отсутствует. Компонент Courses не будет отображен.');
                    return;
                }

                const response = await axios.post(
                    'http://localhost:5000/',
                    {
                        user_id: userId,
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
                    console.warn('Данные пользователя отсутствуют в ответе.');
                    return;
                }

                setUserProfile(data.user_data);
                setPhotoUrl(data.photo_url || null);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div className="mainWrap">
            <div className="title">
                {userProfile ? `Здравствуйте, ${userProfile.name} ${userProfile.surname}` : 'Здравствуйте'}
            </div>
            <div className="main">
                <LeaderBoard />
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/leaderboard">
                    <div className={theme === 'dark' ? 'lb-table-btn' : 'lb-table-btn table-btn-light'}>
                        Посмотреть таблицу лидеров
                    </div>
                </Link>
                {activeUserId ? <Courses /> : <p></p>}
            </div>
        </div>
    );
}
