import { ethers } from "./ethers-5.6.esm.min.js";
import {abi,contractAddress} from "./constant.js"
const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
const withDrawButton = document.getElementById("withDrawButton")
const balanceButton = document.getElementById("balance")

connectButton.onclick = Connect
fundButton.onclick = Fund
withDrawButton.onclick = Withdraw
balanceButton.onclick = getBalance


async function Connect() {666
    if (typeof window.ethereum != "undefined"){
        window.ethereum.request({method:"eth_requestAccounts"});
        document.getElementById("connectButton").innerHTML = "Connected"

    }else {
        console.log("no metamask")
    }

}

async function Fund() {
    const ethAmount = document.getElementById("ethAmount").value
    console.log(typeof ethAmount, "type")
    if (typeof window.ethereum != "undefined"){
            
    
        console.log("funding started")
        
        const provider = new ethers.providers.Web3Provider(window.ethereum)// provider is connection to blockchain
        
        const signer =  provider.getSigner()// signer is the someone with gas whihc is wallet
        // now connect to contract with the help of abi and signer
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
             // here we calling the function which is mentioned in solidity contract 

        const transactionResponse = await contract.fund({value:ethers.utils.parseEther(ethAmount)})
        await listentransactionForMine(transactionResponse, provider)
       

        }catch(error){
            console.log(error)
        }

       
        console.log(signer)
   

    }else {
        console.log("no metamask")
    }

}


function listentransactionForMine(transactionResponse,proivder){

}

async function Withdraw() {
    
    if (typeof window.ethereum != "undefined"){

        // provider is connection to blockchain
        // signer is the someone with gas whihc is wallet
        //
        console.log("withdraw started")
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer =  provider.getSigner()
        try{
            const contract = new ethers.Contract(contractAddress, abi, signer)
            const transactionResponse = await contract.withDraw()
        }catch(error){
            console.log(error)
        }
        
        console.log(signer)
   

    }else {
        console.log("no metamask")
    }

}

async function getBalance(){
    if (typeof window.ethereum != "undefined"){

        try{ const provider = new ethers.providers.Web3Provider(window.ethereum)

            const signer = provider.getSigner()
    
            const balance = await provider.getBalance(contractAddress)
            console.log(balance)
        }catch(e){ 
            console.log(e) 
        }

       
    }
}




