import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TravelScheduleTable from './TravelScheduleTable';
import "../styles/SearchResult.css";
import { Tabs } from 'antd';

const { TabPane } = Tabs;

class TravelSchedulePanel extends Component {

    newTabIndex = 0;

    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const initialPanes = [
            { title: 'Day 1', content: 'Content of Tab Day 1', key: '1', closable: false, },    // At least there is 1-day plan.
            { title: 'Day 2', content: 'Content of Tab Day 2', key: '2' },
        ];
        this.state = {
            activeKey: initialPanes[0].key,
            panes: initialPanes,
            selectedAttractions: [],
        };
    }

    //* Methods for the Tab widget
    onChange = activeKey => {
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

    updateDataResource = selectedList => {
        const data = [];
        selectedList.forEach(item => {
            data.push({
                key: item.key,   //? what's the real value of the key per item?
                title: item.name,
                rating: item.rating,
                type: item.types[0],
                paneKey: 0,        //* initially set all items to paneKey 0
            });
        });

        this.setState({
            selectedAttractions: data,
        });
    };

    itemTransferToLocal = (nextTargetKeys, paneKey) => {
        // console.log(nextTargetKeys);

        this.setState({
            selectedAttractions: this.state.selectedAttractions.map(item => {
                if (nextTargetKeys.includes(item.key)) {
                    item.paneKey = paneKey;
                }
                return item;
            }),
        });
    };

    itemTransferToGlobal = (keyList) => {
        // console.log(keyList);

        this.setState({
            selectedAttractions: this.state.selectedAttractions.map(item => {
                if (keyList.includes(item.key)) {
                    item.paneKey = 0;
                }
                return item;
            }),
        });
    }

    render() {
        const { panes, activeKey, selectedAttractions } = this.state;

        return (
            <div className="tabsContainer">
                <Tabs
                    type="editable-card"
                    onChange={this.onChange}
                    activeKey={activeKey}
                    onEdit={this.onEdit}
                >
                    {panes.map(pane => (
                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable} >
                            <TravelScheduleTable
                                itemTransferToLocal={this.itemTransferToLocal}
                                itemTransferToGlobal={this.itemTransferToGlobal}
                                paneKey={pane.key}
                                selectedAttractions={selectedAttractions.filter(item => item.paneKey == 0 || item.paneKey == pane.key)} 
                            />
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
