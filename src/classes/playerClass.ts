import { upgradeList } from "./upgradeClass";
import swal from "sweetalert";

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

	static buttonClick() {
		const random = Math.random() * 100;
		if (random <= this.critChance) {
			Player.bank +=
				this.rawEarningsPerClick * this.multiplier * this.critPower;
		} else {
			Player.bank += this.rawEarningsPerClick * this.multiplier;
		}
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
		}
	}
}
