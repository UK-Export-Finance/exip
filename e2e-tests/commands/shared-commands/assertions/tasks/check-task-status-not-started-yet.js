import { TASKS } from '../../../../content-strings';

const { STATUS: { NOT_STARTED_YET } } = TASKS;

export default (selector) => {
  selector.invoke('text').then((text) => {
    expect(text.trim()).equal(NOT_STARTED_YET);
  });
};
