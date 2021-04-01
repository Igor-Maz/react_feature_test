import React, { useContext } from 'react';
import { Formik } from 'formik';
import TextInput from './TextInput';
import * as Yup from 'yup';
import { v4 } from 'uuid';

import { NotificationContext } from '../notifications/NotificationProvider';

const formSchema = Yup.object().shape({
    content: Yup.string().required('provide a task subject').min(3),
})


const AddForm = ({ addItem }) => {

    const dispatch = useContext(NotificationContext)

    const handleNewNotification = () => {
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
                id: v4(),
                type: 'SUCCESS',
                message: 'Task added'
            }
        })
    }

    return (

        <Formik
            initialValues={{
                content: '',
            }}
            validationSchema={formSchema}
            onSubmit={(data => addItem(data))}
        >
            {({
                handleSubmit,
            }) => {
                return (
                    <div className={'form'}>
                        <div className={'form-inside'}>
                            <form onSubmit={handleSubmit}>
                                <TextInput
                                    name={'content'}
                                    placeholder={'provide a task subject'}
                                    label={'Add task:'}
                                />
                                <button onClick={handleNewNotification} type={'submit'}>Submit</button>
                            </form>
                        </div>
                    </div>
                )
            }}
        </Formik >
    )
}

export default AddForm