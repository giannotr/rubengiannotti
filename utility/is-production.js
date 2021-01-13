export default function isProduction() {
	if(typeof window !== 'undefined') {
		return !(['localhost', '127.0.0.1', 'lvm.me'].includes(window.location.hostname));
	}
	
	return false;
}
