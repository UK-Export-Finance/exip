import { TASKS } from '../../../content-strings';

const { STATUS: { COMPLETED } } = TASKS;

export default (selector) => {
  selector.invoke('text').then((text) => {
    expect(text.trim()).equal(COMPLETED);
  });
};
