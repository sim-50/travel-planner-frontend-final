import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/SearchResult.css';
import { Timeline, Radio, Checkbox, Table } from 'antd';
import { Menu, Dropdown, Button, Input, message, Tooltip } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
    scriptUrl: [
      '//at.alicdn.com/t/font_2064551_fho540f8c18.js' // Search route icon
    ],
  });

class LocationOptionList extends Component {
    // set the table header name
    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            // render: text => <a>{text}</a>,
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
    ];
    
    // rowSelection object indicates the need for row selection
    rowSelection = {
        preserveSelectedRowKeys: true,              //* Keep selection key even when it removed from dataSource
        onChange: (selectedRowKeys, selectedRows) => {
            //* selectedRowKeys indicates the id for the selected row
            //* selectedRows indicates the objects array of all the selected rows
            //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            this.props.updateSelectedLocation(selectedRowKeys);
            console.log(selectedRowKeys);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    //* filter by type
    filterByType = (e) => {
        const type = e.item.props.name;

        message.info('Display all ' + type + ' locations');
        this.props.filterByType(type);
    }

    menu = (
        <Menu onClick={this.filterByType}>
            <Menu.Item key="1" name="">
                All
            </Menu.Item>
            <Menu.Item key="2" name="museum">
                Museum
            </Menu.Item>
            <Menu.Item key="3" name="restaurant">
                Restaurant
            </Menu.Item>
            <Menu.Item key="4" name="bar">
                Bar
            </Menu.Item>
        </Menu>
    );

    //* filter by name
    filterByName = (value) => {
        this.props.filterByName(value);
    }

    render() {
        const { citySearchResult, selectedList } = this.props;
        return (
            <div>
                <div className="filterContainer" style={{ display:"flex", width: 420}}>
                    <Dropdown overlay={this.menu}>
                        <Button>
                            Type <DownOutlined />
                        </Button>
                    </Dropdown>

                    <Input 
                        style={{ marginLeft:10 }} 
                        placeholder="filter by name or description" 
                        onChange={e => this.filterByName(e.target.value)}   //? onChange or onSearch need to be discussed
                        enterButton 
                    />
                </div>

                <div className='tableContainer'>
                    <Table
                        rowSelection={{ ...this.rowSelection }}
                        columns={this.columns}
                        dataSource={citySearchResult}
                    />
                    <Tooltip title="Search Route">
                        <Button 
                            className="search-route" type="primary" shape="circle" size="large" 
                            disabled={selectedList.length < 2 ? true : false} 
                            icon={<IconFont type="icon-route" style={{fontSize: "40px"}} 
                            />}></Button>
                    </Tooltip>
                </div>
            </div>
        );
    }
}

//! The traversal plan display style(for further consideration)
// const LocationOptionList = ({ timeline }) => {
//     const [mode, setMode] = useState('left');
    
//     const onChange = e => {
//         setMode(e.target.value);
//     };
    
//     return (
//     <div className="container" style={{maxWidth:350}}>
//         <Radio.Group
//             onChange={onChange}
//             value={mode}
//             style={{
//                 marginBottom: 20,
//             }}
//         >
//             <Radio value="left">Left</Radio>
//             <Radio value="right">Right</Radio>
//             <Radio value="alternate">Alternate</Radio>
//         </Radio.Group>

//         <Timeline mode={mode}>
//             <Timeline.Item label={timeline[0].arrivedTime}>{timeline[0].name}</Timeline.Item>
//             <Timeline.Item label={timeline[1].arrivedTime}>{timeline[1].name}</Timeline.Item>
//             <Timeline.Item label={timeline[2].arrivedTime}>{timeline[2].name}</Timeline.Item>
//             <Timeline.Item label={timeline[3].arrivedTime}>{timeline[3].name}</Timeline.Item>
//             <Timeline.Item label={timeline[4].arrivedTime}>{timeline[4].name}</Timeline.Item>
//         </Timeline>
//     </div>
//     );
// }

LocationOptionList.propTypes = {
    citySearchResult: PropTypes.array.isRequired,
}

export default LocationOptionList;
