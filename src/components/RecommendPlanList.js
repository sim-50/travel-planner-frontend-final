import React, { Component } from 'react';
import { Table, Space,Tabs,Button, Timeline } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import axios from "axios";
import { Travel_Plan_BASE_URL } from "../constant";

const { TabPane } = Tabs;

class RecommendPlanList extends Component {
    state = {
      modalVisible: false,
      selectedPlanName: "",
      selectedPlanDetail: [],
    };

    setModalVisible(modalVisible) {
      this.setState({ modalVisible });
      
    }

    setPlanDetail = (routes) =>{
      this.setState( {selectedPlanDetail: routes });
    }

    setPlanName = (planName) =>{
      this.setState({selectedPlanName: planName});
    }
    

    columns= [
        {
          title: 'Name',
          dataIndex: 'name',
          width: '40%',
        },
        {
          title: 'Days',
          dataIndex: 'days',
          width: '5%',
          sorter: (a, b) => a.days - b.days,
        },
        {
          title: 'Actions',
          key: 'action',
          width: '55%',
          render: (record) => (
            <Space size="middle">
              <Button onClick={() => {
                this.setModalVisible(true);
                this.setPlanDetail(record.planDetail);
                this.setPlanName(record.name);
              }}>
                Details
              </Button>
              <Button onClick={()=>{
                this.props.showOnMap(record.planDetail);
              }}>Show on map</Button>
              <Button onClick = {()=>{
                //still need to double check!!
                const planObject = {
                  name: record.name,
                  days: record.days,
                  planDetail: record.planDetail,
                };
                //here username and planid are hardcode!!
                const url = Travel_Plan_BASE_URL + `/saverecommendedplan?username=test&planid=10`
                axios
                  .post(url, planObject)
                  .then((res) => {
                    console.log(res.data)
                  })
                  .catch((error) =>{
                    console.log(error)
                  })
              }}>Save</Button>
            </Space>
          )
        },
      ];
    
    render() {
        return(
            <div className='tableContainer'>
                <Table
                    bodyStyle={{fontSize:"6em"}}
                    className = 'tableChild'
                    columns={this.columns}
                    dataSource={this.props.planList}
                    //dataSource = {this.props.recommendedPlanList}
                    pagination={{ pageSize: 5 }}
                />
                <Modal
                  className = "jsj"
                  title={this.state.selectedPlanName}
                  cancelButtonStyle = {{width:"100px"}}
                  style={{margin:"10% 30%"}}
                  visible={this.state.modalVisible}
                  onOk={() => this.setModalVisible(false)}
                  onCancel={() => this.setModalVisible(false)}
                >
                  <Tabs defaultActiveKey="1" tabPosition="top" onChange={(key) =>{console.log(key)}}>
                    {this.state.selectedPlanDetail.map(i => (
                      <TabPane tab={`Day ${i.day}`} key={i.day}>
                        <Timeline>
                          {
                            i.route.map(j =>(
                              <Timeline.Item>{j.name}</Timeline.Item>
                            ))
                          }
                        </Timeline>
                      </TabPane>
                    ))}
                  </Tabs>
                </Modal>
            </div>
            
        );  
    }
}

export default RecommendPlanList;

  
 