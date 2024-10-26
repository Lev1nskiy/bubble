import { useState } from "react";
import { ResultAnswer, Task } from "../../../../interfaces"
import s from './PassTaskMany.module.scss'

interface PassTaskManyProps {
    task: Task;
    //no task to callback, RESULTS!!!!
    nextTask: (res: ResultAnswer) => void;
}
export const PassTaskMany = ({ task, nextTask }: PassTaskManyProps) => {
    const [results, setResults] = useState(['']);

    function addResult(a: string) {
        if (results.includes(a)) {
            setResults(results.filter(ra => ra !== a))
        } else {
            setResults([...results, a])
        }
    }

    return (
        <div>

            <div
                className={s.wrapper_btn}>
                {
                    (task.answers && task.answers.length > 0)
                    &&
                    task.answers.map((a: string) =>

                        <div className={s.checkbox_item}>
                            <input type="checkbox" name="answer" checked={results.includes(a)} onChange={() => addResult(a)} />

                            <label>{a}</label>

                        </div>
                    )
                }
                <button
                    className={s.btn_add}
                    onClick={() => nextTask({ taskId: task.id, userAnswers: results })}

                >
                    следующее задание
                </button>
            </div>

        </div>
    )
}