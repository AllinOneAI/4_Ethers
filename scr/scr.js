//import {detectEthereumProvider} from "./detect-provider.min.js"
import {ethers} from "./ethers.js";
                                                                    
document.getElementById("connect").addEventListener("click", connect);
document.getElementById("submit").addEventListener("click", distribute);

const greeting = document.getElementById("greeting");

const bal = document.getElementById("bal");
const addr = document.getElementById("addr");

let accounts = [];
let signer;
let provider;

const meta = await detectEthereumProvider({
    mustBeMetaMask: true
});

if (meta) {
    console.log(meta); 
    init();
} else {
    alert('Please install MetaMask!');
}

async function distribute(){

}

async function connect() {
    greeting.hidden = false;
    accounts = await provider.send("eth_requestAccounts", []);
    addr.textContent = String(accounts[0]); 
    signer = provider.getSigner();
    let balance = await signer.getBalance();
    bal.textContent = ethers.utils.formatEther(balance) + " GETH";
    

}

async function init(){
    provider = new ethers.providers.Web3Provider(meta);
    signer = provider.getSigner();
}


meta.on("accountsChanged", (a) => {
    accounts[0] = a;
    addr.textContent = String(accounts[0]);

});







