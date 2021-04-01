import React, { useContext } from 'react';
import _ from 'lodash';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 } from 'uuid';
import { NotificationContext } from '../notifications/NotificationProvider';


const DnD = ({ handleDragEnd, state, setState }) => {

    const dispatch = useContext(NotificationContext)

    const handleRemoveNotification = () => {
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
                id: v4(),
                type: 'ERROR',
                message: 'Task removed'
            }
        })
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className={'list'}>
                {_.map(state, (data, key) => {
                    return (
                        <div key={key} className={'column'}>
                            <h3>{data.title}</h3>
                            <Droppable droppableId={key}>
                                {(provided) => {
                                    return (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={`${key}`}
                                        >
                                            {data.items.map((el, index) => {
                                                return (
                                                    <Draggable key={el.id} index={index} draggableId={el.id}>
                                                        {(provided, snapshot) => {
                                                            return (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className={`item ${snapshot.isDragging && 'dragging'}`}
                                                                >
                                                                    {el.content}
                                                                    <button id='remove_button'
                                                                        type='button'
                                                                        onClick={() => {
                                                                            const prev = { ...state };
                                                                            prev[key].items.splice(index, 1)
                                                                            setState(prev);
                                                                            handleRemoveNotification()
                                                                        }}>x</button>
                                                                </div>
                                                            )
                                                        }}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }}
                            </Droppable>
                        </div>
                    )
                })}
            </div>
        </DragDropContext>
    )
}

export default DnD