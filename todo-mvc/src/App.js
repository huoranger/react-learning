import "./App.css"
import {Input, Table, Popconfirm, Form, Button} from "antd";
import React from "react";
import axios from "axios";

const {Search} = Input;


class App extends React.Component {

  state = {
    columns: [
      {
        title: '电影名',
        dataIndex: 'movie',
        key: 'movie',
      },
      {
        title: '主演',
        dataIndex: 'actor',
        key: 'actor',
      },
      {
        title: '票房',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <Popconfirm onConfirm={() => this.handleDelete(record.id)}>
              <a>Delete</a>
            </Popconfirm>
          )
        }
      }
    ],
    data: [

    ],
    formItemLayout: {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    }
  }

  

  handleDelete = async (id) => {
    await axios.delete(`http://localhost:3333/movie/${id}`);
    this.initList();
  }

  initList = async () => {
    const res = await axios.get("http://localhost:3333/movie");
    const data = res.data.map((elem) => {
      return {
        ...elem,
        key: elem.id
      }
    });
    this.setState({
      data: data
    });
  }

  onSearch = async (key) => {
    const res = await axios.get(`http://localhost:3333/movie?q=${key}`);
    const data = res.data.map((elem) => {
      return {
        ...elem,
        key: elem.id
      }
    })
    this.setState({
      data: data
    })
  }

  componentDidMount() {
    this.initList();
  }


  render() {
    return (
      <div className="app">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={this.onSearch}
        />
        <Table columns={this.state.columns} dataSource={this.state.data} />

        <Form layout={this.state.formItemLayout}>
          <Form.Item label="Field A">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Field B">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default App;
