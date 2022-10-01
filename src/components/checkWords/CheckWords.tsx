import React, {FC, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {v4 as uuidv4} from 'uuid';

import './CheckWords.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {changeLocalStorage, createRandomArray, createResultTest, createTranslateArray} from "../../helper";
import {ICoupleWords, IGeneralTest} from "../../interfaces";
import {TranslateWord} from "../translateWord/TranslateWord";
import {dictionaryAction} from "../../redux";

const CheckWords: FC = () => {

    const {dictionary, randomWords, randomTranslate} = useAppSelector(state => state.dictionary);
    const [index, setIndex] = useState<number>(0);
    const [goodAnswer, setGoodAnswer] = useState<number>(0);
    const [answersArray, setAnswersArray] = useState<IGeneralTest>({allWordsTest: [], date: '', id: ''});

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (dictionary.length < 10) {
            alert('You need to have at least 10 words in the dictionary');
            navigate('/home');
        } else {
            const tenWordArray: ICoupleWords[] = createRandomArray(dictionary, dispatch);
            createTranslateArray(dispatch, index, dictionary, tenWordArray);
        }
    }, [dispatch, dictionary]);

    const checkWord = (e: React.MouseEvent<HTMLButtonElement>): void => {

        createResultTest(e, randomWords, index, setGoodAnswer, goodAnswer, answersArray, setAnswersArray);

        if (index < 9) {
            createTranslateArray(dispatch, index + 1, dictionary, randomWords);
            setIndex(index + 1);
        } else {
            const options: Intl.DateTimeFormatOptions = {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: false
            };

            answersArray.date = new Date().toLocaleDateString('en-US', options);
            answersArray.id = uuidv4();
            dispatch(dictionaryAction.newRandomWords([]));

            //record the last answer in localStorage
            const buttonTag = e.target as HTMLButtonElement;
            let lastGoodAnswer = goodAnswer;
            if (buttonTag.innerText === randomWords[index].ukraineWord) {
                ++lastGoodAnswer;
            }

            changeLocalStorage(lastGoodAnswer, answersArray);
        }
    }


    const again = (): void => {
        const tenWordArray: ICoupleWords[] = createRandomArray(dictionary, dispatch);
        setIndex(0);
        createTranslateArray(dispatch, 0, dictionary, tenWordArray);
        setGoodAnswer(0);
        setAnswersArray({allWordsTest: [], date: '', id: ''});
    }

    return (
        <div className={'checkWords'}>
            <h2>Choose the correct translation</h2>
            <div className={'englishWord'}>{randomWords[0] && randomWords[index].englishWord}</div>
            <div className={'buttonsWords'}>
                {randomWords[0] && randomTranslate.map(word => <TranslateWord
                    key={word.id}
                    word={word.word}
                    checkWord={checkWord}
                />)}
            </div>
            {!randomWords[0] &&
                <div className={'result'}>
                    <h2>{`You scored ${goodAnswer * 10}%`}</h2>
                    <button onClick={again}>Try again</button>
                </div>
            }
        </div>
    );
};

export {
    CheckWords
};