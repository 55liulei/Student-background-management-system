module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
    parserOptions: {
        parser: "babel-eslint",
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        semi: [1, "never"],
        indent: [2, 2],
    },
    presets: [
        '@vue/cli-plugin-babel/preset',
        ['@vue/babel-preset-jsx',
            {
                'injectH': false
            }]
    ]

}