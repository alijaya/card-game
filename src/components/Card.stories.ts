import '../styles/index.css';
import Card from './Card.vue';

export default {
  title: 'Card',
  component: Card,
  argTypes: {
    width: { control: 'range' },
    height: { control: 'range' },
    scale: { control: {type:'range', min: 0, max: 1, step: 0.1}}
  },
};

const Template = (args: any) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Card },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<card v-bind="args" />',
});

export const B8 = Template.bind({});
B8.args = {
  width: 62,
  height: 88,
  scale: 1,
};

export const B9 = Template.bind({});
B9.args = {
  width: 44,
  height: 62,
  scale: 1,
};