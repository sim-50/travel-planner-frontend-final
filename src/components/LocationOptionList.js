import React, { useState,Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/SearchResult.css';
import { Timeline, Radio, Checkbox, Table } from 'antd';

// set the table header name
const columns = [
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

const mockData = [
    {
        key: '1',
        name: 'LA Staple Center',
        type: 'museum',
        description: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        type: 'bar',
        description: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        type: 'restaurant',
        description: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Universal Park',
        type: 'park',
        description: 'Sidney No. 1 Lake Park',
    },
    {
        key: '5',
        name: 'Chinatown LA',
        type: 'park',
        description: 'Sidney No. 1 Lake Park',
        position:{lat:34.0623, lng: -118.2383}
    },
];

// rowSelection object indicates the need for row selection
// const rowSelection = {
//     onChange: (selectedRowKeys, selectedRows) => {
//         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//     },
//     getCheckboxProps: record => ({
//         disabled: record.name === 'Disabled User', // Column configuration not to be checked
//         name: record.name,
//     }),
// };

class LocationOptionList extends Component  {

    state = {
        selectedRowKeys: [],
      };
    
    onChange = (selectedRowKeys,selectedRows) => {
        this.setState({ selectedRowKeys });
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.props.onSelectionChange(selectedRowKeys, selectedRows);
    }

    render(){
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onChange,
          };
        return (
            <div className='tableContainer'>
                <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={this.props.resultCityList}
                />
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
    timeline: PropTypes.array.isRequired,
}

export default LocationOptionList;
