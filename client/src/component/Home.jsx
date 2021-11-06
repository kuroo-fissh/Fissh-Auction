import React from 'react';

const Home = ({ accountAddress, accountBalance, NFTCount}) => {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-5">Welcome to NFT Auction</h1>
          <hr className="my-4" />
          <p className="lead">Account Address :</p>
          <h4>{accountAddress}</h4>
          <p className="lead">Account Balance :</p>
          <h4>{accountBalance} ETH</h4>
          <p>NFT count of accout:</p>
          <h4>{NFTCount}</h4>
        </div>
      </div>
    );
  };

export default Home;