import React, {useRef} from 'react';
import type {ProDescriptionsActionType} from '@ant-design/pro-components';
import {ProDescriptions, ProFormSelect} from '@ant-design/pro-components';
import {FormValueType} from "@/pages/service/components/CreateForm";
import {Button, Divider, Drawer, Popconfirm, Space} from "antd";
import {PoweroffOutlined, SyncOutlined} from "@ant-design/icons";
import {ProxyTagList, ProxyTypeValueEnum} from "@/enum/service";


export type DetailProps = {
  onCancel: () => void;
  onDelete: (values: FormValueType) => Promise<void>;
  onSubmit: (values: FormValueType) => Promise<void>;
  detailVisible: boolean;
  values: Partial<Service.Proxy>;
};

const DetailDrawer: React.FC<DetailProps> = (props) => {
  const actionRef = useRef<ProDescriptionsActionType>();

  return <Drawer
    title="服务详情"
    width={"39%"}
    onClose={props.onCancel}
    open={props.detailVisible}
    extra={
      props.values.status === 2 ? <Button
        type={"primary"}
        shape={"round"}
        icon={<SyncOutlined spin={false}/>}
        onClick={async () => {
          props.values.status = 4;
          await props.onSubmit(props.values);
        }}
      >启动</Button> : <Button
        type={"primary"}
        shape={"round"}
        danger
        onClick={() => {
          props.values.status = 2;
          props.onSubmit(props.values);
        }}
        icon={<PoweroffOutlined/>}>停止</Button>
    }
    footer={
      <Space style={{float: "right"}}><Button type={"primary"} onClick={() => {
        props.onSubmit(props.values);
      }}>更新</Button>
        <Popconfirm
          title="删除服务"
          onConfirm={() => {
            props.onDelete(props.values);
          }}
          okText="确认"
          cancelText="取消"
        >
          <Button type={"primary"} danger>删除</Button>
        </Popconfirm>
       </Space>
    }
  >
    <ProDescriptions
      title={"基本信息"}
      column={2}
      actionRef={actionRef}
      editable={{
        onSave: async (keypath, newInfo, oriInfo) => {
          props.values[keypath.toString()] = newInfo[keypath.toString()];
          return true;
        },
      }}
      columns={[
        {
          title: '当前状态',
          key: 'status',
          editable: false,
          dataIndex: 'Status',
          span: 2,
          render: (dom, entry) => {
            return ProxyTagList[entry.status ? entry.status : 0];
          }
        },
        {
          title: '代理名称',
          key: 'text',
          editable: false,
          dataIndex: 'Name',
        },
        {
          title: '代理类型',
          dataIndex: 'Type',
          render: (dom: any, entity: any, index: any, action: any) => {
            return ProxyTypeValueEnum[entity.Type]
          },
          renderFormItem: () => {
            return <ProFormSelect
              name="Type"
              width="md"
              placeholder={""}
              valueEnum={ProxyTypeValueEnum}
            />
          },
        },
        {
          title: '监听地址',
          key: 'text',
          dataIndex: 'ListenAddr',
        },
        {
          title: '监听端口',
          key: 'text',
          dataIndex: 'ListenPort',
        },
        {
          title: '创建时间',
          key: 'date',
          valueType: "dateTime",
          editable: false,
          dataIndex: 'CreatedAt',
        },
        {
          title: '修改时间',
          key: 'date',
          valueType: "dateTime",
          editable: false,
          dataIndex: 'UpdatedAt',
        }
      ]}
      dataSource={props.values}
    />
    <Divider/>
    <ProDescriptions
      title={"关联信息"}
      column={1}
      actionRef={actionRef}
      editable={{
        onSave: async (keypath, newInfo, oriInfo) => {
          props.values[keypath.toString()] = newInfo[keypath.toString()];
          return true;
        },
      }}
      columns={[
        {
          title: '关联云账户信息',
          key: 'text',
          editable: false,
          render: (dom, entity) => {
            return <a> 云账户详情 </a>
          },
        },
        {
          title: '关联函数实例信息',
          key: 'text',
          editable: false,
          render: (dom, entity) => {
            return <a> 函数实例详情 </a>
          },
        }
      ]}
      dataSource={props.values}
    />
    <Divider/>
    <ProDescriptions
      title={"网络数据"}
      column={3}
      actionRef={actionRef}
      columns={[
        {
          title: '请求连接数',
          key: 'number',
          editable: false,
          dataIndex: 'Conn',
        },
        {
          title: '当前速率',
          key: 'number',
          editable: false,
          dataIndex: 'Speed',
          render: (dom, entity) => {
            return entity.speed + " Mbps"
          }
        },
        {
          title: '当前延迟',
          key: 'number',
          editable: false,
          dataIndex: 'Lag',
          render: (dom, entity) => {
            return entity.lag + " ms"
          }
        },
      ]}
      dataSource={props.values}
    >
      <ProDescriptions.Item
        label="24小时流量数据"
        span={3}
      >

      </ProDescriptions.Item>
      <ProDescriptions.Item
        label="其他图形"
        span={3}
      >

      </ProDescriptions.Item>
    </ProDescriptions>
    <Divider/>
  </Drawer>
}

export default DetailDrawer
