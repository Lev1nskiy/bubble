import { useSelector } from 'react-redux'
import { themeReducer } from '../../store/Theme/reducer'
import { selectTheme } from '../../store/Theme/selectors'
import './leaderBoard.css'

export const LeaderBoard = () => {

    const { theme } = useSelector(selectTheme)

    return (
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
    )
}