import { TASKS } from '../../../../content-strings';

const { STATUS: { IN_PROGRESS } } = TASKS;

export default (selector) => {
  selector.invoke('text').then((text) => {
    expect(text.trim()).equal(IN_PROGRESS);
  });
};
