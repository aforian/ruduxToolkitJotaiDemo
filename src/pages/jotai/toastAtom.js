import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import deepEqual from "fast-deep-equal";

export const toastsAtom = atom([]);

export const toastIdsAtom = selectAtom(
  toastsAtom,
  (toasts) => toasts.map((t) => t.id),
  deepEqual
);

export const addToastAtom = atom(null, (_, set, update) => {
  set(toastsAtom, (toasts) => {
    console.log("[update]", update);
    const newToasts = [
      { title: `${update} ${toasts.length + 1}`, id: Math.random().toString() },
      ...toasts
    ];
    return newToasts;
  });
});

export const removeToastAtom = atom(null, (_, set, update) => {
  set(toastsAtom, (toasts) => {
    const newToasts = toasts.filter((toast) => toast.id !== update);
    return newToasts;
  });
});
