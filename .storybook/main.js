module.exports = {
  stories: [
    '../projects/**/*.stories.mdx',
    '../projects/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/angular',
    options: {
      enableIvy: true,
    },
  },
  features: {
    postcss: false,
  },
  core: {
    builder: 'webpack5',
  },
};
