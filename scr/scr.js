//import {detectEthereumProvider} from "./detect-provider.min.js"
import {ethers} from "./ethers.js";
                                                                    
document.getElementById("connect").addEventListener("click", connect);
document.getElementById("submit").addEventListener("click", distribute);
document.getElementById("add").addEventListener("click", add);
document.getElementById("rm").addEventListener("click", remove);

const ad = inputs.firstElementChild.querySelector(".inputAd");
const am = inputs.firstElementChild.querySelector(".inputAm");

ad.addEventListener("input", getRegexChecker(ad));
am.addEventListener("input", getRegexChecker(am));

let sanya = 1;
let accounts = []

const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();

const ERC20_ABI = [
    "function transfer(address recipient, uint256 amount) external returns (bool)",
    "function balanceOf(address) view returns (uint256)",

    "event Transfer(address indexed from, address indexed to, uint256 amount)"
];

    const address = '0x7ca625f5273Ee4Ec8DD072520562CC562338097f'; 
    const contract = new ethers.Contract(address, ERC20_ABI, provider);

function add() {
    rm.disabled = false;
    let a = document.querySelector("#inputs :first-child"); 
    let b = a.cloneNode(true);
    const ad = b.querySelector(".inputAd");
    const am = b.querySelector(".inputAm");
    ad.addEventListener("input", getRegexChecker(ad));
    am.addEventListener("input", getRegexChecker(am));
    inputs.appendChild(b);
}

function remove() {
    inputs.removeChild(inputs.lastElementChild)

    if (inputs.childElementCount < 2){
        rm.disabled = true;
    }   
}

async function distribute(){
    
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const contractConnected = await contract.connect(signer);
    
    const inputs = document.querySelector("#inputs").children; 

    console.log(inputs)

    //console.log(inputs[1].querySelector(".inputAd").value)

    for (let i = 0; i < inputs.length; i++) {
        let address = inputs[i].querySelector(".inputAd").value;
        let ammount = inputs[i].querySelector(".inputAm").value;

        try {

            await contractConnected.transfer(address, ethers.utils.parseUnits(ammount));

        } catch (error) {

            console.error(error);

        }

    }

}

async function connect() {
    await init();
}

async function init(){
    const meta = await detectEthereumProvider({
        mustBeMetaMask: true
    });

    if (meta) {
        greeting.hidden = false;
        const provider = new ethers.providers.Web3Provider(meta);
        accounts = await provider.send("eth_requestAccounts", []);
        addr.textContent = String(accounts[0]); 
        bal.textContent = ethers.utils.formatUnits(await contract.balanceOf(accounts[0])) + " IUAB";
        
        meta.on("accountsChanged", async function(a) {
            accounts[0] = a;
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            addr.textContent = String(accounts[0]);
            bal.textContent = ethers.utils.formatUnits(await contract.balanceOf(String(accounts[0]))) + " IUAB";
        }); 
    } else {
        connect.disabled = true;
        alert('Please install MetaMask!');
    }
}

function getRegexChecker(obj) {
    return () => {
 
        let reg = new RegExp(obj.pattern);
        if (!reg.test(obj.value)) {
            obj.value = "";
        }
    }
}







