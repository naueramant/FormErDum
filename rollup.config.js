import typescript from "rollup-plugin-typescript";
import copy from "rollup-plugin-copy";

export default {
  plugins: [
    typescript(),
    copy({
      targets: [
        { src: "./src/*.html", dest: "./dist" },
        { src: "./src/*.jpg", dest: "./dist" }
      ],
    }),
  ],
  input: "./src/formerdum.ts",
  output: {
    file: "./dist/bundle.min.js",
    format: "iife",
    name: "FormErDum"
  },
};
