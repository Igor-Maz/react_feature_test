import React from 'react';
import _ from 'lodash';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const DnD = ({ handleDragEnd, state }) => (
    <DragDropContext onDragEnd={handleDragEnd}>
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
                                    className={'droppable-col'}
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
    </DragDropContext>
)

export default DnD