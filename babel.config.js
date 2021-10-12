return {
  presets: ["@babel/preset-react"],
  plugins: [
    "module-resolver",
    {
      alias: {
        "@src": "./src",
        "@config": "./src/config",
        "@api": "./src/config/api",
        "@screens": "./src/screens",
        "@components": "./src/components",
        "@utils": "./src/utils",
      },
    },
  ],
};
