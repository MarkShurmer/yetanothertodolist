import React from 'react';
import {getTasks} from "../selector";
import {ALL, COMPLETED_ONLY} from "../../../logic/constants";

describe('Selector', () => {
    it('returns all items when filter is ALL', () => {
        const items = [
            { id: 1, content: 'Make sure items are completeable', isComplete: false },
            { id: 2, content: 'Add filters (Use HOC)', isComplete: false },
            ];

        const result = getTasks(items, ALL);
        expect(result.length).toBe(2);
        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(2);
    });

    it('returns all items when filter is COMPLETED_ONLY', () => {
        const items = [
            { id: 1, content: 'Make sure items are completeable', isComplete: false },
            { id: 2, content: 'Add filters (Use HOC)', isComplete: true },
        ];

        const result = getTasks(items, COMPLETED_ONLY);
        expect(result.length).toBe(1);
        expect(result[0].id).toBe(2);
    });

    it('should return empty array when garbage passed', () => {
        const items = [
            { id: 1, content: 'Make sure items are completeable', isComplete: false },
            { id: 2, content: 'Add filters (Use HOC)', isComplete: true },
        ];

        const result = getTasks(items, 'kkkkk');
        expect(result.length).toBe(0);
    });

});
