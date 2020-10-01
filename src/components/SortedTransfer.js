import React, { Component } from 'react';
import { Transfer, Switch, Table, Tag } from 'antd';
import difference from 'lodash/difference';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';



// drag sort related components
const DragHandle = sortableHandle(() => (
    <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
));
const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);




const mockTags = ['cat', 'dog', 'bird'];

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    // disabled: i % 4 === 0,
    disabled: false,
    tag: mockTags[i % 3],
  });
}

const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

const leftTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
  {
    dataIndex: 'tag',
    title: 'Tag',
    render: tag => <Tag>{tag}</Tag>,
  },
  {
    dataIndex: 'description',
    title: 'Description',
  },
];
const rightTableColumns = [
    {
        title: 'Sort',
        dataIndex: 'sort',
        width: 30,
        className: 'drag-visible',
        render: () => <DragHandle />,
    },
    {
        dataIndex: 'title',
        title: 'Name',
    },
    {
        dataIndex: 'tag',
        title: 'Tag',
        render: tag => <Tag>{tag}</Tag>,
    },
    {
        dataIndex: 'description',
        title: 'Description',
    },
];

class SortedTransfer extends React.Component {
  state = {
    targetKeys: originTargetKeys,
    disabled: false,
    showSearch: false,
    // added one dataSource field for onSortEnd & DraggableBodyRow
    dataSource: mockData,
  };

  // drag sort related function 1
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { dataSource } = this.state;
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
      console.log('Sorted items: ', newData);
      this.setState({ dataSource: newData });
    }
  };
  // drag sort related function 2
  DraggableBodyRow = ({ className, style, ...restProps }) => {
    const { dataSource } = this.state;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(x => x.index === restProps['data-row-key']);
    return <SortableItem index={index} style = {{zIndex: 10000000000000}} {...restProps} />;
  };

  onChange = nextTargetKeys => {
    this.setState({ targetKeys: nextTargetKeys });
  };

  // check if the disappeared items are still there,
  // if console log all the items when check all boxes, then they're still there
  // the reason why not showing up may be the z-index
//   handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
//     this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

//     console.log('sourceSelectedKeys: ', sourceSelectedKeys);
//     console.log('targetSelectedKeys: ', targetSelectedKeys);
//   };

  triggerDisable = disabled => {
    this.setState({ disabled });
  };

  triggerShowSearch = showSearch => {
    this.setState({ showSearch });
  };

  render() {
    const { targetKeys, disabled, showSearch } = this.state;

    // drag sort related component
    const DraggableContainer = props => (
        <SortableContainer
          useDragHandle
          helperClass="row-dragging"
          onSortEnd={this.onSortEnd}
          {...props}
        />
    );

    // Customize Table Transfer
    const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
        <Transfer {...restProps} showSelectAll={false}>
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
                components={{
                    body: {
                      wrapper: DraggableContainer,
                      row: this.DraggableBodyRow,
                    },
                }}
            />
            );
        }}
        </Transfer>
    );

    return (
      <>
        <TableTransfer
          dataSource={mockData}
          targetKeys={targetKeys}
          disabled={disabled}
          showSearch={showSearch}
          onChange={this.onChange}
          onSelectChange={this.handleSelectChange}
          filterOption={(inputValue, item) =>
            item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          }
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
        />
        <Switch
          unCheckedChildren="disabled"
          checkedChildren="disabled"
          checked={disabled}
          onChange={this.triggerDisable}
          style={{ marginTop: 16 }}
        />
        <Switch
          unCheckedChildren="showSearch"
          checkedChildren="showSearch"
          checked={showSearch}
          onChange={this.triggerShowSearch}
          style={{ marginTop: 16 }}
        />
      </>
    );
  }
}

export default SortedTransfer;