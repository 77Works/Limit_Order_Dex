#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var inquirer = __importStar(require("inquirer"));
var build_1 = require("./build");
var ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
var mockERC721Address = '0x07f96aa816c1f244cbc6ef114bb2b023ba54a2eb';
var zeroExAsciiArt = "\n\n............................................................\n............................................................\n............................................................\n..........................,,+I7?~...........................\n.....................~DDDDDDDDDDDDDDDD8,....................\n..................$DDDDDDDDDDDDDDDDDDDDDDD..................\n................DDDDDDDDDDDDDDDDDDDDDDDD....................\n..............DDDDDDDDDDDDDDDDDDDDDDDD......=D..............\n............=DDDDDDDDDDDDDDDDDDDDDDN......8DDDDD............\n............:DDDDDDDDDDDDDDDDDDDDO......ODDDDDDDD...........\n..............DDDDDDDD...DDDDDD,......~DDDDDDDDDDD..........\n.........D.....DDDDD......?DD...........=DDDDDDDDDD.........\n........ZDD:....DD:.......................NDDDDDDDDD........\n.......,DDDD7..............................DDDDDDDDDD.......\n.......DDDDDDN.............................,NDDDDDDDD.......\n.......DDDDDDDD...........................,DDDDDDDDDDD......\n.......DDDDDDDDD.........................NDDDDDDDDDDDD......\n......7DDDDDDDDDD,.......................DDDDDDDDDDDDD......\n......DDDDDDDDDDDDI.......................NDDDDDDDDDDD......\n......ZDDDDDDDDDDDD8.......................DDDDDDDDDDD......\n......,DDDDDDDDDDDDD........................8DDDDDDDDD......\n.......DDDDDDDDDDD...........................?DDDDDDDD......\n.......NDDDDDDDDZ,............................,DDDDDD.......\n.......,DDDDDDDDD...............................NDDDD.......\n........8DDDDDDDDD........................OD.....DDD,.......\n.........DDDDDDDDDD?...........DDD.......DDDD.....N:........\n..........NDDDDDDDDDD?.......DDDDDD=...DDDDDDD+.............\n...........DDDDDDDDDO......NDDDDDDDDDDDDDDDDDDDD............\n............ODDDDD:......DDDDDDDDDDDDDDDDDDDDDDD............\n.............,NN~.....,NDDDDDDDDDDDDDDDDDDDDDD8.............\n....................~DDDDDDDDDDDDDDDDDDDDDDDD,..............\n..................?DDDDDDDDDDDDDDDDDDDDDDD$.................\n.....................DDDDDDDDDDDDDDDDDD+....................\n..........................+DDDDDDZ,.........................\n............................................................\n............................................................\n............................................................\n............................................................\n............................................................";
function getRpcUrl(network) {
    switch (network) {
        case 'mainnet':
            return 'https://mainnet.infura.io/';
        case 'kovan':
            return 'https://kovan.infura.io/';
        case 'ropsten':
            return 'https://ropsten.infura.io/';
        case 'rinkeby':
            return 'https://rinkeby.infura.io/';
        case 'ganache':
            return 'http://ganache:8545/';
        case 'custom':
            return 'http://localhost:8545/';
    }
}
var isAddress = function (s) { return /(0x)?[0-9a-fA-F]{40}/.test(s); };
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var networkChoices, answers, rpcUrl, options, dockerComposeYml, composeFilePath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    networkChoices = [
                        {
                            name: 'Mainnet',
                            value: 'mainnet',
                        },
                        {
                            name: 'Kovan',
                            value: 'kovan',
                        },
                        {
                            name: 'Ropsten',
                            value: 'ropsten',
                        },
                        {
                            name: 'Rinkeby',
                            value: 'rinkeby',
                        },
                        {
                            name: 'Ganache',
                            value: 'ganache',
                        },
                        {
                            name: 'Custom',
                            value: 'custom',
                        },
                    ];
                    return [4 /*yield*/, inquirer.prompt([
                            {
                                type: 'list',
                                name: 'tokenType',
                                message: zeroExAsciiArt +
                                    "\n\n\n\n            \uD83D\uDE80 Welcome to the 0x Launch Kit Wizard! \uD83D\uDE80 \n\n            Start your own exchange in under a minute\n\n            ----------------------------------------------------------------\n\n            Select the kind of token you want to support on your exchange",
                                choices: ['ERC20', 'ERC721'],
                            },
                            {
                                type: 'list',
                                name: 'network',
                                message: 'Select the network you want to use',
                                choices: networkChoices,
                            },
                            {
                                type: 'input',
                                name: 'rpcUrl',
                                message: 'Select the RPC URL you want to use',
                                default: function (answers) {
                                    return getRpcUrl(answers.network);
                                },
                                validate: function (rpcUrl) {
                                    return /https?:\/\/.+/.test(rpcUrl) ? true : 'Please enter a valid URL';
                                },
                                when: function (answers) { return answers.network !== 'ganache'; },
                            },
                            {
                                type: 'input',
                                name: 'relayerUrl',
                                message: 'Launch Kit will create a backend Relayer. Enter the public URL for the backend Relayer or leave default:',
                                default: 'http://localhost:3000/sra/v3',
                                validate: function (rpcUrl) {
                                    return /https?:\/\/.+/.test(rpcUrl) ? true : 'Please enter a valid URL';
                                },
                            },
                            {
                                type: 'input',
                                name: 'relayerWebsocketUrl',
                                message: 'Launch Kit will create a backend Relayer. Enter the public URL for the backend websocket or leave default:',
                                default: 'ws://localhost:3000/sra/v3',
                                validate: function (rpcUrl) {
                                    return /wss?:\/\/.+/.test(rpcUrl) ? true : 'Please enter a valid Websocket URL';
                                },
                            },
                            {
                                type: 'input',
                                name: 'collectibleAddress',
                                message: 'Enter the address of the collectible:',
                                default: ZERO_ADDRESS,
                                validate: function (answer) {
                                    return isAddress(answer) ? true : 'Please enter a valid address';
                                },
                                when: function (answers) { return answers.tokenType === 'ERC721' && answers.network !== 'ganache'; },
                            },
                            {
                                type: 'input',
                                name: 'collectibleName',
                                message: 'Enter the name of the collectible:',
                                validate: function (answer) {
                                    return answer.length > 0 ? true : 'Please enter a name';
                                },
                                when: function (answers) { return answers.tokenType === 'ERC721' && answers.network !== 'ganache'; },
                            },
                            {
                                type: 'input',
                                name: 'collectibleDescription',
                                message: 'Enter the description of the collectible (optional):',
                                when: function (answers) { return answers.tokenType === 'ERC721' && answers.network !== 'ganache'; },
                            },
                            {
                                type: 'input',
                                name: 'feeRecipient',
                                message: 'Enter the fee recipient:',
                                default: ZERO_ADDRESS,
                                validate: function (answer) {
                                    return isAddress(answer) ? true : 'Please enter a valid address';
                                },
                            },
                            {
                                type: 'number',
                                name: 'makerFee',
                                message: 'Enter the maker fee:',
                                default: 0,
                                when: function (answers) { return answers.feeRecipient !== ZERO_ADDRESS; },
                            },
                            {
                                type: 'number',
                                name: 'takerFee',
                                message: 'Enter the taker fee:',
                                default: 0,
                                when: function (answers) { return answers.feeRecipient !== ZERO_ADDRESS; },
                            },
                            {
                                type: 'list',
                                name: 'theme',
                                message: 'Select the theme you want to use',
                                choices: [
                                    {
                                        name: 'Light',
                                        value: 'light',
                                    },
                                    {
                                        name: 'Dark',
                                        value: 'dark',
                                    },
                                ],
                            },
                            {
                                type: 'number',
                                name: 'port',
                                message: 'Enter the port for the frontend server:',
                                default: 3001,
                                validate: function (port) {
                                    return 1 <= port && port <= 65535 ? true : 'Enter a port between 1 and 65535';
                                },
                            },
                        ])];
                case 1:
                    answers = _a.sent();
                    console.log("\n    Wizard complete.\n\n    \uD83D\uDE80\uD83D\uDE80\uD83D\uDE80\uD83D\uDE80 .... Preparing for liftoff .... \uD83D\uDE80\uD83D\uDE80\uD83D\uDE80\uD83D\uDE80\n\n    Run << docker-compose up >> and open your browser to http://localhost:" +
                        answers.port +
                        "\n\n\n\n\n");
                    rpcUrl = answers.network === 'ganache' ? 'http://ganache:8545' : answers.rpcUrl;
                    options = {
                        tokenType: answers.tokenType,
                        network: answers.network,
                        rpcUrl: rpcUrl,
                        relayerUrl: answers.relayerUrl,
                        relayerWebsocketUrl: answers.relayerWebsocketUrl,
                        feeRecipient: answers.feeRecipient || ZERO_ADDRESS,
                        theme: answers.theme,
                        port: answers.port,
                        makerFee: answers.makerFee || 0,
                        takerFee: answers.takerFee || 0,
                        collectibleAddress: answers.collectibleAddress || mockERC721Address,
                        collectibleName: answers.collectibleName || '',
                        collectibleDescription: answers.collectibleDescription || '',
                    };
                    dockerComposeYml = build_1.buildDockerComposeYml(options);
                    composeFilePath = process.argv[2] || 'docker-compose.yml';
                    fs.writeFileSync(composeFilePath, dockerComposeYml);
                    return [2 /*return*/];
            }
        });
    });
}
main();
