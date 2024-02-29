import React, {useRef, useState, useEffect} from "react";
import {Button, message, Space, Switch, Tag} from "antd";
import {PageContainer, ActionType, ProList, StatisticCard} from "@ant-design/pro-components";
import IconFont from "@/components/IconFont";
import {ProxyDynamicTagList, ProxyTypeIcon, ProxyTypeTagColor} from "@/enum/service";
import {getServiceProxy} from "@/services/service/api";
import {PlusOutlined} from "@ant-design/icons";
import CreateForm from "@/pages/service/components/CreateForm";
import DetailDrawer from "@/pages/service/components/DetailDrawer";
import {handleCreateProxy, handleDeleteProxy, handleUpdateProxy} from "@/pages/service/handle";

const {Statistic} = StatisticCard;

const calcThread = (n: number, o: number) => {
  return n > o ? "up" : n === o ? undefined : "down"
}

const Proxy: React.FC = () => {

  const actionRef = useRef<ActionType>();
  const [autoRoll, setAutoRoll] = useState<boolean>(true);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<Service.Proxy>();
  const [nData, setNData] = useState<Map<number, { conn: number, speed: number, lag: number }>>(new Map());
  const [oData, setOData] = useState<Map<number, { conn: number, speed: number, lag: number }>>(new Map());

  // 自动轮询器
  useEffect(() => {
    if (autoRoll) {
      const intervalId = setInterval(() => {
        actionRef.current?.reload();
      }, 3000); // 每1秒刷新一次列表
      // 清除定时器
      return () => clearInterval(intervalId);
    }
    return;
  })

  return <PageContainer
    title={"服务"}
    tabList={[
      {
        tab: '正向代理',
        key: 'proxy',
      },
    ]}
    extra={""}>
    <ProList<Service.Proxy>
      actionRef={actionRef}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
      }}
      request={async (params, sort, filter) => {
        const data = await getServiceProxy(params.current === undefined ? 0 : params.current - 1, params.pageSize === undefined ? 10 : params.pageSize)
        if (data.success) {
          const bData = new Map<number, { conn: number, speed: number, lag: number }>();
          data.data.forEach((item) => {
            bData.set(item.id, {
              conn: item.conn,
              speed: item.speed,
              lag: item.lag,
            });
          })
          // 是否是第一次:
          if (oData.size === 0 && nData.size === 0) {
            setOData(bData);
            setNData(bData);
          }
          // 除此之外，先把原本新的给老的，再把刚得到的给新的。
          else {
            setOData(nData);
            setNData(bData);
          }
        }
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
        return [<Switch checkedChildren={"auto"} unCheckedChildren={"off"}
                        defaultChecked={autoRoll}
                        onClick={() => {
                          setAutoRoll(!autoRoll);
                        }}/>,
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
        subTitle: {
          render: (_, record) => {
            return <ProxyDynamicTagList status={record.status} spin={autoRoll} />
          }
        },
        avatar: {
          dataIndex: 'type',
          render: (_, record) => {
            return ProxyTypeIcon[record.type];
          }
        },
        content: {
          render: (_, record) => {
            const oRecord = oData.get(record.id);
            return <div>
              <Statistic title="当前连接:" value={record.conn}
                         trend={calcThread(record.conn, oRecord === undefined ? 0 : oRecord.conn)}/>
              <Statistic title="当前速率:" value={record.speed + " Mbps"}
                         trend={calcThread(record.speed, oRecord === undefined ? 0 : oRecord.speed)}/>
              <Statistic title="当前延迟:" value={record.lag + " ms"}
                         trend={calcThread(record.lag, oRecord === undefined ? 0 : oRecord.lag)}/>
            </div>
          }
        },
        actions: {
          cardActionProps: 'extra',
          render: (_, record) => {
            return <Tag
              color={ProxyTypeTagColor[record.type]}>{record.type + "://" + record.listen_address + ":" + record.listen_port}</Tag>;
          }
        },
      }}
      headerTitle={<Space><IconFont type={"icon-proxy2"} style={{fontSize: "150%"}}/>代理 - Proxy</Space>}
    />
    <CreateForm
      onSubmit={async (value) => {
        await handleCreateProxy(value);
        handleModalVisible(false);
        setCurrentRow(undefined);
        if (actionRef.current) {
          actionRef.current.reload();
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
        if(value.status !== 3) {
          message.error("当前服务状态仍在运行中，请确保服务停止后再删除");
          return;
        }
        await handleDeleteProxy(value)
        setShowDetail(false);
        setCurrentRow(undefined);
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
      spin={autoRoll}
    />
  </PageContainer>
}

export default Proxy

