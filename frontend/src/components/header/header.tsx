import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/Theme/selectors';
import Cookies from 'js-cookie';

export const Header = () => {
    const { theme } = useSelector(selectTheme);
    const navigate = useNavigate();

    const activeUserId = document.cookie
        .split('; ')
        .find(row => row.startsWith('user_id='))
        ?.split('=')[1];

    const logout = () => {
        document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate('/');
        window.location.reload();
    };

    return (
        <header className="header">
            <div className={theme === 'dark' ? 'logo' : 'logo logo-light'}>
                <img className='logoImg' src='/logo.svg' />
            </div>
            <div className="navBarWrap">
                <ul className="navBar">
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">
                        <li className="navBarItem">О нас</li>
                    </Link>

                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/courses">
                        <li className="navBarItem">Все курсы</li>
                    </Link>

                    <Link
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    to={activeUserId ? (Cookies.get('user_role') === 'admin' ? "/adminpage" : "/profile") : "/login"}
                    >
                    <li className="navBarItem">Личный кабинет</li>
                    </Link>

                    {activeUserId && (
                        <li className="navBarItem" onClick={logout} style={{ cursor: 'pointer' }}>
                            Выход
                        </li>
                    )}
                </ul>
            </div>
            <div className='line'></div>
        </header>
    );
}
