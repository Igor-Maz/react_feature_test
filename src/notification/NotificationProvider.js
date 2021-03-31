import React from 'react';
import {v4} from 'uuid';
import Notification from '../components/Notification'

const NotificationProvider = (props) => {
    const notifications = [
        {
            id: v4(),
            type: 'SUCCESS',
            message: 'Task added'
        },
        {
            id: v4(),
            type: 'ERROR',
            message: 'Task removed'
        },
        {
            id: v4(),
            type: 'SUCCESS',
            message: 'test'
        },
    ];

    console.log(notifications);

    return(
        <div>
            <div className={'notification-wrapper'}>
                {notifications.map(note => {
                    return <Notification key={note.id} {...note} />
                })}
            </div>
            {props.children}
        </div>
    )
}

export default NotificationProvider;