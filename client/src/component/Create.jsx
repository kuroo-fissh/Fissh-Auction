import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import {create} from 'ipfs-http-client';
import Grid from 'antd/lib/card/Grid';
import { Input } from 'antd';
import { Button } from 'antd';
import Navi from './Navi';

const { TextArea } = Input;
const onChange = e => {
  console.log(e);
};

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        NFTName: ""
    }    
  }

  onSubmit = async(event) =>{
    event.preventDefault();
    console.log("----------name:" + this.state.NFTName);
    this.props.NFTContract.methods.mintNFT(this.state.NFTName,0).send({from: this.props.accountAddress, gas: '3000000'});
    console.log("name:" + this.state.NFTName);
  }

  render(){
      return(
        <div>
          <h1>
            Please enter your NFT name:
          </h1>
          <form onSubmit = {this.onSubmit}>
            <input
              required
              type="text"
              value={this.state.NFTName}
              className="form-control"
              placeholder="Enter Your NFT's Name"
              onChange={(e) =>
                this.setState({ NFTName: e.target.value })
              }
            />
            <button type="submit">
                Submit
            </button>
          </form>  
        </div>  
      )
    }
}
export default Create;