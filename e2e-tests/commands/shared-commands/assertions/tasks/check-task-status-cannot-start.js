import { TASKS } from '../../../../content-strings';

const { STATUS: { CANNOT_START } } = TASKS;

export default (selector) => {
  selector.invoke('text').then((text) => {
    expect(text.trim()).equal(CANNOT_START);
  });
};
