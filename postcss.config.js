import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default postcss({
  plugins: [tailwindcss, autoprefixer],
});