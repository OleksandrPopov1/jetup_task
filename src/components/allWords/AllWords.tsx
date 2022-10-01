import {FC, useEffect} from "react";
import {PieChart} from 'react-minimal-pie-chart';

import './Allwords.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {OneWord} from "../oneWord/OneWord";
import {IPieChartData} from "../../interfaces";
import {ActivityGraph} from "../activityGraph/ActivityGraph";
import {initLocalStorage} from "../../helper";
import {HistoryMenu} from "../historyMenu/HistoryMenu";

const AllWords: FC = () => {

    const {dictionary, correctAnswers, historyTests} = useAppSelector(state => state.dictionary);
    const dispatch = useAppDispatch();

    useEffect(() => {
        initLocalStorage(dictionary, historyTests, dispatch);
    }, [dispatch]);

    const correctAnswersPercentage: IPieChartData[] = [
        {title: 'Bad Answers', value: 100 - correctAnswers * 10, color: '#ff0000'},
        {title: 'Good Answers', value: correctAnswers * 10, color: '#53ff00'}
    ];

    return (
        <div className={'homeBlock'}>
            <div>
                <h2>Your Dictionary</h2>
                <div className={'allWords'}>
                    {dictionary.map(word => <OneWord key={word.id} word={word}/>)}
                </div>
                <div className={'historyMenu'}>
                    <HistoryMenu/>
                </div>
            </div>

            <div className={'statistics'}>
                <h2>Your Activity</h2>
                <div className={'graph'}>
                    <p>Quantity tests</p>
                    <ActivityGraph/>
                </div>
                <h2 className={'goodAnswersHeader'}>Percentage of answers</h2>
                <div className={'goodAnswers'}>
                    <PieChart
                        data={correctAnswersPercentage}
                        radius={50}
                        animate={true}
                        label={({dataEntry}) => `${Math.round(dataEntry.value)}%`}
                    />
                </div>
            </div>
        </div>
    );
};

export {
    AllWords
};