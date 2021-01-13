import mod from './mod';
import padZero from './pad-zero';

test('test mod function', () => {
	//expect(mod(0, 0)).toThrow(...);
	expect(mod(0, 2)).toBe(0);
	expect(mod(1, 2)).toBe(1);
	expect(mod(2, 2)).toBe(0);
	expect(mod(-1, 5)).toBe(4);
	expect(mod(-2, 5)).toBe(3);
});

test('test padZero function', () => {
	//expect(padZero(-1)).toBe(-1);
	expect(padZero(0)).toBe(00);
	expect(padZero(1)).toBe(01);
	expect(padZero(02)).toBe(02);
	expect(padZero(10)).toBe(10);
	expect(padZero(99)).toBe(99);
});

// TODO: add tests for the other utils
