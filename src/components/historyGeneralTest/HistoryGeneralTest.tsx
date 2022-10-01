import {FC} from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion";
import {IGeneralTest} from "../../interfaces";
import {HistoryOneTest} from "../historyOneTest/HistoryOneTest";

interface IProps {
    generalTest: IGeneralTest
}

const HistoryGeneralTest: FC<IProps> = ({generalTest}) => {
    return (
        <Accordion allowZeroExpanded={true} allowMultipleExpanded={true}>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton style={{boxSizing: 'border-box'}}>
                        {generalTest.date}
                    </AccordionItemButton>
                </AccordionItemHeading>

                <AccordionItemPanel>
                    {generalTest.allWordsTest.map(oneTest => <HistoryOneTest
                        key={oneTest.id}
                        oneTest={oneTest}
                    />)}
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    );
};

export {
    HistoryGeneralTest
};