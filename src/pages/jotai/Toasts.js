import { useAtom } from "jotai";
import {
  toastIdsAtom,
  toastsAtom,
  addToastAtom,
  removeToastAtom
} from "./toastAtom";
import { useEffect, useMemo } from "react";
import { selectAtom } from "jotai/utils";

function Toast({ id }) {
  const [toast] = useAtom(
    useMemo(() => {
      return selectAtom(toastsAtom, (toasts) =>
        toasts.find((t) => t.id === id)
      );
    }, [])
  );
  const [, removeToast] = useAtom(removeToastAtom);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      removeToast(id);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [id]);

  return (
    <div className="toast">
      <span className="toast__title">{toast.title}</span>
      <button className="toast__close-button" onClick={() => removeToast(id)}>
        X
      </button>
    </div>
  );
}

function Toasts() {
  const [toastIds] = useAtom(toastIdsAtom);
  console.log("Toasts", toastIds);
  return (
    <div className="toast-container">
      {toastIds.map((tid) => (
        <Toast key={tid} id={tid} />
      ))}
    </div>
  );
}

export const useAddToast = () => {
  const [, addToast] = useAtom(addToastAtom);
  return addToast;
};

export default Toasts;
