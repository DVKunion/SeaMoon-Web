import React, {useRef, useState} from 'react';
import type {ProDescriptionsActionType} from '@ant-design/pro-components';
import {ProDescriptions} from '@ant-design/pro-components';
import {FormValueType} from "./CreateForm";
import {Button, Divider, Drawer, Popconfirm, Space} from "antd";
import {CloudProviderStatusEnum, CloudProvideTypeValueEnum, RegionEnum} from "@/enum/cloud";
import {AuthColumns} from "@/pages/cloud/components/AuthForm";
import {SyncOutlined} from "@ant-design/icons";

export type DetailProps = {
  onCancel: () => void;
  onDelete: (values: FormValueType) => Promise<void>;
  onSync: (values: FormValueType) => Promise<void>;
  onSubmit: (values: FormValueType) => Promise<void>;
  detailVisible: boolean;
  values: Partial<Cloud.Provider>;
};

const DetailDrawer: React.FC<DetailProps> = (props) => {
  const actionRef = useRef<ProDescriptionsActionType>();
  const [spin, setSpin] = useState<boolean>(false);

  return <Drawer
    title="云账户详情"
    width={"39%"}
    onClose={props.onCancel}
    destroyOnClose
    open={props.detailVisible}
    extra={<Button shape={"round"}
                   icon={<SyncOutlined spin={spin}/>}
                   onMouseEnter={() => {
                     setSpin(true);
                   }}
                   onMouseLeave={() => {
                     setSpin(false);
                   }}
                   type={"primary"} onClick={() => {
      props.onSync(props.values).then();
    }}>从云端同步数据</Button>}
    footer={
      <Space style={{float: "right"}}><Button type={"primary"} onClick={() => {
        props.onSubmit(props.values).then();
      }}>更新</Button>
        <Popconfirm
          title={"删除账户将会删除对应的函数实例、同时关联的服务也会被停止。确认删除?"}
          onConfirm={() => {
            props.onDelete(props.values).then();
          }}
          okText="确认"
          cancelText="取消"
        > <Button danger type={"primary"}>删除</Button>
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
          title: '账户名称',
          key: 'name',
          dataIndex: 'name',
        },
        {
          title: '所属地域',
          key: 'region',
          editable: false,
          dataIndex: 'region',
          valueEnum: RegionEnum,
        },
        {
          title: '账户状态',
          key: 'status',
          editable: false,
          dataIndex: 'status',
          valueEnum: CloudProviderStatusEnum,
        },
        {
          title: '账户类型',
          dataIndex: 'type',
          valueEnum: CloudProvideTypeValueEnum,
          editable: false,
        },
        {
          title: '账户备注',
          dataIndex: 'desc',
          valueType: 'textarea',
          span: 2,
        },
        {
          title: '创建时间',
          dataIndex: 'created_at',
          valueType: 'dateTime',
          span: 2,
          editable: false,
        },
        {
          title: '更新时间',
          dataIndex: 'updated_at',
          valueType: 'dateTime',
          span: 2,
          editable: false,
        }
      ]}
      dataSource={props.values}
    />
    <Divider/>
    <ProDescriptions
      title={"详细信息"}
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
          title: '账户余额',
          key: 'amount',
          editable: false,
          dataIndex: 'amount',
          valueType: 'money',
        },
        {
          title: '账户花费总计',
          key: 'cost',
          editable: false,
          dataIndex: 'cost',
          valueType: 'money',
        },
        {
          title: '已部署函数',
          key: 'count',
          editable: false,
          dataIndex: 'count',
        },
        {
          title: '最大部署限制',
          key: 'max_limit',
          editable: false,
          dataIndex: 'max_limit',
          render: (dom, record) => {
            if (record.max_limit === 0) {
              return "无限制"
            }
            return dom
          }
        }
      ]}
      dataSource={props.values}
    />
    <Divider/>
    <ProDescriptions
      title={"认证信息"}
      column={1}
      actionRef={actionRef}
      editable={{
        onSave: async (keypath, newInfo, oriInfo) => {
          props.values[keypath.toString()] = newInfo[keypath.toString()];
          return true;
        },
      }}
      columns={AuthColumns[props.values?.type || 0]}
      dataSource={props.values}
    />
  </Drawer>
}

export default DetailDrawer
