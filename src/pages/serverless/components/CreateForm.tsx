import React, {useState} from 'react';
import {Modal} from 'antd';
import {StepsForm} from '@ant-design/pro-components';
import {ProviderSelect} from "@/components/StepForm/ProviderSelect";
import {TunnelForm} from "@/components/StepForm/TunnelForm";

export type FormValueType = {
  cpu: number,
  memory: number,
  instance: number,
  tunnel_auth_type: number,
  tls: boolean,
  tor: boolean,
} & Partial<Serverless.Tunnel>;

export type CreateFormProps = {
  onCancel: (flag?: boolean, formValue?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  createModalVisible: boolean;
  values: Partial<Serverless.Tunnel>;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {

  const [current, setCurrent] = useState<number>(0);

  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      current={current}
      onCurrentChange={(c) => {
        setCurrent(c);
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={720}
            bodyStyle={{padding: '32px 40px 60px'}}
            destroyOnClose
            title={"新增函数"}
            open={props.createModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={(values) => {
        setCurrent(0);
        // @ts-ignore
        return props.onSubmit(values);
      }}
    >
      <StepsForm.StepForm
        title={"实例选择"}
      >
        <ProviderSelect values={props.values}/>
      </StepsForm.StepForm>
      <StepsForm.StepForm
        grid={true}
        rowProps={{
          gutter: [16, 16],
        }}
        title={"函数配置"}
        initialValues={{
          cpu: '0.05',
          memory: '128',
          tunnel_auth_type: 0,
          instance: 5,
          port: 9000,
          type: "websocket-tunnel",
          tls: true,
          tor: false,
        }}
      >
        <TunnelForm/>
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default CreateForm;
