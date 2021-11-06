import React, { Component } from "react";
import SimpleStorageContract from "./build/contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import ReactDOM from 'react-dom';
import Create from "./component/Create";
import Navi from "./component/Navi";
import Home from './component/Home';
import "./App.css";
import { Layout, Menu, Breadcrumb } from 'antd';
import Auction from "./build/contracts/Auction.json";
const { Header, Content, Footer } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        storageValue: 0,
        web3: null,
        accounts: null,
        contract: null,
        accountAddress: "",
        accountBalance: "",
        NFTContract: null,
        NFTCount: 0,
        NFTs: [],
        loading: true,
        metamaskConnected: false,
        contractDetected: false,
        NFTNumOfAccount: 0,
        nameIsUsed: false,
        lastMintTime: null,
        Auctions: [],
        currentTime: null,
    };
}
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      this.state.accountAddress = accounts[0];
      this.state.accountBalance = await web3.eth.getBalance(accounts[0]);
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      const netID = await web3.eth.net.getId();
        const netData = Auction.networks[netID];
        if (netData) {
            this.setState({loading: true});
            const NFTContract = new web3.eth.Contract(
                Auction.abi,
                netData.address
            );
            this.setState({NFTContract});
            this.setState({contractDetected: true});
            
            const NFTCount = await NFTContract.methods.NFTCounter().call();
            this.setState({NFTCount});

            for (let i = 1; i <= NFTCount; i++) {
                const nft = await NFTContract.methods.allNFTs(i).call();
                this.setState({NFTs: [...this.state.NFTs, nft],});
                const auction = await NFTContract.methods.AuctionsOfNFT(i).call();
                this.setState({Auctions: [...this.state.Auctions, auction],})
            }

            let NFTNumOfAccount = await NFTContract.methods.getTotalNumberOfTokensOwnedByAnAddress(this.state.accountAddress).call();
            this.setState({NFTNumOfAccount});
            this.setState({loading: false});
          }
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (  
       
      <div className="App">
        <Navi
          accountAddress = {this.state.accountAddress}
          accountBalance = {this.state.accountBalance}
          NFTCount = {this.state.NFTCount}
          NFTContract = {this.state.NFTContract}
          NFTs = {this.state.NFTs}
          NFTNumOfAccount = {this.state.NFTNumOfAccount}
          Auctions = {this.state.Auctions}
        />
      </div>
    );
  }
}

export default App;
