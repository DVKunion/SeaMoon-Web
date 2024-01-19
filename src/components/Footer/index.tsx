import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';

const Footer: React.FC = () => {

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${"DVKunion"}`}
      links={[
        {
          key: 'github',
          title: <GithubOutlined/>,
          href: 'https://github.com/DVKunion/Seamoon',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
