export function formatNumber(num: number): string {
	const numStr = num.toString();
	let formatted = "";
	let counter = 0;

	for (let i = numStr.length - 1; i >= 0; i--) {
		counter++;
		formatted = numStr[i] + formatted;
		if (counter % 3 === 0 && i !== 0) {
			formatted = "." + formatted;
		}
	}
	return formatted;
}
