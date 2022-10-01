import {FC, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";

import './NewWordForm.css';
import {ICoupleWords} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import {addWordFromForm, checkDuplication} from "../../helper";

const NewWordForm: FC = () => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm<ICoupleWords>();
    const [duplication, setDuplication] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const submit: SubmitHandler<ICoupleWords> = (data) => {
        const duplication = checkDuplication(data);
        if (!duplication) {
            addWordFromForm(data, dispatch);
            setDuplication(false);
        } else {
            setDuplication(true);
        }
        reset();
    };

    return (
        <form onSubmit={handleSubmit(submit)} className={'newWordForm'}>
            <div className={'twoInputs'}>
                <div className={'oneInput'}>
                    <input type={"text"} placeholder={'New Word'} {...register('englishWord', {
                        required: true,
                        pattern: new RegExp(/^[a-zA-Z]/)
                    })}/>
                    <div className={'errorText'}>
                        {errors.englishWord && <span>Required english word </span>}
                    </div>
                </div>

                <div className={'oneInput'}>
                    <input type={"text"} placeholder={'Translation'} {...register('ukraineWord', {
                        required: true,
                        pattern: new RegExp(/^[А-яіІїЇГгҐґёЁєЄ]/)
                    })}/>
                    <div className={'errorText'}>
                        {errors.ukraineWord && <span>Required ukraine word</span>}
                    </div>
                </div>
            </div>

            <div className={'sendButtonBlock'}>
                <button>Add to dictionary</button>
                <div className={'errorText'}>{duplication && <span>The word is already in the dictionary</span>}</div>
            </div>
        </form>
    );
};

export {
    NewWordForm
};