import {
  ProFormSelect,
  ProFormText, CheckCard,
  StepsForm,
} from '@ant-design/pro-components';
import {Modal, Avatar} from 'antd';
import React, {useState} from 'react';
import {ProxyTypeValueEnum} from "@/enum/service";
import {toNumber} from "lodash";
import IconFont from "@/components/IconFont";
import {TunnelForm} from "@/components/StepForm/TunnelForm";
import {ProviderSelect} from "@/components/StepForm/ProviderSelect";

export type FormValueType = Partial<Service.Proxy>;

export type CreateFormProps = {
  onCancel: (flag?: boolean, formValue?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  createModalVisible: boolean;
  values: Partial<Service.Proxy> & Partial<{}>;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {

  const [current, setCurrent] = useState<number>(0);
  const [deploy, setDeploy] = useState<number>(1);

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
            width={780}
            // bodyStyle={{padding: '32px 40px 48px'}}
            destroyOnClose
            title={"新增服务"}
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
        setDeploy(1);
        return props.onSubmit(values);
      }}
    ><StepsForm.StepForm
      title={"选择关联类型"}
    >
      <CheckCard.Group style={{width: '100%'}}
                       defaultValue={deploy}
                       onChange={(value) => {
                         setDeploy(toNumber(value));
                       }}>
        <CheckCard
          title="选择已有的函数进行关联"
          avatar={
            <Avatar
              style={{backgroundColor: '#ffffff'}}
              icon={<IconFont type={"icon-saeServerlessyingyongyinqing1"}/>}
              size="large"
            />
          }
          description="从已有的函数实例中进行关联选择，建立隧道。"
          value={1}
        />
        <CheckCard
          title="选择账户并自动创建新实例"
          avatar={
            <Avatar
              style={{backgroundColor: '#ffffff'}}
              icon={<IconFont type={"icon-cloud1"}/>}
              size="large"
            />
          }
          description="通关关联账户自动创建对应协议的全新函数实例。"
          value={2}
        />
      </CheckCard.Group>
    </StepsForm.StepForm>
      <StepsForm.StepForm
        title={"实例选择"}
      >
        {deploy === 1 ?
          <ProFormSelect
            name="Tunnel"
            width="xl"
            label="选择函数实例"
            placeholder={""}
            // rules={[
            //   {
            //     required: true,
            //     message: "请选择关联的函数实例!",
            //   },
            // ]}
          /> : <ProviderSelect values={props.values} />}
      </StepsForm.StepForm>
      <StepsForm.StepForm
        title={'基本配置'}
      >
        <ProFormText
          name="Name"
          label="代理名称"
          placeholder={""}
          width="xl"
          rules={[
            {
              required: true,
              message: "请输入代理服务名称!",
            }
          ]}
        />
        <ProFormText
          name="ListenAddr"
          label="监听地址"
          placeholder={""}
          width="xl"
          rules={[
            {
              required: true,
              message: "请输入合法的监听地址!",
              pattern: RegExp(""),
            },
            {
              pattern: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
              message: "请输入合理的IP地址",
            }
          ]}
        />
        <ProFormText
          name="ListenPort"
          label="监听端口"
          placeholder={""}
          width="xl"
          rules={[
            {
              required: true,
              message: "请输入监听端口!",
            },
            {
              validator: (rule, value) => {
                if(toNumber(value) >= 65535 || toNumber(value) <= 0){
                  return Promise.reject(new Error('请输入合法端口'));
                }
                return Promise.resolve();
              },
            },
          ]}
        />
        <ProFormSelect
          name="Type"
          width="xl"
          label="监听协议"
          placeholder={""}
          valueEnum={ProxyTypeValueEnum}
          rules={[
            {
              required: true,
              message: "请选择监听的服务类型!",
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        title={"高级配置"}
        grid={true}
        rowProps={{
          gutter: [16, 16],
        }}
        initialValues={{
          cpu: '0.05',
          memory: '128',
          tunnel_auth_type: 0,
          instance: 5,
          port: 9000,
          tunnel_type: "websocket-tunnel",
          tls: true,
          tor: false,
        }}
      >
        {deploy === 1 ? "关联函数无法进行高级配置, 请在对应函数实例页面进行修改。" :
          <TunnelForm />
        }
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default CreateForm;
