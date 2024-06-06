import { Link } from 'react-router-dom'
import './header.css'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../store/Theme/selectors'

export const Header = () =>{

    const {theme} = useSelector(selectTheme)
    return(
        <header className="header">
            <div className={theme === 'dark' ? 'logo' : 'logo logo-light'}>
                <img className='logoImg' src='/logo.svg'/>
            </div>
            <div className="navBarWrap">    
                <ul className="navBar">
                    {/* <li className="navBarItem">О нас</li> */}
                    {/* <li className="navBarItem">Все курсы</li> */}
                    <Link style={{textDecoration: 'none', color: 'inherit'}} to="/adminpage"><li className="navBarItem">О нас</li></Link>

                    <Link style={{textDecoration: 'none', color: 'inherit'}} to="/"><li className="navBarItem">Все курсы</li></Link>

                    <Link style={{textDecoration: 'none', color: 'inherit'}} to="/profile"><li className="navBarItem">Личный кабинет</li></Link>
                    <li className="navBarItem">Выход</li>
                </ul>
            </div>
            <div className='line'></div>
        </header>
    )
}