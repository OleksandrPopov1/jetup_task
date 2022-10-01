import {FC, MouseEventHandler} from "react";

interface IProps {
    word: string,
    checkWord: MouseEventHandler<HTMLButtonElement>
}

const TranslateWord: FC<IProps> = ({word, checkWord}) => {
    return (
        <button onClick={checkWord}>
            {word}
        </button>
    );
};

export {
    TranslateWord
};