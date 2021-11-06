import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import React from 'react';
import { ReactDOM } from 'react';
import { Layout, Menu, Breadcrumb, Card } from 'antd';
import { Link } from "react-router-dom";
import {routerRedux} from 'dva/router';
import Market from './Marketplace/Market';
import Create from './Create';
import Home from './Home';
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

class Navi extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
    current: 'marketplace',
    selected: 0,
    };
  }
  

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
        <Layout className="site-layout">
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" onClick>
      <Menu.Item key="0" icon={<MailOutlined /> } onClick={(item)=>{this.setState({selected:item.key})}}>
         Home
        </Menu.Item>
        <Menu.Item key="1" icon={<MailOutlined /> } onClick={(item)=>{this.setState({selected:item.key})}}>
          Marketplace
        </Menu.Item>
        <Menu.Item key="2" icon={<AppstoreOutlined />} onClick={(item)=>{this.setState({selected:item.key})}}>
          My tokens
        </Menu.Item>
        <Menu.Item key="alipay">
          <a href="https://www.bilibili.com" target="_blank" rel="noopener noreferrer">
            二二时间到
          </a>
        </Menu.Item>
        
      </Menu>
      
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" >
                {(this.state.selected=='0') && <Home
                  accountAddress = {this.props.accountAddress}
                  accountBalance = {this.props.accountBalance}
                  NFTCount = {this.props.NFTCount}
                />}
                {(this.state.selected=='1') && <Market
                  NFTCount = {this.props.NFTCount}
                />}
                {(this.state.selected=='2') && <Create
                  NFTCount = {this.state.NFTCount}
                />}
            </div>
          </Content>
        </Layout>
    );
  }
}
export default Navi;
