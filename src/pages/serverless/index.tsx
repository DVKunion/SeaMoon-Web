import React, {useRef, useState} from "react";
import {PageContainer, ActionType, ProList, StatisticCard} from "@ant-design/pro-components";
import {Badge, Button, Space, Tag} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import IconFont from "@/components/IconFont";
import CreateForm from "./components/CreateForm";
import {handleUpdateProxy} from "@/pages/service/handle";
import DetailDrawer from "./components/DetailDrawer";
import {getServerlessTunnel} from "@/services/serverless/api";
import {CloudProvideTypeValueEnum, RegionEnum} from "@/enum/cloud";
import {TunnelStatusEnum, TunnelTypeValueEnum} from "@/enum/tunnel";
import styles from "./index.less";
import {handleCreateTunnel, handleDeleteTunnel} from "@/pages/serverless/handle";

const {Statistic} = StatisticCard;

const Tunnel: React.FC = () => {

  const actionRef = useRef<ActionType>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<Serverless.Tunnel>();


  return <PageContainer
    title={"函数实例"}
    tabList={[
      {
        tab: '隧道实例',
        key: 'tunnel',
      },
    ]}
    extra={""}>
    <ProList<Serverless.Tunnel>
      className={styles.proList}
      actionRef={actionRef}
      pagination={{
        defaultPageSize: 12,
        showSizeChanger: true,
      }}
      request={async (params, sort, filter) => {
        const data = await getServerlessTunnel(params.current === undefined ? 0 : params.current - 1, params.pageSize === undefined ? 10 : params.pageSize)
        return data;
      }}
      rowKey={"ID"}
      showActions="hover"
      rowSelection={{}}
      grid={{gutter: 16, column: 3}}
      onItem={(record: any) => {
        return {
          onClick: () => {
            setCurrentRow(record);
            setShowDetail(true);
          },
        };
      }}
      toolBarRender={() => {
        return [
          <Button key="button" icon={<PlusOutlined/>} type="primary"
                  style={{marginLeft: "10px"}}
                  onClick={() => {
                    handleModalVisible(true)
                  }}>
            新增
          </Button>
        ]
      }}
      metas={{
        title: {
          dataIndex: 'name',
        },
        subTitle: {},
        avatar: {
          dataIndex: 'type',
          formItemProps: {
            style: {
              fontSize: "150%",
            }
          },
          render: (_, record) => {
            return TunnelTypeValueEnum[record.type]
          }
        },
        content: {
          render: (dom, record) => {
            return <div>
              <Statistic title="当前状态:" valueRender={() => <Badge style={{fontSize: "12px"}}
                                                                 status={TunnelStatusEnum[record.status]?.status}
                                                                 text={TunnelStatusEnum[record.status]?.text}/>}/>
              <Statistic title="账户类型:" valueRender={() => {
                return <div>{CloudProvideTypeValueEnum[record.cloud_provider_type]} - {RegionEnum[record.cloud_provider_region]}</div>
              }}/>
                <Statistic title="隧道地址:" value={record.address === undefined || record.address === null ? "-" : record.address}/>
                <Space size={40} style={{marginTop: "5px"}}>
                <Statistic title="端口号:" valueRender={() => record.port}/>
                <Statistic title="函数规格:"
                valueRender={() => <Space><IconFont
                type={"icon-cpu1"}/>{record.tunnel_config.cpu} M <IconFont
                type={"icon-memory1"}/>{record.tunnel_config.memory} Mi </Space>}/>

                </Space>
                </div>;
              }
              },
              actions: {
              cardActionProps: 'extra',
              render: (_, record) => {
              return <div>
            {record.tunnel_config.tls ? <Tag color={"magenta"}>tls</Tag> : <></>}
            {record.tunnel_config.tor ? <Tag color={"blue"}>tor</Tag> : <></>}
              </div>
            }
            },
              }}
              headerTitle={<Space><IconFont type={"icon-tunnel_statistics_icon_tunnel"} style={{fontSize: "150%"}}/>隧道 -
              Tunnel</Space>}
              />
              <CreateForm
                onSubmit={async (value) => {
                  const success = await handleCreateTunnel(value);
                  handleModalVisible(false);
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                  if (success) {
                    setCurrentRow(undefined);
                  }
                }}
                onCancel={() => {
                  handleModalVisible(false);
                  setCurrentRow(undefined);
                }}
                createModalVisible={createModalVisible}
                values={currentRow || {}}
              />
              <DetailDrawer
                onSubmit={async (value) => {
                  await handleUpdateProxy(value)
                  setShowDetail(false);
                  setCurrentRow(undefined);
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }}
                onDelete={async (value) => {
                  // 检查当前状态是否为停止，如果非停止，则禁止删除。
                  const success = await handleDeleteTunnel(value.id)
                  setShowDetail(false);
                  if (success) {
                    setCurrentRow(undefined);
                  }
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }}
                onCancel={() => {
                  setShowDetail(false);
                  setCurrentRow(undefined);
                }}
                detailVisible={showDetail}
                values={currentRow || {}}
              />
            </PageContainer>
          }

          export default Tunnel
