module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    //'plugin:vue/essential',
    //'@vue/prettier'
    ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'space-before-function-paren': 0,
    'no-extra-semi': 0, // 可以多余的冒号
    semi: 0, // 语句可以不需要分号结尾
    // 'comma-dangle': ["error", "always-multiline"],
    'comma-dangle':0,
    'no-unused-vars': [
      2,
      {
        // 允许声明未使用变量
        vars: 'local',
        // 参数不检查
        args: 'none'
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
