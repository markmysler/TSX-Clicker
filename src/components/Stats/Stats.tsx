import React from "react";
import "./Stats.css";
import { formatNumber } from "../../formatNums";

type StatsProps = {
	bankBalance: number;
	playerMulti: number;
	playerIncomePerClick: number;
	playerCPS: number;
	critChance: number;
	critPower: number;
};

const Stats: React.FC<StatsProps> = ({
	bankBalance,
	playerMulti,
	playerIncomePerClick,
	playerCPS,
	critChance,
	critPower,
}) => {
	return (
		<div id="stats-parent">
			<h2>Stats</h2>
			<ul id="stats-container">
				<li>
					Banco: <span>{formatNumber(Math.round(bankBalance))}$</span>
				</li>
				<li>
					Multiplicador: <span>{playerMulti.toFixed(1)}x</span>
				</li>
				<li>
					Ingresos por Click:
					<span>
						{" " + formatNumber(Math.round(playerIncomePerClick))}$
					</span>
				</li>
				<li>
					Clicks por segundo: <span>{playerCPS.toFixed(1)}cps</span>
				</li>
				<li>
					Probabilidad de critico: <span>{critChance}%</span>
				</li>
				<li>
					Poder de critico: <span>{critPower}x</span>
				</li>
			</ul>
		</div>
	);
};
export default Stats;
