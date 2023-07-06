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
	const [intervalIsOn, setIntervalIsOn] = useState(false);

	function setIntervalOn() {
		window.setInterval(clickEverySecond, 1000);
	}

	function clickEverySecond() {
		if (Player.probability(Player.critChance)) {
			Player.bank +=
				Player.clicksPerSec *
				Player.earningsPerClick *
				Player.critPower;
		} else {
			Player.bank += Player.clicksPerSec * Player.earningsPerClick;
		}
		setBankBalance(Player.bank);
	}

	useEffect(() => {
		if (!intervalIsOn) {
			if (Player.clicksPerSec > 0) {
				setIntervalOn();
				setIntervalIsOn(true);
			}
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
