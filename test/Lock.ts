import { ethers } from "hardhat";
import { assert, expect } from "chai";
import { Lock } from "../typechain-types";

describe("Simple Storage Test Cases", function () {
	let simpleStorage: Lock, simpleStorageFactory;

	beforeEach(async () => {
		simpleStorageFactory = await ethers.getContractFactory("Lock");
		simpleStorage = await simpleStorageFactory.deploy();
		simpleStorage.deployTransaction.wait(1);
	});

	it("should return the initial stored value which is 0", async function () {
		const storedValue = await simpleStorage.retreive();
		assert(storedValue.toString() === "0");
	});

	it("should update the initial stored value with is 98", async function () {
		await simpleStorage.store(98);
		simpleStorage.deployTransaction.wait(1);
		const storedValue = await simpleStorage.retreive();
		assert(storedValue.toString() === "98");
	});
});
