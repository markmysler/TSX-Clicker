import React, { useState } from "react";
import "./ClickerButton.css";
import { Player } from "../../classes/playerClass";
import { formatNumber } from "../../formatNums";

type ClickerButtonProps = {
	setBankBalance: React.Dispatch<React.SetStateAction<number>>;
	setTextColor: React.Dispatch<React.SetStateAction<string>>;
};

const ClickerButton: React.FC<ClickerButtonProps> = ({
	setBankBalance,
	setTextColor,
}) => {
	let current_click = Math.round(
		Player.rawEarningsPerClick * Player.multiplier
	);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		Player.buttonClick();
		setBankBalance(Player.bank);
		setTextColor("green"); // Change to desired color
		setTimeout(() => {
			setTextColor("black"); // Revert back to original color
		}, 150); // 1000 milliseconds = 1 second
	};

	return (
		<button
			id="clicker-button"
			onClick={handleClick}
			style={{
				backgroundImage: `url(${require(`../../images/${Player.currentNote}`)})`,
			}}
		>
			<p
				style={{
					position: "relative",
					top: "-60%",
					left: "0px",
				}}
			>
				+{formatNumber(current_click)}$
			</p>
		</button>
	);
};
export default ClickerButton;
