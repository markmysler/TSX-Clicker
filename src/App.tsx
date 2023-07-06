import React, { useEffect, useState } from "react";
import "./App.css";
import Stats from "./components/Stats/Stats";
import ClickerButton from "./components/ClickerButton/ClickerButton";
import Tienda from "./components/Tienda/Tienda";
import { Player } from "./classes/playerClass";
import { upgradeList } from "./classes/upgradeClass";

export interface Upgrade {
	name: string;
	description: string;
	price: number;
	purchased: number;
}

function App() {
	const [bankBalance, setBankBalance] = useState(Player.bank);
	const [updatedUpgradeList, setUpdatedUpgradeList] =
		useState<Upgrade[]>(upgradeList);
	const [playerMulti, setPlayerMulti] = useState(Player.multiplier);
	const [playerIncomePerClick, setPlayerIncomePerClick] = useState(
		Player.earningsPerClick
	);
	const [playerCPS, setPlayerCPS] = useState(Player.clicksPerSec);
	const [critChance, setCritChance] = useState(Player.critChance);
	const [critPower, setCritPower] = useState(Player.critPower);
	let IntervId: any;

	function clickEverySecond() {
		Player.bank += playerIncomePerClick * playerCPS;
		setBankBalance(Player.bank);
	}

	function setIntervalOn() {
		IntervId = window.setInterval(clickEverySecond, 1000);
	}

	useEffect(() => {
		if (playerCPS > 0 && !IntervId) {
			setIntervalOn();
		}
	}, [playerCPS]);

	return (
		<>
			<section id="top-section">
				<Stats
					bankBalance={bankBalance}
					playerMulti={playerMulti}
					playerIncomePerClick={playerIncomePerClick}
					playerCPS={playerCPS}
					critChance={critChance}
					critPower={critPower}
				/>
				<ClickerButton setBankBalance={setBankBalance} />
			</section>
			<section id="bottom-section">
				<Tienda
					setBankBalance={setBankBalance}
					updatedUpgradeList={updatedUpgradeList}
					setUpdatedUpgradeList={setUpdatedUpgradeList}
					setPlayerMulti={setPlayerMulti}
					setPlayerIncomePerClick={setPlayerIncomePerClick}
					setPlayerCPS={setPlayerCPS}
					setCritPower={setCritPower}
					setCritChance={setCritChance}
				/>
			</section>
		</>
	);
}

export default App;
