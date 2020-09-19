import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/SearchResult.css';
import { Menu, Dropdown, Button, Input, message, Tooltip, Tag, Table} from 'antd';
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
            width: '40%'
            // render: text => <a>{text}</a>,
        },
        {
            title: 'Type',
            dataIndex: 'types',
            width: '40%',
            render: types => types.map((key, index) => {
                return (
                    <Tag key={index} name={key}>
                        {key}
                    </Tag>
                )
            })
        },
        {
            title: 'rating',
            dataIndex: 'rating',
            width: '20%'
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
            this.props.updateWaypoints(selectedRows);
            //console.log("clicked", selectedRows);
            console.log(selectedRowKeys);
        },
    };

    //* filter by type
    filterByType = (e) => {
        const type = e.item.props.name;
        
        message.info('Display all ' + type + ' locations');
        this.props.filterByType(type);
    }

    //* filter by name
    filterByName = (value) => {
        this.props.filterByName(value);
    }

    render() {
        const { citySearchResult, selectedList, allTypes } = this.props;

        const menus = allTypes.map((key, index) => {
            return (
              <Menu.Item key={index} name={key} onClick={this.filterByType}>
                {key}
              </Menu.Item>
            )
          });

        const menu = () => {
            return (
                <Menu>
                    {menus}
                </Menu>
            )
        }

        return (
            <div>
                <div className="filterContainer" style={{ display: "flex", width: 420 }}>
                    <Dropdown overlay={menu}>
                        <Button>
                            Type <DownOutlined />
                        </Button>
                    </Dropdown>

                    <Input
                        style={{ marginLeft: 10 }}
                        placeholder="filter by name"
                        onChange={e => this.filterByName(e.target.value)}   //? onChange or onSearch need to be discussed
                    />
                </div>

                <div className='tableContainer'>
                    <Table
                        rowSelection={{ ...this.rowSelection }}
                        columns={this.columns}
                        dataSource={citySearchResult}
                        pagination={{ pageSize: 5 }}
                    />
                    <Tooltip title="Search Route">
                        <Button
                            className="search-route" type="primary" shape="circle" size="large"
                            disabled={selectedList.length < 2 ? true : false}
                            onClick={this.props.sendRequest}
                            icon={<IconFont type="icon-route" style={{ fontSize: "40px" }}
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
