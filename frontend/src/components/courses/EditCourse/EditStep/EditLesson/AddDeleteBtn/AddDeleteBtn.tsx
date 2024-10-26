import s from './AddDeleteBtn.module.scss'

interface AddDeleteBtnProps{
    what: string;
    onAdd: (e: any) => void;
    onDelete: (e: any) => void;
}

export const AddDeleteBtn = ({what, onAdd, onDelete}: AddDeleteBtnProps) => {
    return (
        <div className={s.container}>
            <button className={s.add} onClick={(e) => onAdd(e)}> добавить {what} </button>
            <button className={s.delete} onClick={(e) => onDelete(e)}> удалить {what} </button>
        </div>
    )
}