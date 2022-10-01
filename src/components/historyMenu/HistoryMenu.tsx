import {FC} from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';
import {HistoryGeneralTest} from "../historyGeneralTest/HistoryGeneralTest";
import {useAppSelector} from "../../hooks";

const HistoryMenu: FC = () => {

    const {historyTests} = useAppSelector(state => state.dictionary);

    return (
        <Accordion allowZeroExpanded={true}>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton style={{boxSizing: 'border-box'}}>
                        Your History Test
                    </AccordionItemButton>
                </AccordionItemHeading>

                <AccordionItemPanel>
                    <div className={'allGeneralTests'}>
                        {historyTests.map(generalTest => <HistoryGeneralTest
                            key={generalTest.id}
                            generalTest={generalTest}
                        />)}
                    </div>

                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    );
};

export {
    HistoryMenu
};