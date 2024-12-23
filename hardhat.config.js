
const { API_URL, PRIV_KEY } = require('./cmConf.cjs');

module.exports = {
    solidity: "0.8.27",
    defaultNetwork: 'sepolia',
    networks: {
        sepolia: {
            url: API_URL,
            accounts: [`0x${PRIV_KEY}`]
        }
    }
};
