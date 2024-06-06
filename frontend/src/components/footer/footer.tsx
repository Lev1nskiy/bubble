import { useSelector } from 'react-redux'
import { selectTheme } from '../../store/Theme/selectors'
import './footer.css'
import { useDispatch } from 'react-redux'
import { setDarkThemeAction, setLightThemeAction } from '../../store/Theme/actions'
import { Link } from 'react-router-dom'

export const Footer = () => {

    const { theme } = useSelector(selectTheme)

    const dispatch = useDispatch()

    const toggleDarkMode = () => {
        if (theme === 'dark') {
            dispatch(setLightThemeAction())
        } else {
            dispatch(setDarkThemeAction())
        }
    }

    return (
        <div className={theme === 'dark' ? 'footerWrap' : 'footerWrap footerWrapLight'}>

            <div className='footer'>
                <div className={theme === 'dark' ? 'logo' : 'logo logo-light'}>
                    <img className='logoImg' src='/logo.svg' />
                </div>
                <ul className="navBarFooter">
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/adminpage"><li className="footerItem">О нас</li></Link>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/"><li className="footerItem">Все курсы</li></Link>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/profile"><li className="footerItem">Личный кабинет</li></Link>
                    <li className="footerItem">Выход</li>
                </ul>
                <div className={theme === 'dark' ? 'themeBtns' : 'themeBtns themeBtnsLight'}>
                    <img className='iconTheme' src='https://cdn-icons-png.freepik.com/256/4307/4307319.png?ga=GA1.1.474256826.1688119391&semt=ais_hybrid' />
                    <label className='switch'>
                        <input type="checkbox" checked={theme === 'dark'} onChange={toggleDarkMode} />
                        <span className='slider'></span>
                    </label>
                    <img className='iconTheme' src='https://cdn-icons-png.freepik.com/256/3120/3120499.png?ga=GA1.1.474256826.1688119391&semt=ais_hybrid' />
                </div>
                <img className='footlog' src='/footlog.png'/>
            </div>
        </div>
    )

}
