import React, { Component } from 'react';
import { Transfer, Switch, Table, Tag } from 'antd';
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const items = [];
for (let i = 0; i < 20; i++) {
  items.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  });
}

const TableSource = ( { items, onItemSelect, listSelectedKeys, ...restProps } ) => {
    return (
        <Table
            showHeader={ false }
            pagination={ false }
            dataSource={ items }
            size="small"
            onRow={ ( { key }, idx ) => ( {
                index: idx,
                onClick: () => {
                    onItemSelect( key, !listSelectedKeys.includes( key ) );
                }
            } ) }
            { ...restProps }
        />
    );
};

const TableTarget = ( { items, onItemSelect, listSelectedKeys, currentTargetKeys, updateTargetKeys, ...restProps } ) => {

    const rowDrop = ( dragIndex, hoverIndex ) => {
        let newKeys = [ ...currentTargetKeys ];
        const dragRow = newKeys[ dragIndex ];
        // remove existing drag item from it's place
        newKeys.splice( dragIndex, 1 );
        // insert drag into new place
        newKeys.splice( hoverIndex, 0, dragRow );
        // update state
        updateTargetKeys( newKeys );
    };

    return (
        <DndProvider backend={ HTML5Backend }>
            <Table
                showHeader={ false }
                pagination={ false }
                dataSource={ items }
                components={ {
                    body: {
                        row: DragableBodyRow,
                    },
                } }
                size="small"
                onRow={ ( { key }, idx ) => ( {
                    index: idx,
                    rowDrop,
                    onClick: () => {
                        onItemSelect( key, !listSelectedKeys.includes( key ) );
                    }
                } ) }
                { ...restProps }
            />
        </DndProvider>
    );
};

const DragableBodyRow = ( { index, rowDrop, className, style, ...restProps } ) => {
  const ref = React.useRef();
  const [ { isOver, dropClassName }, drop ] = useDrop( {
    accept: 'DragableBodyRow',
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if ( dragIndex === index ) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      rowDrop( item.index, index );
    },
  } );
  const [ , drag ] = useDrag( {
    item: { type: 'DragableBodyRow', index },
    collect: monitor => ( {
      isDragging: monitor.isDragging(),
    } ),
  } );
  drop( drag( ref ) );
  return (
    <tr
      ref={ ref }
      className={ `${ className }${ isOver ? dropClassName : '' } draggable` }
      style={ { cursor: 'move', ...style } }
      { ...restProps }
    />
  );
};

class SortedTransfer2 extends React.Component {
    state = {
        selectedKeys: [],
        disabled: false,
    };
    render() {
        const { selectedKeys, disabled } = this.state;
        return (
            <>
                <Transfer
                    dataSource={ items }
                    showSelectAll={ showSelectAll }
                    showSearch={ showSearch }
                    onChange={ updateTargetKeys }
                    { ...restProps }
                >
                {
                    ( {
                        direction,
                        filteredItems,
                        onItemSelect,
                        selectedKeys: listSelectedKeys
                    } ) => {

                        // rename left/right column to more memorable names since we're flip-flopping them
                        const displayType = direction === 'right' ? 'target' : 'source';

                        const rowSelection = {
                            onSelect( { key }, selected ) {
                                onItemSelect( key, selected );
                            },
                            selectedRowKeys: listSelectedKeys
                        };

                        if ( displayType === 'source' ) {
                            return (
                                <TableSource
                                    rowSelection={ rowSelection }
                                    columns={ columns }
                                    items={ filteredItems }
                                    onItemSelect={ onItemSelect }
                                    listSelectedKeys={ listSelectedKeys }
                                />
                            );
                        } else {
                            const sortedTargetItems = currentTargetKeys.map( key => {
                                const fullItem = filteredItems.find( item => item.key === key );
                                return fullItem || {
                                    key
                                };
                            } ) || [];
                            return (
                                <TableTarget
                                    rowSelection={ rowSelection }
                                    columns={ columns }
                                    items={ sortedTargetItems }
                                    onItemSelect={ onItemSelect }
                                    listSelectedKeys={ listSelectedKeys }
                                    currentTargetKeys={ currentTargetKeys }
                                    updateTargetKeys={ updateTargetKeys }
                                />
                            );
                        }

                    }
                }
                </Transfer>
            </>
        );
    }
}

export default SortedTransfer2;