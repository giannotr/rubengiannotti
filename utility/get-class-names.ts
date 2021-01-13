export default function getClassNames(array: Array<string>, styles?: object): string {
	if(!styles && Object.keys(styles).length === 0) {
		return array.reduce((acc, curr) => acc + ` ${curr}`, '');
	}
	
	return array.map(cls => styles[cls]).join(' ');
}
