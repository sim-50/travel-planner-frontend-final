import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "../styles/SearchResult.css";
import { Transfer, Switch, Table, Tag, Tabs } from 'antd';
import difference from 'lodash/difference';

const { TabPane } = Tabs;

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


class TravelSchedulePanel extends Component {

    newTabIndex = 0;

    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const initialPanes = [
            { title: 'Day 1', content: 'Content of Tab Day 1', key: '1' },
        ];
        this.state = {
            activeKey: initialPanes[0].key,
            panes: initialPanes,

            //targetKeys: originTargetKeys
            targetKeys: [],
            dataResource: [],
        };
    }

    onChangeForTab = activeKey => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        const newPanes = [...panes];
        newPanes.push({ title: `Day ${panes.length + 1}`, content: `Content of Tab Day ${panes.length + 1}`, key: activeKey });
        this.setState({
            panes: newPanes,
            activeKey,
        });
    };

    remove = targetKey => {
        const { panes, activeKey } = this.state;
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        this.setState({
            panes: newPanes,
            activeKey: newActiveKey,
        });
    };

    onChange = nextTargetKeys => {
        this.setState({ targetKeys: nextTargetKeys });
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

        this.setState({ 
            dataResource: data,
        });
    };

    render() {
        const { targetKeys, panes, activeKey } = this.state;

        return (
            <div className="tabsContainer">
                <Tabs
                    type="editable-card"
                    onChange={this.onChangeForTab}
                    activeKey={activeKey}
                    onEdit={this.onEdit}
                >
                    {panes.map(pane => (
                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                            <div className="travelScheduleContainer">
                                <TableTransfer
                                    dataSource={this.state.dataResource}
                                    targetKeys={targetKeys}
                                    onChange={this.onChange}
                                    leftColumns={leftTableColumns}
                                    rightColumns={rightTableColumns}
                                />
                            </div>
                        </TabPane>
                    ))}
                </Tabs>
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
