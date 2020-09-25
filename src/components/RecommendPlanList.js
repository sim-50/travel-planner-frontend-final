import React from 'react';
import { Table, Space, Button } from 'antd';

class RecommendPlanList extends React.Component {
    columns= [
        {
          title: 'Name',
          dataIndex: 'name',
          width: '18%',
        },
        {
          title: 'Days',
          dataIndex: 'days',
          width: '2%',
          sorter: (a, b) => a.days - b.days,
        },
        {
          title: 'Description',
          dataIndex: 'description',
          width: '40%',
        },
        {
          title: 'Actions',
          key: 'action',
          width: '40%',
          render: () => 
          <Space size="middle">
            <a>Details</a>
            <a>Show in map</a>
            <a>Save</a>
          </Space>
        },
      ];
  
    data = [
      {
        key: 0,
        name: "Life's journey after graduation",
        days: 7,
        description: 'Driving through New York and chill with friends',
      },
      {
        key: 1,
        name: "New York City Vacation Travel Guide",
        days: 5,
        description: '10 top places you have to go!',
      },
      {
        key: 2,
        name: "Short Weekend in New York City",
        days: 3,
        description: 'The perfect three leisure places on one three-days weekend short trip. ',
      },
      {
        key: 3,
        name: "Culture trip in new york",
        days: 4,
        description: 'Learning histories and cultures from museums in new york!',
      }
    ];
  
    render() {
        return(
            <div className='tableContainer'>
                <Table
                    columns={this.columns}
                    dataSource={this.data}
                    pagination={{ pageSize: 5 }}
                />
            </div>
            
        );  
    }
}

export default RecommendPlanList;

  
 