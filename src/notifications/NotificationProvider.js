import React, { createContext, useReducer } from 'react';
import { v4 } from 'uuid';
import Notification from '../components/Notification'

export const NotificationContext = createContext();

const NotificationProvider = (props) => {
    // reducer, initialState, init
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'ADD_NOTIFICATION':
                return [...state, { ...action.payload }];
            case 'REMOVE_NOTIFICATION':
                return state.filter(el => el.id !== action.id);
            default:
                return state
        }
    }, [
        {
            id: v4(),
            type: 'SUCCESS',
            message: 'Tasks loaded successfully'
        },
        {
            id: v4(),
            type: 'ERROR',
            message: 'Delete a task to show an error notification'
        },
        {
            id: v4(),
            type: 'SUCCESS',
            message: 'Hover over the notification to pause the count'
        },
    ]);

    return (
        <NotificationContext.Provider value={dispatch}>
            <div className={'notification-wrapper'}>
                {state.map(note => {
                    return <Notification dispatch={dispatch} key={note.id} {...note} />
                })}
            </div>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationProvider;