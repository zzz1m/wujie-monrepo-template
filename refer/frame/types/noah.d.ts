declare interface NoahResponse {
  success?: boolean;
  callback?: string;
  message?: string;
  msg?: string;
  root: any;
  code?: number;
}

interface NoahUserInfo {
  bossId: string;
  deptName: string;
  email: string;
  headImage: string;
  id: string;
  isPositive: boolean;
  name: string;
  phone: string;
  roles: string[];
  sex: -1 | 0 | 1;
  userId: string;
  userNature: '01' | '02';
}

type LinkTarget = 'self' | 'blank';
interface NavInfo {
  id: number;
  childMenus?: NavInfo[];
  code: 'module' | 'system' | 'link';
  icon: string;
  isNew: boolean;
  level: 1 | 2;
  name: string;
  parentId: number;
  show: boolean;
  sortOrder: number;
  status: 0 | 1;
  systemId: number;
  target: LinkTarget;
  updateTime: number;
  url: string;
  // 处理加的，排序用
  _idx: number;
}

type NavMap = {
  [id: string]: NavInfo;
};

type VoidCallBack = () => void;
