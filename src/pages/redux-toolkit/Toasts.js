import { removeToast } from "./toast";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

function Toast({ id }) {
  const toast = useSelector((state) => state.toasts.find((t) => t.id === id));
  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(removeToast(id));
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [id]);

  return (
    <div className="toast">
      <span className="toast__title">{toast.title}</span>
      <button
        className="toast__close-button"
        onClick={() => dispatch(removeToast(id))}
      >
        X
      </button>
    </div>
  );
}

function Toasts() {
  const toastIds = useSelector(
    (state) => state.toasts.map((t) => t.id),
    shallowEqual
  );
  const toastIds2 = useSelector((state) => state.toasts.map((t) => t.id));
  console.log({ toastIds, toastIds2 });
  console.log("Toasts", toastIds);
  return (
    <div className="toast-container">
      {toastIds.map((tid) => (
        <Toast key={tid} id={tid} />
      ))}
    </div>
  );
}

export default Toasts;
