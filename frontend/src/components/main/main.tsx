import { Link } from 'react-router-dom'
import { Courses } from '../courses/courses'
import { LeaderBoard } from '../leaderBoard/leaderBoard'
import './main.css'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../store/Theme/selectors'

export const Main = () => {

    const {theme} = useSelector(selectTheme)
    return (
        <div className="mainWrap">
            <div className="title">
                Здравствуйте, Райан Гослинг-Стетхем
            </div>
            <div className="main">

                <LeaderBoard />
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/leaderboard">
                    <div className={theme === 'dark' ? 'lb-table-btn' : 'lb-table-btn table-btn-light'} >
                        Посмотреть таблицу лидеров
                    </div>
                </Link>


                <Courses />
            </div>
        </div>
    )
}