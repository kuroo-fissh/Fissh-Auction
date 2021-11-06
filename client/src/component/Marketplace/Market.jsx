import React, { Component } from "react";
import { Divider, Space, Card, Col, Row } from 'antd';
import { ReactDOM } from "react";
import NFTinfo from "./NFTinfo";
import { AlignCenterOutlined } from "@ant-design/icons";

const { Meta } = Card;
const Market = ({
  NFTs,
  accountAddress,
  NFTCount,
  NFTContract,
  Auctions,
})=> {
    return(
        <div className="site-card-wrapper">
          <h1>Total number of NFTs: {NFTCount} </h1>
          <Space size={[8, 32]} wrap direction = "horizontal">
                  {new Array(4).fill(null).map((_, index) => {
                    const key = index + 1;
                    return (
                      <Space direction="horizontal" size = {"middle"} >
                        <Card title="NFT Name: Fishcoin" style={{width : 300}}>
                          <p> NFT id:</p>
                          <p> NFT minter:</p>
                          <p> NFT Current Owner:</p>
                          <p> NFT Previous Owner:</p>
                          <p> NFT Price:</p>
                          <p> NFT On Sale: </p>
                        </Card>
                      </Space>
                    )
                  })}
          </Space>
          <Divider orientation="right">Hello</Divider>
       </div>
    ) 
}
export default Market;
