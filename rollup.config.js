import nodeResolve from '@rollup/plugin-node-resolve';
import html from '@web/rollup-plugin-html';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'pages/*.html',
  output: { dir: 'dist' },
  plugins: [html(), nodeResolve(), terser({
    output: {
      comments: false
    }
  })]
}