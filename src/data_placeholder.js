import { v4 } from 'uuid';

const item1 = {
    id: v4(),
    content: "learn beautiful dnd"
}

const item2 = {
    id: v4(),
    content: "prepare Drag 'n drop items"
}

const item3 = {
    id: v4(),
    content: "learn sidebar"
}

const item4 = {
    id: v4(),
    content: "prepare sidebar"
}

const item5 = {
    id: v4(),
    content: "learn formik"
}

const item6 = {
    id: v4(),
    content: "prepare formik"
}

export default {
    'todo': {
        title: 'Todo',
        items: [item1, item2]
    },
    'in-progress': {
        title: 'In Progress',
        items: [item3, item4]
    },
    'done': {
        title: 'Completed',
        items: [item5, item6]
    }
}