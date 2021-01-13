interface Routes {
	title: string,
	destination: string,
}

export default function reduceRoutesArray (arr: Array<Routes>): Array<string> {
	const r: Array<string> = [];
	arr.forEach(route => r.push(route.destination));
	return r;
}
