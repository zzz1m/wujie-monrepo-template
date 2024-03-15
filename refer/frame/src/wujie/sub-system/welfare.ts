export const url = import.meta.env.DEV
  ? '//localhost:5131'
  : 'https://noah-web-qa.weizhipin.com/apps/welfare';

export const match = [
  '/dashboard/staff-care/**',
  '/dashboard/phcc/**',
  '/dashboard/pscc/**',
  '/dashboard/points-mall/**',
  '/dashboard/train/**',
];
