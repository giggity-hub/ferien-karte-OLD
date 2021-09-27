// import {defineConfig} from 'windicss/helpers';
// import colors from 'windicss/colors';

const defineConfig = require('windicss/helpers')
const colors = require('windicss/colors');

const customColors = ['sommer', 'herbst', 'weihnachten', 'ostern', 'pfingsten', 'unterrichtsfrei', 'winter', 'halbjahr', 'other']
module.exports = {
  safelist: customColors.flatMap( color => ['bg-'+color, 'text-'+color]),
  theme: {
    extend: {
      colors: {
        sommer: colors.amber[400],
        herbst: colors.orange[500],
        weihnachten: colors.blue[500],
        ostern: colors.green[500],
        pfingsten: colors.green[500],
        unterrichtsfrei: colors.purple[500],
        winter: colors.blue[500],
        halbjahr: colors.blue[500],
        other: colors.purple[500],
      }
    }
  }
}




// const production = !process.env.ROLLUP_WATCH;


// // whitelist is not supported in jit
// const colors = require('tailwindcss/colors')
// module.exports = {
//   // mode: 'jit',
  
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {
//       colors: {
//         sommer: colors.amber[400],
//         herbst: colors.orange[500],
//         weihnachten: colors.blue[500],
//         ostern: colors.green[500],
//         pfingsten: colors.green[500],
//         unterrichtsfrei: colors.purple[500],
//         winter: colors.blue[500],
//         halbjahr: colors.blue[500],
//         other: colors.purple[500],
//       }
//     }
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
//   purge: {
//     content: [
//       "./src/**/*.svelte",
//     ],
//     options: {
//       safelist: customColors.flatMap( color => ['bg-'+color, 'text-'+color])
//     },
//     enabled: production // disable purge in dev
//   },
// }
