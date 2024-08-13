import { upgradeList } from "./upgradeClass";
import swal from "sweetalert";

const notes: any = {
	1: "1.png",
	2: "2.png",
	5: "5.png",
	10: "10.png",
	20: "20.png",
	50: "50.png",
	100: "100.png",
	200: "200.png",
	500: "500.png",
	1000: "1000.png",
	2000: "2000.png",
	5000: "5000.png",
	10000: "10000.png",
};

export class Player {
	static bank: number = 0;
	static playerUpgrades: { name: string; purchased: number }[] = [];
	static rawEarningsPerClick: number = 1;
	static multiplier: number = 1;
	static earningsPerClick: number =
		this.rawEarningsPerClick * this.multiplier;
	static clicksPerSec: number = 0;
	static critChance: number = 1;
	static critPower: number = 2;
	static currentNote: string = notes[1];

	static get_clicker_bg() {
		let current_click = Math.round(
			Player.rawEarningsPerClick * Player.multiplier
		);
		Player.currentNote =
			notes[
				Math.max(
					...Object.keys(notes)
						.map((num: string) => Number(num))
						.filter((num: number) => num <= current_click)
				)
			];
		return Player.currentNote;
	}

	static buttonClick() {
		Player.get_clicker_bg();
		if (this.probability(this.critChance)) {
			Player.bank +=
				this.rawEarningsPerClick * this.multiplier * this.critPower;
		} else {
			Player.bank += this.rawEarningsPerClick * this.multiplier;
		}
	}
	static probability(n: number) {
		return !!n && Math.random() * 100 <= n;
	}
	static buyUpgrade(name: string) {
		const selctedUpgrade = upgradeList.find((item) => item.name === name);
		if (selctedUpgrade!.price <= Player.bank) {
			Player.bank -= selctedUpgrade!.price;

			if (
				this.playerUpgrades.findIndex((item) => item.name === name) ===
				-1
			) {
				this.playerUpgrades.push({ name: name, purchased: 1 });
			} else {
				this.playerUpgrades[
					this.playerUpgrades.findIndex((item) => item.name === name)
				].purchased += 1;
			}
			selctedUpgrade!.price = Math.round(selctedUpgrade!.price * 1.2);
			Player.get_clicker_bg();
			return true;
		} else {
			return false;
		}
	}
	static updateStats() {
		let purchasedUpgrades = [];
		for (let i = 0; i < this.playerUpgrades.length; i++) {
			const upgrade = upgradeList.find(
				(item) => item.name === this.playerUpgrades[i].name
			);
			upgrade!.purchased = this.playerUpgrades[i].purchased;
			purchasedUpgrades.push(upgrade);
		}
		this.rawEarningsPerClick = 1;
		this.multiplier = 1;
		this.clicksPerSec = 0;
		this.critChance = 1;
		this.critPower = 2;
		for (let i = 0; i < purchasedUpgrades.length; i++) {
			if (purchasedUpgrades[i]?.type === "+") {
				this.rawEarningsPerClick +=
					purchasedUpgrades[i]!.value *
					purchasedUpgrades[i]!.purchased;
			} else if (purchasedUpgrades[i]?.type === "*") {
				this.multiplier +=
					purchasedUpgrades[i]!.value *
					purchasedUpgrades[i]!.purchased;
			} else if (purchasedUpgrades[i]?.type === "CPS") {
				this.clicksPerSec +=
					purchasedUpgrades[i]!.value *
					purchasedUpgrades[i]!.purchased;
			} else if (purchasedUpgrades[i]?.type === "crit") {
				this.critChance +=
					purchasedUpgrades[i]!.value *
					purchasedUpgrades[i]!.purchased;
			} else if (purchasedUpgrades[i]?.type === "critPower") {
				this.critPower = purchasedUpgrades[i]!.value;
			} else if (purchasedUpgrades[i]?.type === "Win") {
				swal({
					title: "Felicitaciones!",
					text: "Ganaste!",
					icon: "success",
				}).then(() => window.location.reload());
			}
			Player.get_clicker_bg();
		}
	}
}
