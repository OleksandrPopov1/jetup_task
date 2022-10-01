import {FC} from "react";

import './OneWord.css';
import {ICoupleWords} from "../../interfaces";

interface IProps {
    word: ICoupleWords
}

const OneWord: FC<IProps> = ({word}) => {
    return (
        <div className={'oneWord'}>
            {word.englishWord} - {word.ukraineWord}
        </div>
    );
};

export {
    OneWord
};