export interface IOneTest {
    originWord: string;
    yourAnswer: string;
    correctAnswer: string;
    id: string;
}

export interface IGeneralTest {
    date: string;
    allWordsTest: IOneTest[];
    id: string;
}