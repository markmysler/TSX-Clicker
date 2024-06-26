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
	setCritChance: any;
	setCritPower: any;
};

const Tienda: React.FC<TiendaProps> = ({
	setBankBalance,
	updatedUpgradeList,
	setUpdatedUpgradeList,
	setPlayerMulti,
	setPlayerIncomePerClick,
	setPlayerCPS,
	setCritChance,
	setCritPower,
}) => {
	const purchasedSingleBuy: string[] = [];

	const handleBuyUpgrade = (name: string) => {
		if (Player.buyUpgrade(name)) {
			setUpdatedUpgradeList((prevList: Upgrade[]) =>
				prevList
					.map((item) =>
						item.name === name
							? {
									...item,
									price: Math.round(item.price * 1.2),
									purchased: item.purchased + 1,
							  }
							: item
					)
					.sort((a: any, b: any) => {
						return a.price - b.price;
					})
			);
			const singleBuyArr = ["critPower4", "critPower8", "critPower16"];

			if (singleBuyArr.includes(name)) {
				purchasedSingleBuy.push(name);
				setUpdatedUpgradeList((prevList: Upgrade[]) =>
					prevList.filter((i) => !purchasedSingleBuy.includes(i.name))
				);
			}
		} else {
			swal(
				"Fondos insuficientes",
				`Tu balance es ${Player.bank}$`,
				"error"
			);
		}

		Player.updateStats();
		setPlayerMulti(Player.multiplier);
		setPlayerIncomePerClick(Player.rawEarningsPerClick);
		setPlayerCPS(Player.clicksPerSec);
		setBankBalance(Player.bank);
		setCritChance(Player.critChance);
		setCritPower(Player.critPower);
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
							<button
								onClick={() => handleBuyUpgrade(item.name)}
								disabled={item.price > Player.bank}
							>
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
