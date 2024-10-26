import { useState } from "react";
import { ResultAnswer, Task } from "../../../../interfaces"
import s from './PassTaskOpen.module.scss'

interface PassTaskOpenProps {
    task: Task;
    nextTask: (res: ResultAnswer) => void;
}
export const PassTaskOpen = ({ task, nextTask }: PassTaskOpenProps) => {
    const [result, setResult] = useState('');
    return (
        <div
            className={s.wrapper_btn}>
            <div>
                <textarea name="description" className={s.test_input_textarea} value={result} onChange={(e) => setResult(e.target.value)} />

            </div>
            <button
                className={s.btn_add}
                onClick={() => nextTask({taskId: task.id, userAnswers: [result]})}
            >
                следующие задание
            </button>
        </div>
    )
}