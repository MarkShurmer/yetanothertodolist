import {ALL, COMPLETED_ONLY} from "../../logic/constants";

export const getTasks = (tasks, filter) => {

    switch (filter) {
        case ALL:
            return tasks;
        case COMPLETED_ONLY:

            // user wants complete only
            return tasks.filter(t => t.isComplete);
        default:
            return [];
    }
};