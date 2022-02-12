import { createEvent, restore } from 'effector'

export function createMountedModel(defaultState = false) {
  const setIsMounted = createEvent<boolean>();
  const unmount = createEvent();
  const mount = createEvent();
  const $isMounted = restore(setIsMounted, defaultState)
    .on(mount, () => true)
    .on(unmount, () => false);
  
  return { $isMounted, setIsMounted, unmount, mount };
}

export type MountedModel = ReturnType<typeof createMountedModel>
