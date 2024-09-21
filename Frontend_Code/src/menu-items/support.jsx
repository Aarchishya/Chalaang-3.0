// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'Loan-page',
      title: 'Select your Loan',
      type: 'item',
      url: '/loan-page',
      icon: icons.ChromeOutlined
    }
  ]
};

export default support;
