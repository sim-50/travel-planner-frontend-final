import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "../styles/SearchResult.css";
import { Transfer, Switch, Table, Tag } from 'antd';
import difference from 'lodash/difference';


// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps} showSelectAll={true}>
        {({
            direction,
            filteredItems,
            onItemSelectAll,
            onItemSelect,
            selectedKeys: listSelectedKeys,
            disabled: listDisabled,
        }) => {
            const columns = direction === 'left' ? leftColumns : rightColumns;

            const rowSelection = {
                getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
                onSelectAll(selected, selectedRows) {
                    const treeSelectedKeys = selectedRows
                        .filter(item => !item.disabled)
                        .map(({ key }) => key);
                    const diffKeys = selected
                        ? difference(treeSelectedKeys, listSelectedKeys)
                        : difference(listSelectedKeys, treeSelectedKeys);
                    onItemSelectAll(diffKeys, selected);
                },
                onSelect({ key }, selected) {
                    onItemSelect(key, selected);
                },
                selectedRowKeys: listSelectedKeys,
            };

            return (
                <Table 
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filteredItems}
                    size="small"
                    style={{ pointerEvents: listDisabled ? 'none' : null }}
                    onRow={({ key, disabled: itemDisabled }) => ({
                        onClick: () => {
                            if (itemDisabled || listDisabled) return;
                            onItemSelect(key, !listSelectedKeys.includes(key));
                        },
                    })}
                />
            );
        }}
    </Transfer>
);

const mockTags = ['cat', 'dog', 'bird'];

const mockData = [];
for (let i = 0; i < 20; i++) {
    mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: false,
        type: mockTags[i % 3],
    });
}

const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

const leftTableColumns = [
    {
        dataIndex: 'title',
        title: 'Name',
    },
    {
        dataIndex: 'type',
        title: 'Type',
        render: type => <Tag>{type}</Tag>,
    },
    {
        dataIndex: 'rating',
        title: 'Rating',
    },
];
const rightTableColumns = [
    {
        dataIndex: 'title',
        title: 'Name',
    },
    {
        dataIndex: 'type',
        title: 'Type',
        render: type => <Tag>{type}</Tag>,
    },
];


class TravelSchedulePanel extends Component {

    state = {
        targetKeys: originTargetKeys,
        showSearch: false,
        dataResource: [],
    };

    onChange = nextTargetKeys => {
        this.setState({ targetKeys: nextTargetKeys });
    };

    triggerShowSearch = showSearch => {
        this.setState({ showSearch });
    };

    updateDataResource = selectedList => {
        const data = [];
        for (let i = 0; i < selectedList.length; i++) {
            data.push({
                key: selectedList[i].key,
                title: selectedList[i].name,
                rating: selectedList[i].rating,
                disabled: false,
                type: selectedList[i].types[0],
            });
        }

        this.setState({ dataResource: data });
    };

    render() {
        const { targetKeys, disabled, showSearch } = this.state;

        return (
            <div className="travelScheduleContainer">
                <TableTransfer
                    dataSource={this.state.dataResource}
                    targetKeys={targetKeys}
                    disabled={disabled}
                    showSearch={showSearch}
                    onChange={this.onChange}
                    filterOption={(inputValue, item) =>
                        item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
                    }
                    leftColumns={leftTableColumns}
                    rightColumns={rightTableColumns}
                />
                {/* <Switch
                    unCheckedChildren="showSearch"
                    checkedChildren="showSearch"
                    checked={showSearch}
                    onChange={this.triggerShowSearch}
                    style={{ marginTop: 16 }}
                /> */}
            </div>
        );
    }

    componentDidMount() {
        const { selectedList } = this.props;
        this.updateDataResource(selectedList);
    }
}

TravelSchedulePanel.propTypes = {
    selectedList: PropTypes.array.isRequired,
}

export default TravelSchedulePanel;
