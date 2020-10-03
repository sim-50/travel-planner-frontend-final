import React, { Component } from 'react';
import { Table, Space,Tabs,Button, Timeline } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import axios from "axios";
import { Travel_Plan_BASE_URL } from "../constant";
import history from "../history";

const { TabPane } = Tabs;

class RecommendPlanList extends Component {
    state = {
      modalVisible: false,
      selectedPlanName: "",
      selectedPlanDetail: [],
      isSaved: false,
      saveStatus: "Save",
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
                console.log(record.planDetail);
                this.setPlanDetail(record.planDetail);
                this.setPlanName(record.name);
                }}>
                Details
              </Button>
              <Button onClick={()=>{
                this.props.showOnMap(record.planDetail);
              }}>Show on map</Button>
              <Button 
                disabled = {this.state.isSaved}
                onClick = {()=>{
                  //take care!! check whether record.key is planid in planList when integration
                  const username = JSON.parse(localStorage.getItem('userInfo')).userName;
                  const url = Travel_Plan_BASE_URL + `/saverecommendedplan?username=${username}&planid=${record.key}`
                  axios
                    .post(url)
                    .then((res) => {
                      console.log(res.data)
                      if(res.data.responseCode === 500){
                        Modal.error({
                          Title: 'An error occurred! Try it again.'
                        })
                      } else if(res.status === 200){
                          this.setState({
                            isSaved: true,
                            saveStatus: "Saved"
                          });
                          history.push('/savedRoute');
                        }
                      })
                    .catch((error) =>{
                      console.log(error)
                    })
                }}>{this.state.saveStatus}</Button>
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
                    //dataSource={this.props.planList}
                    dataSource = {this.props.recommendPlanList}
                    pagination={{ pageSize: 5 }}
                />
                <Modal
                  className = "jsj"
                  title={this.state.selectedPlanName}
                  cancelButtonStyle = {{width:"100px"}}
                  style={{float: "left", marginLeft:"3%", top:"30%"}}
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

  
 