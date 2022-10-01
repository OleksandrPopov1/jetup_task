import {v4 as uuidv4} from 'uuid';
import React from "react";

import {IActivity, ICoupleWords, IGeneralTest, IOneTest, IPercentAnswer, ITranslateWord} from "../interfaces";
import {AppDispatch, dictionaryAction} from "../redux";

const createRandomArray = (dictionary: ICoupleWords[], dispatch: AppDispatch,): ICoupleWords[] => {
    const newArr: ICoupleWords[] = [...dictionary];
    const tenWordArr: ICoupleWords[] = [];

    for (let i = 0; i < 10; i++) {
        const randomIndex: number = Math.floor(Math.random() * newArr.length);
        const word: ICoupleWords[] = newArr.splice(randomIndex, 1);
        tenWordArr.push(word[0]);
    }

    dispatch(dictionaryAction.newRandomWords(tenWordArr));
    return tenWordArr;
}


const createTranslateArray = (
    dispatch: AppDispatch,
    index: number,
    dictionary: ICoupleWords[],
    tenWordArr: ICoupleWords[]
): void => {

    const translateArr: string[] = [tenWordArr[index].ukraineWord];

    for (let i = 0; i < 3; i++) {
        const randomIndex: number = Math.floor(Math.random() * dictionary.length);
        if (translateArr.includes(dictionary[randomIndex].ukraineWord)) {
            i--;
        } else {
            translateArr.push(dictionary[randomIndex].ukraineWord);
        }
    }

    translateArr.sort(() => Math.random() - 0.5);
    const translateWordsArray: ITranslateWord[] = [];

    for (const wordString of translateArr) {
        const word: ITranslateWord = {
            id: uuidv4(),
            word: wordString
        };
        translateWordsArray.push(word);
    }

    dispatch(dictionaryAction.newTranslateArr(translateWordsArray));
}


const changeLocalStorage = (goodAnswer: number, answersArray: IGeneralTest): void => {
    if (!localStorage.getItem('correctAnswersPercentage')) {
        const percentageAnswers: IPercentAnswer = {qtyTests: 1, goodAnswers: goodAnswer};
        localStorage.setItem('correctAnswersPercentage', JSON.stringify(percentageAnswers));
    } else {
        const percentageAnswers: IPercentAnswer = JSON.parse(localStorage.getItem('correctAnswersPercentage') ?? '');
        percentageAnswers.qtyTests++;
        percentageAnswers.goodAnswers += goodAnswer;
        localStorage.setItem('correctAnswersPercentage', JSON.stringify(percentageAnswers));
    }

    const currentActivity: IActivity[] = JSON.parse(localStorage.getItem('activity') ?? '{}');
    const currentDay: number = new Date().getDay();
    ++currentActivity[currentDay - 1].numberTests;
    localStorage.setItem('activity', JSON.stringify(currentActivity));

    const history = JSON.parse(localStorage.getItem('history') ?? '[]');
    history.unshift(answersArray);
    localStorage.setItem('history', JSON.stringify(history));
}


const createResultTest = (
    e: React.MouseEvent<HTMLButtonElement>,
    randomWords: ICoupleWords[],
    index: number,
    setGoodAnswer: React.Dispatch<React.SetStateAction<number>>,
    goodAnswer: number,
    answersArray: IGeneralTest,
    setAnswersArray: React.Dispatch<React.SetStateAction<IGeneralTest>>
): void => {

    const buttonTag = e.target as HTMLButtonElement;
    if (buttonTag.innerText === randomWords[index].ukraineWord) {
        setGoodAnswer(goodAnswer + 1);
    }

    const oneTest: IOneTest = {
        originWord: randomWords[index].englishWord,
        yourAnswer: buttonTag.innerText,
        correctAnswer: randomWords[index].ukraineWord,
        id: uuidv4()
    }

    const newAnswersArray: IGeneralTest = Object.assign(answersArray)
    newAnswersArray.allWordsTest.push(oneTest);
    setAnswersArray(newAnswersArray);
}


export {
    createRandomArray,
    createTranslateArray,
    changeLocalStorage,
    createResultTest
}