import { ethers, run, network } from "hardhat";

async function main() {
	const currentTimestampInSeconds = Math.round(Date.now() / 1000);
	const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
	const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

	const lockedAmount = ethers.utils.parseEther("0.00000001");

	const Lock = await ethers.getContractFactory("Lock");
	const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

	await lock.deployed();

	console.log("Lock with 1 ETH deployed to:", lock.address);

	// Verify the contract was deployed correctly
	if (31337 != network.config.chainId && process.env.ETHERSCAN_API_KEY) {
		await lock.deployTransaction.wait(6);
		await verify(lock.address, [unlockTime]);
		console.log(lock.address);
	}
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
	console.log(contractAddress);
	try {
		await run("verify:verify", {
			address: contractAddress,
			constructorArguments: args,
		});
	} catch (error) {
		console.log(error);
	}
}
