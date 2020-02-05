import * as React from 'react';

export const useInput = (initialValue: string) => {
	const [value, setValue] = React.useState(initialValue);
	const onChange = (e): void => setValue(e.targe.value);
	return { value, onChange };
};
