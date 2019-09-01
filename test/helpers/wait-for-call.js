import poller from '../../server/util/poller';

export const waitForCall = async (t, fn) => {
  try {
    await poller(() => fn.called);
  } catch {
    return t.fail(`Expected ${fn.name} to eventually be called but it was never called.`);
  }

  t.pass();
};
