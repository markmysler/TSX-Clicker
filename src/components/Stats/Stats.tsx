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
			<h2>Progreso</h2>
			<ul id="stats-container">
				<li>
					Banco: <span>{formatNumber(Math.round(bankBalance))}$</span>
				</li>

				<li>
					Ingresos brutos por click:
					<span>
						{" " + formatNumber(Math.round(playerIncomePerClick))}$
					</span>
				</li>
				<li>
					Multiplicador: <span>{playerMulti.toFixed(1)}x</span>
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
				{playerCPS > 0 ? (
					<li>
						Ingresos por segundo:
						<span>
							{" " +
								formatNumber(
									Math.round(
										playerCPS *
											playerIncomePerClick *
											playerMulti
									)
								)}
							$
						</span>
					</li>
				) : (
					""
				)}
			</ul>
		</div>
	);
};
export default Stats;
