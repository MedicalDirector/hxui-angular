module.exports = {
  stories: [
    '../projects/hx-ui/**/*.stories.mdx',
    '../projects/hx-ui/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y'
  ],
  framework: '@storybook/angular'
};
