import React from 'react';
import { Menu, Dropdown, Button, Radio, Input, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Search: SearchField } = Input;

function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
}

const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">
            Museum
        </Menu.Item>
        <Menu.Item key="2">
            Restaurant
        </Menu.Item>
        <Menu.Item key="3">
            Hotel
        </Menu.Item>
    </Menu>
);

const Search = () => {
    return (
        <div>
            <div style={{ padding:10, display:"flex"}}>
                <Dropdown overlay={menu}>
                    <Button>
                        Filter <DownOutlined />
                    </Button>
                </Dropdown>

                <SearchField style={{marginLeft:10}} placeholder="input search text" onSearch={value => console.log(value)} enterButton />
            </div>
            <div className="btn-group">
                <Radio.Group>
                    <Radio.Button>name</Radio.Button>
                    <Radio.Button>type</Radio.Button>
                    <Radio.Button>description</Radio.Button>
                </Radio.Group>
            </div>
        </div>
    );
}

export default Search;
