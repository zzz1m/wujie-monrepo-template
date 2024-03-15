import { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{vue,css,less,ts}',
    './index.html'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'no-data': "url('https://static.weizhipin.com/vueui/2.2/static/images/tip-nodata.9c64ae8.png')",
      }
    }
  }
} satisfies Config
