import {IActivity, ICoupleWords, IGeneralTest, IPercentAnswer} from "../interfaces";
import {AppDispatch, dictionaryAction} from "../redux";

const zeroActivity = (): IActivity[] => {
    const activity: IActivity[] = [];
    const dayWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    for (const day of dayWeek) {
        const activityDay: IActivity = {
            day: day,
            numberTests: 0,
            lastActivity: new Date().getTime()
        }
        activity.push(activityDay);
    }

    return activity;
}


const initLocalStorage = (dictionary: ICoupleWords[], historyTests: IGeneralTest[], dispatch: AppDispatch): void => {
    if (!localStorage.getItem('dictionary')) {
        localStorage.setItem('dictionary', JSON.stringify(dictionary));
    } else {
        dispatch(dictionaryAction.newDictionary(JSON.parse(localStorage.getItem('dictionary') ?? '[]')));
    }

    if (!localStorage.getItem('activity')) {
        const newActivity = zeroActivity();
        localStorage.setItem('activity', JSON.stringify(newActivity));
    } else {
        const currentActivity: IActivity[] = JSON.parse(localStorage.getItem('activity') ?? '[]');
        const currentDate: Date = new Date();

        if (currentDate.getDay() === 1 && currentDate.getTime() - currentActivity[0].lastActivity > 86400000) {
            const newActivity = zeroActivity();
            localStorage.setItem('activity', JSON.stringify(newActivity));
        }
    }

    if (!localStorage.getItem('correctAnswersPercentage')) {
        localStorage.setItem('correctAnswersPercentage', JSON.stringify({goodAnswers: 0, qtyTests: 0}));
    } else {
        const percentageAnswers: IPercentAnswer = JSON.parse(localStorage.getItem('correctAnswersPercentage') ?? '');
        if (percentageAnswers.qtyTests > 0) {
            const newPercentageAnswers: number = percentageAnswers.goodAnswers / percentageAnswers.qtyTests;
            dispatch(dictionaryAction.changeCorrectAnswers(newPercentageAnswers));
        }
    }

    if (!localStorage.getItem('history')) {
        localStorage.setItem('history', JSON.stringify(historyTests));
    } else {
        dispatch(dictionaryAction.newHistory(JSON.parse(localStorage.getItem('history') ?? '[]')));
    }
}

export {
    zeroActivity,
    initLocalStorage
}