import {createSlice} from "@reduxjs/toolkit";

import {ICoupleWords, IGeneralTest, ITranslateWord} from "../../interfaces";

interface IState {
    dictionary: ICoupleWords[],
    randomWords: ICoupleWords[],
    randomTranslate: ITranslateWord[],
    correctAnswers: number,
    historyTests: IGeneralTest[]
}

const initialState: IState = {
    dictionary: [],
    randomWords: [],
    randomTranslate: [],
    correctAnswers: 0,
    historyTests: []
}

const dictionarySlice = createSlice({
    name: 'dictionarySlice',
    initialState,
    reducers: {
        newDictionary: (state, action) => {
            state.dictionary = action.payload;
        },
        addWord: (state, action) => {
            state.dictionary.push(action.payload);
        },
        newRandomWords: (state, action) => {
            state.randomWords = action.payload;
        },
        newTranslateArr: (state, action) => {
            state.randomTranslate = action.payload;
        },
        changeCorrectAnswers: (state, action) => {
            state.correctAnswers = action.payload;
        },
        newHistory: (state, action) => {
            state.historyTests = action.payload;
        }
    }
})

const {
    reducer: dictionaryReducer,
    actions: {
        addWord,
        newRandomWords,
        newDictionary,
        newTranslateArr,
        changeCorrectAnswers,
        newHistory
    }
} = dictionarySlice;

const dictionaryAction = {
    addWord,
    newRandomWords,
    newDictionary,
    newTranslateArr,
    changeCorrectAnswers,
    newHistory
};

export {
    dictionaryReducer,
    dictionaryAction
}