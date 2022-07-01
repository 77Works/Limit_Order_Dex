"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDockerComposeYml = void 0;
function getNetworkId(network) {
    switch (network) {
        case 'mainnet':
            return 1;
        case 'kovan':
            return 42;
        case 'ropsten':
            return 3;
        case 'rinkeby':
            return 4;
        case 'ganache':
        case 'custom':
            return 50;
    }
}
function getChainId(network) {
    switch (network) {
        case 'mainnet':
        case 'kovan':
        case 'rinkeby':
        case 'ropsten':
            return getNetworkId(network);
        case 'ganache':
        case 'custom':
            return 1337;
    }
}
exports.buildDockerComposeYml = function (options) {
    var basePath = options.tokenType === 'ERC20' ? '/erc20' : '/erc721';
    var theme = options.theme === 'light' ? 'LIGHT_THEME' : 'DARK_THEME';
    var isGanache = options.network === 'ganache';
    var collectiblesSource = isGanache ? 'mocked' : 'opensea';
    var networkId = getNetworkId(options.network);
    var chainId = getChainId(options.network);
    var ganacheService = "\n  ganache:\n    image: 0xorg/ganache-cli\n    ports:\n      - \"8545:8545\"";
    var collectibleEnv = ("\n      REACT_APP_COLLECTIBLES_SOURCE: '" + collectiblesSource + "'\n      REACT_APP_COLLECTIBLE_ADDRESS: '" + options.collectibleAddress + "'\n      REACT_APP_COLLECTIBLE_NAME: '" + options.collectibleName + "'\n      REACT_APP_COLLECTIBLE_DESCRIPTION: '" + options.collectibleDescription + "'\n    ").trimLeft();
    return ("\nversion: \"3\"\nservices:" + (isGanache ? ganacheService : '') + "\n  postgres:\n    image: postgres:9.6\n    environment:\n        - POSTGRES_USER=api\n        - POSTGRES_PASSWORD=api\n        - POSTGRES_DB=api\n    ports:\n        - \"5432:5432\"\n  frontend:\n    image: 0xorg/launch-kit-frontend:latest\n    environment:\n      REACT_APP_RELAYER_URL: '" + options.relayerUrl + "'\n      REACT_APP_RELAYER_WS_URL: '" + options.relayerWebsocketUrl + "'\n      REACT_APP_DEFAULT_BASE_PATH: '" + basePath + "'\n      REACT_APP_THEME_NAME: '" + theme + "'\n      REACT_APP_NETWORK_ID: " + networkId + "\n      REACT_APP_CHAIN_ID: " + chainId + "\n      " + (options.tokenType === 'ERC20' ? '' : collectibleEnv) + "\n    command: yarn build\n    volumes:\n        - frontend-assets:/app/build\n  backend:\n    image: 0xorg/0x-api:latest\n    depends_on: \n        - postgres\n        - mesh\n    environment:\n        HTTP_PORT: '3000'\n        ETHEREUM_RPC_URL: '" + options.rpcUrl + "'\n        NETWORK_ID: '" + networkId + "'\n        CHAIN_ID: '" + chainId + "'\n        WHITELIST_ALL_TOKENS: 'true'\n        FEE_RECIPIENT: '" + options.feeRecipient + "'\n        MAKER_FEE_UNIT_AMOUNT: '" + options.makerFee + "'\n        TAKER_FEE_UNIT_AMOUNT: '" + options.takerFee + "'\n        MESH_WEBSOCKET_URI: 'ws://mesh:60557'\n        MESH_HTTP_URI: 'http://mesh:60556'\n        POSTGRES_URI: 'postgresql://api:api@postgres/api'\n    ports:\n      - '3000:3000'\n  mesh:\n    image: 0xorg/mesh:9.0.1\n    restart: always\n    environment:\n        ETHEREUM_RPC_URL: '" + options.rpcUrl + "'\n        ETHEREUM_CHAIN_ID: '" + chainId + "'\n        USE_BOOTSTRAP_LIST: 'true'\n        VERBOSITY: 3\n        PRIVATE_KEY_PATH: ''\n        WS_RPC_ADDR: '0.0.0.0:60557'\n        HTTP_RPC_ADDR: '0.0.0.0:60556'\n        # You can decrease the BLOCK_POLLING_INTERVAL for test networks to\n        # improve performance. See https://0x-org.gitbook.io/mesh/ for more\n        # Documentation about Mesh and its environment variables.\n        BLOCK_POLLING_INTERVAL: '5s'\n    ports:\n        - '60556:60556'\n        - '60557:60557'\n        - '60558:60558'\n        - '60559:60559'\n  nginx:\n    image: nginx\n    ports:\n        - '" + options.port + ":80'\n    volumes:\n        - frontend-assets:/usr/share/nginx/html\nvolumes:\n    frontend-assets:\n").trimLeft();
};
