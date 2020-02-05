import * as React from 'react';

export function useSessionStorage<T = string | null>(
	key: string,
	initialValue: T | null
): [T, (value: T | null) => void] {
	const [storedValue, setStoreValue] = React.useState(() => {
		try {
			const item = window.sessionStorage.getItem(key);
			if ('string' === typeof initialValue) {
				return item ? item : initialValue;
			} else {
				return item ? JSON.parse(item) : initialValue;
			}
		} catch (e) {
			return initialValue;
		}
	});

	const setValue = (value) => {
		try {
			setStoreValue(value);
			if ('string' === typeof initialValue) {
				window.sessionStorage.setItem(key, value);
			} else {
				window.sessionStorage.setItem(key, JSON.stringify(value));
			}
		} catch (e) {
			console.error(e);
		}
	};
	return [storedValue, setValue];
}
