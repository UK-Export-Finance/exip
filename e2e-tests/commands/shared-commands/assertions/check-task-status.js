export default (task, status) => {
  task.status().invoke('text').then((text) => {
    expect(text.trim()).equal(status);
  });
};
