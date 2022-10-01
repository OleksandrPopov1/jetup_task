import {FC} from "react";

import './HistoryOneTest.css';
import {IOneTest} from "../../interfaces";

interface IProps {
    oneTest: IOneTest;
}

const HistoryOneTest: FC<IProps> = ({oneTest}) => {
    const {originWord, yourAnswer, correctAnswer} = oneTest;
    return (
        <div className={'oneTest ' + (yourAnswer === correctAnswer ? 'good' : 'bad')}>
            <span>English word:</span> {originWord}
            <span> Your Word:</span> {yourAnswer}
            <span> Correct word:</span> {correctAnswer}
        </div>
    );
};

export {
    HistoryOneTest
};