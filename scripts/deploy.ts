import { ethers, run, network } from "hardhat";

async function main() {
	const Lock = await ethers.getContractFactory("Lock");
	const lock = await Lock.deploy();

	await lock.deployed();

	console.log("Lock with 1 ETH deployed to:", lock.address);

	// Verify the contract was deployed correctly
	if (31337 != network.config.chainId && process.env.ETHERSCAN_API_KEY) {
		await lock.deployTransaction.wait(6);
		await verify(lock.address, []);
	}

	// INTERACTING WITH THE CONTRACT
	// Update the current value
	const transactionResponse = await lock.store(71);
	await transactionResponse.wait(1);
	const updatedValue = await lock.retreive();
	console.log(`Updated Value is: ${updatedValue}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

/**
 * VERIFYING SMART CONTRACT DEPLOYMENT
 */
async function verify(contractAddress: string, args: any[]) {
	try {
		await run("verify:verify", {
			address: contractAddress,
			constructorArguments: args,
		});
	} catch (error) {
		console.log(error);
	}
}
