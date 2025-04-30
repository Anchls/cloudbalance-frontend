// src/config/sidebarConfig.js

import onboardIcon from '../../../assets/onboarding.png';
import costIcon from '../../../assets/cost.png';
import awsIcon from '../../../assets/aws.png';
import userIcon from '../../../assets/user.png';

// Define the sidebar menu items configuration
const sidebarConfig = [
  {
    role: "ADMIN",
    path: "/dashboard/users",
    label: "User Management",
    icon: userIcon
  },
  {
    role: "ADMIN",
    path: "/dashboard/onboarding",
    label: "Onboarding",
    icon: onboardIcon
  },
  {
    role: "ADMIN",
    path: "/dashboard/cost-explorer",
    label: "Cost Explorer",
    icon: costIcon
  },
  {
    role: "ADMIN",
    path: "/dashboard/aws-services",
    label: "AWS Services",
    icon: awsIcon
  },
  {
    role: "READ_ONLY",
    path: "/dashboard/cost-explorer",
    label: "Cost Explorer",
    icon: costIcon
  },
  {
    role: "READ_ONLY",
    path: "/dashboard/aws-services",
    label: "AWS Services",
    icon: awsIcon
  },
  {
    role: "CUSTOMER",
    path: "/dashboard/cost-explorer",
    label: "Cost Explorer",
    icon: costIcon
  },
  {
    role: "CUSTOMER",
    path: "/dashboard/aws-services",
    label: "AWS Services",
    icon: awsIcon
  }
];

export default sidebarConfig;
