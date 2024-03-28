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
	50000,
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
const critChancePlus1 = new Upgrade(
	"critChancePlus1",
	50000,
	"Probabilidad de critico +1%",
	"crit",
	1
);
const critChancePlus3 = new Upgrade(
	"critChancePlus3",
	1000000,
	"Probabilidad de critico +3%",
	"crit",
	3
);
const critChancePlus8 = new Upgrade(
	"critChancePlus8",
	50000000,
	"Probabilidad de critico +8%",
	"crit",
	8
);

const critPower4 = new Upgrade(
	"critPower4",
	50000,
	"Poder de critico x4",
	"critPower",
	4
);
const critPower8 = new Upgrade(
	"critPower8",
	5000000,
	"Poder de critico x8",
	"critPower",
	8
);
const critPower16 = new Upgrade(
	"critPower16",
	50000000,
	"Poder de critico x16",
	"critPower",
	16
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
	critChancePlus1,
	critChancePlus3,
	critChancePlus8,
	critPower4,
	critPower8,
	critPower16,
	winCondition,
].sort((a: any, b: any) => {
	return a.price - b.price;
});
