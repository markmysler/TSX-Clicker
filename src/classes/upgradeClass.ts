class Upgrade {
	constructor(
		readonly name: string,
		public price: number,
		readonly description: string,
		readonly type: string,
		readonly value: number
	) {}
	public purchased: number = 0;
}

const plusOnePerClick = new Upgrade("+1", 10, "+1$ por click", "+", 1);
const plusFivePerClick = new Upgrade("+5", 100, "+5$ por click", "+", 5);
const plusTenPerClick = new Upgrade("+10", 1000, "+10$ por click", "+", 10);
const plusZeroPointTwoX = new Upgrade(
	"+0.2x",
	5000,
	"Multiplicador + 0.2x",
	"*",
	0.2
);
const plusOneX = new Upgrade("+1x", 50000, "Multiplicador + 1x", "*", 1);
const plusTwoX = new Upgrade("+2x", 200000, "Multiplicador + 2x", "*", 2);
const CPSPlusZeroPointOne = new Upgrade(
	"+0.1CPS",
	100000,
	"Clicks por segundo + 0.1",
	"CPS",
	0.1
);
const CPSPlusZeroPointFive = new Upgrade(
	"+0.5CPS",
	500000,
	"Clicks por segundo + 0.5",
	"CPS",
	0.5
);
const CPSPlusOne = new Upgrade(
	"+1CPS",
	10000000,
	"Clicks por segundo + 1",
	"CPS",
	1
);

const winCondition = new Upgrade("winCondition", 1000000000, "Ganar", "Win", 0);

export const upgradeList = [
	plusOnePerClick,
	plusFivePerClick,
	plusTenPerClick,
	plusZeroPointTwoX,
	plusOneX,
	plusTwoX,
	CPSPlusZeroPointOne,
	CPSPlusZeroPointFive,
	CPSPlusOne,
	winCondition,
];
