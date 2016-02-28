({
  appDir: "app/",
  baseUrl: "js/",
  dir: "app-build",
  keepBuildDir: false,
  locale: "en-us",
  inlineText: true,
  useStrict: false,
  skipModuleInsertion: false,
  stubModules: ['text'],
  optimizeAllPluginResources: false,
  findNestedDependencies: false,
  removeCombined: true,
  modules: [
    {
      name: "main"
    },
  ],
  preserveLicenseComments: true,
  logLevel: 0
})
