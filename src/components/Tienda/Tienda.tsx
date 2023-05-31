import React, { useEffect } from "react";
import "./Tienda.css";
import { upgradeList } from "../../classes/upgradeClass";
import { Player } from "../../classes/playerClass";
import { Upgrade } from "../../App";
import swal from "sweetalert";
import { formatNumber } from "../../formatNums";

type TiendaProps = {
	setBankBalance: React.Dispatch<React.SetStateAction<number>>;
	updatedUpgradeList: any;
	setUpdatedUpgradeList: any;
	setPlayerMulti: any;
	setPlayerIncomePerClick: any;
	setPlayerCPS: any;
};

const Tienda: React.FC<TiendaProps> = ({
	setBankBalance,
	updatedUpgradeList,
	setUpdatedUpgradeList,
	setPlayerMulti,
	setPlayerIncomePerClick,
	setPlayerCPS,
}) => {
	const handleBuyUpgrade = (name: string) => {
		if (Player.buyUpgrade(name)) {
			setUpdatedUpgradeList((prevList: Upgrade[]) =>
				prevList.map((item) =>
					item.name === name
						? {
								...item,
								price: Math.round(item.price * 1.2),
								purchased: item.purchased + 1,
						  }
						: item
				)
			);
		} else {
			swal(
				"Fondos insuficientes",
				`Tu balance es ${Player.bank}$`,
				"error"
			);
		}

		Player.updateStats();
		setPlayerMulti(Player.multiplier);
		setPlayerIncomePerClick(Player.rawEarningsPerClick * Player.multiplier);
		setPlayerCPS(Player.clicksPerSec);
		setBankBalance(Player.bank);
	};
	useEffect(() => {
		// Update the updatedUpgradeList state when Player.playerUpgrades changes
		setUpdatedUpgradeList(
			upgradeList.map((item) => ({
				...item,
				purchased:
					Player.playerUpgrades.find(
						(upgrade) => upgrade.name === item.name
					)?.purchased || 0,
			}))
		);
	}, [Player.playerUpgrades]);
	return (
		<>
			<div id="tienda-container">
				<h2>Tienda</h2>
				<ul id="upgrade-list">
					{updatedUpgradeList.map((item: Upgrade) => (
						<li key={item.name}>
							<button onClick={() => handleBuyUpgrade(item.name)}>
								<h3>{item.description}</h3>
								<div>Precio: {formatNumber(item.price)}$</div>
								<div>Comprados: {item.purchased}</div>
							</button>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};
export default Tienda;
