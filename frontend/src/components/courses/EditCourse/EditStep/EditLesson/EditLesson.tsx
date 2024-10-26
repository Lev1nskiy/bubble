import { useRef, useState } from "react";
import { Lesson, Task } from "../../../../../interfaces"
import { AddDeleteBtn } from "./AddDeleteBtn/AddDeleteBtn";
import s from './EditLesson.module.scss';
import { TaskEdit } from "./TaskEdit/TaskEdit";
import { nanoid } from "nanoid";


interface EditLessonProps {
    lessonProp: Lesson;
    deleteLessonProps: (id: string) => void;
    addLessonProps: (les: Lesson) => void;
}
const taskInitialState = {
    id: '',
    //один ответ, много ответов, открытый вопрос
    type: "one" as const,
    description: '',
    // answers - только для one и many
    // answers?: ; 
}
export const EditLesson = ({ lessonProp, deleteLessonProps, addLessonProps }: EditLessonProps) => {
    const [taskEdit, setTaskEdit] = useState(false);
    const [lesson, setLesson] = useState(lessonProp);
    const task = useRef<Task>(taskInitialState);
    const { tasks } = lesson;
    console.log(lesson);
    console.log(tasks);
    function deleteLesson(id: string, e: any) {
        e.preventDefault();
        deleteLessonProps(id);
    }
    function addLesson(id: string, e: any) {
        e.preventDefault();
        addLessonProps(lesson)
    }
    function addTask(taskToAdd?: Task) {
        if (taskToAdd) {
            task.current = taskToAdd;

        } else {
            task.current = {...taskInitialState, id: nanoid() };

        }
        setTaskEdit(true);
    }
    function addFullTask(taskNew: Task) {
        if (lesson.tasks.map(t => t.id).includes(taskNew.id)) {
            const newTasks = lesson.tasks.map(t => t.id === taskNew.id ? t = taskNew : t);
            setLesson({ ...lesson, tasks: newTasks });
            setTaskEdit(false);
        }else{
            const newTasks = [...lesson.tasks, taskNew];
            setLesson({ ...lesson, tasks: newTasks });
            setTaskEdit(false);
        }
        
    }
    function deleteTask(taskId: string) {
        const newTasks = lesson.tasks.filter((t: Task) => t.id !== taskId);
        setLesson({ ...lesson, tasks: newTasks });
        setTaskEdit(false);
    }
    return (
        <>
            {
                taskEdit
                    ?
                    <TaskEdit taskPrevious={task.current} addFullTask={(taskNew: Task) => addFullTask(taskNew)} deleteTask={(taskId: string) => deleteTask(taskId)} />
                    :
                    <form>
                        <div
                            className={s.img_big}
                            style={{ backgroundImage: `url(${lesson.img ?? '/lesson_no_picture.png'})` }}>

                        </div>
                        <div className={s.wrapper}>
                            <h1 style={{ color: "white" }} className={s.title_lesson}>Ввести название урока</h1>
                            <input name="title" className={s.lesson_input} value={lesson.title} onChange={(e) => setLesson({ ...lesson, title: e.target.value })} />
                            <h1 style={{ color: "white" }} className={s.title_lesson}>Ввести описание урока</h1>
                            <textarea name="description" className={s.lesson_input_textarea} value={lesson.description} onChange={(e) => setLesson({ ...lesson, description: e.target.value })} />
                            {/* <div className={s.left_container}>
                                <h2 className={s.title_lesson_sm}>Ввести награды за проходение урока:</h2>

                            </div> */}
                            <div className={s.tasks_container}>
                                {
                                    tasks.map((t, i) =>
                                        <div className={s.task_container}
                                            onClick={() => addTask(t)}>
                                            <div className={s.number_task}>
                                                {i + 1}
                                            </div>
                                            <div className={s.description_task}>
                                                {t.description.substring(0, 20)}
                                            </div>
                                        </div>)
                                }
                                <div
                                    onClick={() => addTask()}
                                    className={s.task_container}>
                                    <div className={s.number_task}>
                                        {tasks.length + 1}
                                    </div>
                                    <button className={s.btn_add}>
                                        + добавить задание
                                    </button>
                                </div>
                            </div>
                            <AddDeleteBtn what="урок" onAdd={(e: any) => addLesson(lesson.id, e)} onDelete={(e: any) => deleteLesson(lesson.id, e)} />
                        </div>


                    </form>
            }

        </>

    )
}