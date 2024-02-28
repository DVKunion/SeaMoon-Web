import React, {useState} from "react";
import {ProFormSelect} from "@ant-design/pro-components";
import {getActiveProvider} from "@/services/cloud/api";
import {Space, Tag} from "antd";
import {CloudProvideTypeIcon, RegionEnum} from "@/enum/cloud";


export type ProviderProps = {
  values: Partial<Serverless.Tunnel>
};

export const ProviderSelect: React.FC<ProviderProps> = (props: ProviderProps) => {
  const [cloud, setCloud] = useState<Partial<Cloud.Provider>>({});

  return <><ProFormSelect
      name="cloud_provider_id"
      label="选择关联云账户"
      width={"xl"}
      tooltip={"仅允许正常状态的账户"}
      showSearch={true}
      placeholder={""}
      request={async () => {
        const res: { key: number; label: JSX.Element; value: number; obj: Cloud.Provider; }[] = [];
        const {data} = await getActiveProvider();
        data.forEach((item) => {
          res.push(
            {
              key: item.id,
              label: <Space>{CloudProvideTypeIcon[item.type]}{item.name} - {RegionEnum[item.region]}</Space>,
              value: item.id,
              obj: item
            }
          )
        })
        return res
      }}
      rules={[
        {
          required: true,
          message: "请选择关联云账户!",
        },
      ]}
      fieldProps={
        {
          onSelect: (value, option) => {
            setCloud(option["data-item"].obj);
            props.values.cloud_provider_id = cloud.id
            props.values.cloud_provider_type = cloud.type
          }
        }
      }
    />
    {cloud.id !== 0 ?
      <Space>
        {cloud.amount !== undefined ? <>账户余额: <Tag
          color={cloud.amount > 0 ? "volcano" : "green"}>{"¥" + cloud.amount}</Tag></> : <></>}
        {cloud.count !== undefined && cloud.max_limit !== undefined ?
          <>已部署函数限制: <Tag
            color={cloud.max_limit === 0 ? "volcano" : cloud.count <= cloud.max_limit ? "volcano" : "green"}>{cloud.count + " / " + (cloud.max_limit === 0 ? "∞" : cloud.max_limit)}</Tag></> : <></>
        }
      </Space> : <></>
    }
    </>
}
