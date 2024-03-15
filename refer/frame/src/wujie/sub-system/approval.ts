export const url = import.meta.env.DEV
  ? '//localhost:5131'
  : 'https://noah-web-qa.weizhipin.com/apps/approval';

export const match = ['/dashboard/audit/**'];
