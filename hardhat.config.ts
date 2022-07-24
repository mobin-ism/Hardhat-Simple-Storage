import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import "@nomiclabs/hardhat-etherscan";

const PRIVATE_KEY: string = process.env.PRIVATE_KEY as string;

const config: HardhatUserConfig = {
	solidity: "0.8.9",
	defaultNetwork: "hardhat",
	networks: {
		rinkeby: {
			url: process.env.RINKEBY_RPC_URL,
			accounts: [PRIVATE_KEY],
			chainId: 4,
		},
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY,
	},
};

export default config;
