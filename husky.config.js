module.exports = {
  hooks: {
    'pre-commit': 'npm run lint.fix --prefix core && npm run lint --prefix core',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
};
