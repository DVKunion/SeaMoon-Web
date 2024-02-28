import React, {useRef, useState} from 'react';
import type {ProDescriptionsActionType} from '@ant-design/pro-components';
import {ProDescriptions} from '@ant-design/pro-components';
import {FormValueType} from "@/pages/service/components/CreateForm";
import {Button, Divider, Drawer, message, Popconfirm, Space} from "antd";
import {CopyOutlined, PoweroffOutlined, SyncOutlined} from "@ant-design/icons";
// @ts-ignore
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {TunnelAuthFCType, TunnelStatusTag, TunnelTypeValueEnum} from "@/enum/tunnel";
import {CloudProvideTypeValueEnum, RegionEnum} from "@/enum/cloud";

export type DetailProps = {
  onCancel: () => void;
  onDelete: (values: FormValueType) => Promise<void>;
  onSubmit: (values: FormValueType) => Promise<void>;
  detailVisible: boolean;
  values: Partial<Serverless.Tunnel>;
};

const DetailDrawer: React.FC<DetailProps> = (props) => {
  const actionRef = useRef<ProDescriptionsActionType>();
  const [spin, setSpin] = useState<boolean>(false);

  return <Drawer
    title="函数详情"
    width={"39%"}
    onClose={props.onCancel}
    open={props.detailVisible}
    extra={
      <Space>
        <CopyToClipboard
          text={props.values.address}
          onCopy={() => message.success("已复制函数地址")}>
          <Button shape={"round"} ghost icon={<CopyOutlined/>}></Button>
        </CopyToClipboard>
        {props.values.status === 2 ? <Button
          onMouseEnter={() => {
            setSpin(true);
          }}
          onMouseLeave={() => {
            setSpin(false);
          }}
          type={"primary"}
          shape={"round"}
          icon={<SyncOutlined spin={spin}/>}
          onClick={async () => {
            props.values.status = 4;
            await props.onSubmit(props.values);
          }}
        >启用</Button> : <Button
          type={"primary"}
          shape={"round"}
          danger
          onClick={() => {
            props.values.status = 2;
            props.onSubmit(props.values).then();
          }}
          icon={<PoweroffOutlined/>}>停用</Button>}
      </Space>
    }
    footer={
      <Space style={{float: "right"}}><Button type={"primary"} onClick={() => {
        props.onSubmit(props.values).then();
      }}>更新</Button>
        <Popconfirm
          title="删除函数?"
          onConfirm={() => {
            props.onDelete(props.values).then();
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
          title: '函数当前状态',
          key: 'status',
          editable: false,
          dataIndex: 'status',
          span: 2,
          render: (dom, entry) => {
            return TunnelStatusTag[entry.status ? entry.status : 0];
          }
        },
        {
          title: '账户类型',
          dataIndex: 'cloud_provider_type',
          key: 'type',
          editable: false,
          valueEnum: CloudProvideTypeValueEnum,
        },
        {
          title: '隧道类型',
          dataIndex: 'type',
          key: 'type',
          editable: false,
          valueEnum: TunnelTypeValueEnum,
        },
        {
          title: '隧道名称',
          span: 2,
          key: 'name',
          copyable: true,
          editable: false,
          dataIndex: 'name',
        },
        {
          title: '隧道地址',
          copyable: true,
          editable: false,
          span: 2,
          key: 'address',
          dataIndex: 'address',
        },
        {
          title: '端口号',
          key: 'port',
          editable: false,
          dataIndex: 'port',
        },
        {
          title: '所在区域',
          key: 'region',
          editable: false,
          dataIndex: 'cloud_provider_region',
          render: (dom, record) => {
            return RegionEnum[record.cloud_provider_region || ""]
          }
        },
        {
          title: '创建时间',
          key: 'created_at',
          valueType: "dateTime",
          editable: false,
          dataIndex: 'created_at',
        },
        {
          title: '修改时间',
          key: 'updated_at',
          valueType: "dateTime",
          editable: false,
          dataIndex: 'updated_at',
        }
      ]}
      dataSource={props.values}
    />
    <Divider/>
    <ProDescriptions
      title={"配置信息"}
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
          title: 'CPU规格',
          key: 'tunnel_config.cpu',
          editable: false,
          dataIndex: "tunnel_config",
          render: (dom, record) => {
            return record.tunnel_config?.cpu + " M"
          }
        },
        {
          title: '内存规格',
          key: 'tunnel_config.memory',
          editable: false,
          dataIndex: "tunnel_config",
          render: (dom, record) => {
            return record.tunnel_config?.memory  + " Mi"
          }
        },
        {
          title: '最大实例并发数',
          key: 'tunnel_config.instance',
          editable: false,
          dataIndex: "tunnel_config",
          render: (dom, record) => {
            return record.tunnel_config?.instance
          }
        },
        {
          title: '函数认证方式',
          key: 'tunnel_config.auth_type',
          editable: false,
          dataIndex: "tunnel_auth_type",
          render: (dom, record) => {
            return TunnelAuthFCType[record.tunnel_config?.tunnel_auth_type || 0]
          }
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
        }
      ]}
      dataSource={props.values}
    />
    <Divider/>
  </Drawer>
}

export default DetailDrawer
