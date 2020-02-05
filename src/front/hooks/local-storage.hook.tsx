import * as React from 'react';

export const useLocalStorage = (
	key: string,
	initialValue: string | null
): [string | null, (value: string | null) => void] => {
	const [storedValue, setStoreValue] = React.useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (e) {
			return initialValue;
		}
	});

	const setValue = (value): void => {
		try {
			setStoreValue(value);
			window.localStorage.set(value, JSON.stringify(value));
		} catch (e) {
			console.error(e);
		}
	};

	return [storedValue, setValue];
};
