/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '50px': '50px',
        '131px': '131px',
        '240px': '240px',
        '560px': '560px',
        '800px': '800px',
        '70%': '70%',
        '110px':'110px'
        //    margin-left: -15px;
      },
      borderRadius: {
        '50px': '50px',
        '30px': '30px',
        '513px': '513px'
      },
      spacing: {
        '72.94': '72.94px',
        '24.03': '24.03px',
        '136.76px': '136.76px',
        '60.77px': '60.77px',
        '43px': '43px',
        '477px': '477px',
        '323px': '323px',
        '255px': '255px',
        '48px': '48px',
        '977px': '977px',
      },
      backgroundColor: {
        custom: '#083F46',
      },
      fontSize: {
        '25px': '25px',
      },
      margin: {
        '15px': '15px'
      },
      colors:{
        custom: '#083F46',
      }
    },
  },
  plugins: [],
}

