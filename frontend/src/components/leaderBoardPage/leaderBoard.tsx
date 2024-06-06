import { useSelector } from 'react-redux'
import { themeReducer } from '../../store/Theme/reducer'
import { selectTheme } from '../../store/Theme/selectors'
import './leaderBoard.css'


const arr = [
    { number: 1, name: "Ах-Ты Наш Гоблин Младший", quantity: 20, points: 712 },
    { number: 2, name: "Аслан Уфимыч Фторник", quantity: 18, points: 612 },
    { number: 3, name: "Мазунина Инна Ивановна", quantity: 20, points: 600 },
    { number: 4, name: "Привет Андрей Где", quantity: 15, points: 550 },
    { number: 5, name: "Липси Ха Гимми", quantity: 12, points: 545 },
    { number: 6, name: "Помидоры Помидоры Помидоры", quantity: 12, points: 530 },
    { number: 7, name: "Дай Мне Вдохновения", quantity: 11, points: 438 },
    { number: 8, name: "Надеюсь Иуэс Придумает", quantity: 10, points: 400 },
    { number: 9, name: "Зубенко Михаил Петрович", quantity: 12, points: 320 },
    { number: 10, name: "Витас Стучится ВОкно", quantity: 10, points: 300 },
    { number: 40, name: "Райан Гослинг-Стетхем", quantity: 3, points: 120 },
];
export const LeaderBoardPage = () => {

    const { theme } = useSelector(selectTheme)

    return (
        <div className='page-wrap'>
            <div className="title-page">
                Таблица лидеров
            </div>
            <div className='page-container'>
                <div className={theme === 'dark' ? 'lbWrap' : 'lbWrap lbWraplight'}>
                    <div className='lbItem'>
                        <div className='lbItem-container i1'>
                            <img className='itemImg' src='/lbImg/Rectangle1.svg' />
                            <div className='itemName'>
                                Аслан Уфимыч Фторник
                            </div>
                            <div className='lvl'>
                                20 уровень
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
                    <div className='lbItem '>
                        <div className='lbItem-container i2'>
                            <img className='itemImg' src='/lbImg/Rectangle2.svg' />
                            <div className='itemName'>
                                Ах-Ты Наш Гоблин Младший
                            </div>
                            <div className='lvl'>
                                30 уровень
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
                                {/* <div className='ellipseLb ee5'></div> */}
                            </div>
                        </div>

                    </div>
                    <div className='lbItem '>
                        <div className='lbItem-container i3'>
                            <img className='itemImg' src='/lbImg/Rectangle3.svg' />
                            <div className='itemName'>
                                Мазунина Инна Ивановна
                            </div>
                            <div className='lvl'>
                                15 уровень
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
                        {arr.map((item) =>(
                            <li className='list-item' key={item.number}>
                                <div>
                                    {item.number}
                                </div>
                                <div>
                                    {item.name}
                                </div>
                                <div>
                                    {item.quantity}
                                </div>
                                <div>
                                    {item.points}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>

    )
}