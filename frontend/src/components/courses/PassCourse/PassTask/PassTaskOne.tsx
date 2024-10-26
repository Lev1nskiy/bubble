import { useState } from "react";
import { ResultAnswer, Task } from "../../../../interfaces"
import s from './PassTaskOne.module.scss'

interface PassTaskOneProps {
    task: Task;
    nextTask: (res: ResultAnswer) => void;
}
export const PassTaskOne = ({ task, nextTask }: PassTaskOneProps) => {
    const [result, setResult] = useState('');

    return (
        <div>

            <div
                className={s.wrapper_btn}>
                {
                    (task.answers && task.answers.length > 0)
                    &&
                    task.answers.map((a: string) =>

                        <div className={s.checkbox_item}>
                            <input type="checkbox" name="answer" checked={result === a} onChange={(e) => setResult(a)} />
                            <label>{a}</label>

                        </div>

                    )
                }
                <button
                    className={s.btn_add}
                    onClick={() => nextTask({ taskId: task.id, userAnswers: [result] })}

                >
                    следующее задание
                </button>
            </div>

        </div>
    )
}