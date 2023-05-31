import React from "react";
import "./ClickerButton.css";
import { Player } from "../../classes/playerClass";
import { formatNumber } from "../../formatNums";

type ClickerButtonProps = {
	setBankBalance: React.Dispatch<React.SetStateAction<number>>;
};

const ClickerButton: React.FC<ClickerButtonProps> = ({ setBankBalance }) => {
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		Player.buttonClick();
		setBankBalance(Player.bank);
	};

	return (
		<button id="clicker-button" onClick={handleClick}>
			+
			{formatNumber(
				Math.round(Player.rawEarningsPerClick * Player.multiplier)
			)}
			$
		</button>
	);
};
export default ClickerButton;
