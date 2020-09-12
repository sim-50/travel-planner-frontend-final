import React from 'react';
import { Menu, Dropdown, Button, Input, message } from 'antd';
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
            Bar
        </Menu.Item>
    </Menu>
);

const Filter = () => {
    return (
        <div>
            <div className="filterContainer" style={{ display:"flex", width: 420}}>
                <Dropdown overlay={menu}>
                    <Button>
                        Type <DownOutlined />
                    </Button>
                </Dropdown>

                <SearchField style={{marginLeft:10}} placeholder="input search text" onSearch={value => console.log(value)} enterButton />
            </div>
        </div>
    );
}

export default Filter;
