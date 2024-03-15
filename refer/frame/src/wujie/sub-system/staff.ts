export const url = import.meta.env.DEV
  ? '//localhost:5131'
  : 'https://noah-web-qa.weizhipin.com/apps/staff';

export const match = [
  '/dashboard/entry/**',
  '/dashboard/contract/**',
  '/dashboard/staff/doc/**',
  '/dashboard/residence-permit/**',
  '/dashboard/certificate/**',
  '/dashboard/recommend/**',
  '/dashboard/recruit/**',
];
