{
  plugins: [
    [
      require.resolve("babel-plugin-import"),
      {
        "libraryName": "ant-design-vue",
        "libraryDirectory": "lib",
        "style": "css"
      }
    ] // `style: true` for less
  ]
}
