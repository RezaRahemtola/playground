import { describe, expect, it } from '@jest/globals';
import { getSortedEvenNumbers } from "../src/getSortedEvenNumbers";

/** Test getSortedEvenNumbers */
describe('Test getSortedEvenNumbers', () => {
    it('Subject example', () => {
        expect(getSortedEvenNumbers([1, 0, 19, 17, 16, 8, 13, 24]) == "0 - 8 - 16 - 24")
    });

    it('Negative numbers', () => {
        expect(getSortedEvenNumbers([-1, -19, -8, -13, -24]) == "-24 - -8")
    });

    it('Mixed numbers', () => {
        expect(getSortedEvenNumbers([-1, 0, 19, 17, -16, 8, 13, 24]) == "-16 - 0 - 8 - 24")
    });
});
