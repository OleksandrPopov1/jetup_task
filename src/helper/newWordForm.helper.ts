import {v4 as uuidv4} from "uuid";

import {ICoupleWords} from "../interfaces";
import {AppDispatch, dictionaryAction} from "../redux";

const addWordFromForm = (data: ICoupleWords, dispatch: AppDispatch): void => {
    data.ukraineWord = data.ukraineWord.toLowerCase();
    data.englishWord = data.englishWord.toLowerCase();
    data.id = uuidv4();

    const localStorageArray: ICoupleWords[] = JSON.parse(localStorage.getItem('dictionary') ?? '{}');
    localStorageArray.push(data);
    localStorage.setItem('dictionary', JSON.stringify(localStorageArray));
    dispatch(dictionaryAction.addWord(data));
};

const checkDuplication = (data: ICoupleWords): boolean => {
    const dictionary: ICoupleWords[] = JSON.parse(localStorage.getItem('dictionary') ?? '{}');
    const find: ICoupleWords | undefined = dictionary.find(value => value.englishWord === data.englishWord);
    return !!find;
}

export {
    addWordFromForm,
    checkDuplication
}