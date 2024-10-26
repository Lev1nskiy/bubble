import { useState } from "react";
import { Task } from "../../../../../../interfaces";
import s from './TaskEdit.module.scss'
import { AddDeleteBtn } from "../AddDeleteBtn/AddDeleteBtn";
// import { text } from "stream/consumers";
interface TaskEditProps {
    taskPrevious: Task;
    addFullTask: (task: Task) => void;
    deleteTask: (taskId: string) => void;
}
export const TaskEdit = ({ taskPrevious, addFullTask, deleteTask }: TaskEditProps) => {
    const [type, setType] = useState(taskPrevious.type)
    const [task, setTask] = useState(taskPrevious);
    const [newAnser, setNewAnswer] = useState('');
    console.log(taskPrevious);

    function addAnswer(e: any) {
        e.preventDefault();
        // const form = e.target;
        // const formData = new FormData(form);
        // const formJSON = Object.fromEntries(formData.entries());
        // console.log(formJSON);
        let newAnswers = [];
        if (task.answers) {
            newAnswers = [...task.answers, newAnser];

        } else {
            newAnswers = [newAnser];
        }
        setTask({ ...task, answers: newAnswers });
        setNewAnswer('');


    }

    const changeAnswer = (a: string) => {
        if (task.rightAnsewrs?.includes(a)) {
            const newRAnswers = task.rightAnsewrs.filter((an: string) => an !== a);
            setTask({ ...task, rightAnsewrs: newRAnswers });

        } else {
            if (task.rightAnsewrs) {
                const newRAnswers = [...task.rightAnsewrs, a];
                setTask({ ...task, rightAnsewrs: newRAnswers });

            } else {
                const newRAnswers = [a];
                setTask({ ...task, rightAnsewrs: newRAnswers });


            }

        }
    }
    const changeAnswerForOne = (a: string) => {
        setTask({ ...task, rightAnsewrs: [a] });

    }
    const addTask = (e: any) => {
        e.preventDefault();
        // const form = e.target;
        // console.log(form);
        // const formData = new FormData(form);
        // const formJSON = Object.fromEntries(formData.entries());
        console.log(task);
        addFullTask(task);
    }
    const onDeleteEvent = (e: any) => {
        e.preventDefault();
        console.log(task.id);
        deleteTask(task.id);
    }
    return (
        <div className={s.wrapper}>
            <form>
                <h1 className={s.title_task}>Выберите тип задания:</h1>
                <div className={s.checkbox_container}>
                    <div className={s.checkbox_item}>
                        <input type="checkbox" name="one" checked={type === 'one'} onChange={() => {setType('one'); setTask({...task, type: 'one'})}} />
                        <label htmlFor='one'>Выбор одного ответа</label>
                    </div>
                    <div className={s.checkbox_item}>
                        <input type="checkbox" name="many" checked={type === 'many'} onChange={() => {setType('many'); setTask({...task, type: 'many'})}} />
                        <label htmlFor='one'>Множественный выбор</label>
                    </div>
                    <div className={s.checkbox_item}>
                        <input type="checkbox" name="open" checked={type === 'open'} onChange={() => {setType('open'); setTask({...task, type: 'open'})}} />
                        <label htmlFor='one'>Развернутый ответ</label>

                    </div>



                </div>

                <h1 className={s.title_task}>Введите текст задания:</h1>
                <textarea name="description" className={s.test_input_textarea} value={task.description} onChange={(e) => setTask({...task, description: e.target.value})} />
                {
                    type === 'one'
                        ?
                        <div>
                            <h1 className={s.title_task}>Добавьте вариант ответа и отметьте правильный:</h1>
                            {
                                (task.answers && task.answers.length > 0)
                                &&
                                task.answers.map((a: string) =>

                                    <div className={s.checkbox_item}>
                                        <input type="checkbox" name="answer" checked={task.rightAnsewrs?.includes(a)} onChange={() => changeAnswerForOne(a)} />
                                        <label>{a}</label>

                                    </div>

                                )
                            }
                            <div className={`${s.checkbox_item} ${s.checkbox_item_add}`}>
                                <input type="text" name="new_answer" className={s.test_input} value={newAnser} onChange={(e) => setNewAnswer(e.target.value)} />
                                <button
                                    // type="submit" 
                                    className={s.add}
                                    onClick={(e) => addAnswer(e)}
                                >
                                    Добавить ответ
                                </button>
                            </div>
                        </div>
                        :
                        type === 'many'
                            ?
                            <div>
                                <h1 className={s.title_task}>Добавьте вариант ответа и отметьте правильный:</h1>
                                {
                                    (task.answers && task.answers.length > 0)
                                    &&
                                    task.answers.map((a: string) =>

                                        <div className={s.checkbox_item}>
                                            <input type="checkbox" name="answer" checked={task.rightAnsewrs?.includes(a)} onChange={() => changeAnswer(a)} />
                                            <label>{a}</label>

                                        </div>

                                    )
                                }
                                <div className={`${s.checkbox_item} ${s.checkbox_item_add}`}>
                                    <input type="text" name="new_answer" className={s.test_input} value={newAnser} onChange={(e) => setNewAnswer(e.target.value)} />
                                    <button
                                        // type="submit" 
                                        className={s.add}
                                        onClick={(e) => addAnswer(e)}
                                    >
                                        Добавить ответ
                                    </button>
                                </div>
                            </div>
                            :
                            <></>

                }
                <AddDeleteBtn onAdd={(e) => addTask(e)} onDelete={(e) => onDeleteEvent(e)} what={"задание"} />
            </form>
        </div>
    )
}