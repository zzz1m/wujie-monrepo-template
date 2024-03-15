export const url = import.meta.env.DEV
  ? '//localhost:5132'
  : 'https://noah-web-qa.weizhipin.com/apps/system';

export const match = [
  '/dashboard/homepage/**',
  '/dashboard/pages/**',
  '/dashboard/system/**',
];
