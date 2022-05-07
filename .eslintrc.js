module.exports = {
    env: {
        node: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
    rules: {
        'react/react-in-jsx-scope': 'off',
    },
};
