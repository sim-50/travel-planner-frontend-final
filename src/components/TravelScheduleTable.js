import React, { Component } from 'react';
import { Transfer, Table, Tag } from 'antd';
import difference from 'lodash/difference';
import "../styles/SearchResult.css";


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

class TravelScheduleTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            targetKeys: [],  //* A set of keys of elements that are listed on the right column
            dataResource: [],
            paneKey: 0,
        };
    }

    //* Methods for the TableTransfer widget
    onChange = nextTargetKeys => {
        const { targetKeys, paneKey } = this.state;

        console.log(nextTargetKeys);

        if (nextTargetKeys.length > targetKeys.length) {
            // left -> right 
            this.props.itemTransferToLocal(nextTargetKeys, paneKey);
        } else {
            // right -> left
            const removeList = [];
            for (let i = 0; i < targetKeys.length; i++) {
                if (!nextTargetKeys.includes(targetKeys[i])) {
                    removeList.push(targetKeys[i]);
                }
            }
            this.props.itemTransferToGlobal(removeList, paneKey);
        }

        this.setState({
            targetKeys: nextTargetKeys,
        });
    };

    render() {
        const { targetKeys } = this.state;

        return (
            <div className="travelScheduleContainer">
                <TableTransfer
                    dataSource={this.props.selectedAttractions}
                    targetKeys={targetKeys}
                    onChange={this.onChange}
                    leftColumns={leftTableColumns}
                    rightColumns={rightTableColumns}
                />
            </div>
        )
    }

    componentDidMount() {
        const { selectedAttractions, paneKey } = this.props;
        this.setState({
            dataResource: selectedAttractions,
            paneKey
        });
    }
}

export default TravelScheduleTable;
