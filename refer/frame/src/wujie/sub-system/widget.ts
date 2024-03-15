export const url = import.meta.env.DEV
  ? '//localhost:5131'
  : 'https://noah-web-qa.weizhipin.com/apps/widget';

export const match = [
  '/dashboard/report/**',
  '/dashboard/permissions/**',
  '/dashboard/itservice/**',
  '/dashboard/it-manage/**',
  '/dashboard/cost/**'
];
