import { useRef } from 'react';

export default function useRefs(namespaces: Array<string>): Object {
	const refs = {};

	for(let namespace of namespaces) {
		refs[namespace] = useRef(null);
	}

	return refs;
}
