import {FC} from "react";
import {LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts';

import {IActivity, IDataActivityGraph} from "../../interfaces";

const ActivityGraph: FC = () => {

    const showActivity = (): IDataActivityGraph[] => {

        const data: IDataActivityGraph[] = [];
        const activity: IActivity[] = JSON.parse(localStorage.getItem('activity') ?? '[]');
        for (const day of activity) {
            const valueActivityGraph: IDataActivityGraph = {
                name: day.day,
                uv: day.numberTests,
                pv: 2400,
                amt: 2400
            }
            data.push(valueActivityGraph);
        }
        return data;
    }

    const data = showActivity();

    return (
        <LineChart width={550} height={200} data={data} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
            <Line type="monotone" dataKey="uv" stroke="white"/>
            <CartesianGrid stroke="none" strokeDasharray="5 5"/>
            <XAxis dataKey="name" stroke={'white'}/>
            <YAxis stroke={'white'}/>
        </LineChart>
    );
};

export {
    ActivityGraph
};