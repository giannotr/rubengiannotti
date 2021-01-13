function simpleHash(input: string): number {
	var hash = 0;
	if(input.length == 0) {
		return hash;
	}

	for(let i = 0; i < input.length; i++) {
		var char = input.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash = hash & hash; // Convert to 32bit integer
	}

	return hash;
}

export default simpleHash;
