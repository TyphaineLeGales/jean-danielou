module.exports = {
    content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}",
  ],
  theme: {
      extend: {
        fontFamily: {
          balthazar: ['"Balthazar"', 'serif'],
        lexend: ['"Lexend"', 'sans-serif'],
        },
        colors : {
            "toxic-green" : "#44F459"
        },
        spacing: {
            '128': '32rem',
            '144': '36rem',
        },
        borderRadius: {
            '4xl': '2rem',
        }
    }
  },
  variants: {
   
  }
}