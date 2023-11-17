import { useMemo } from "react";
import { useAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import deepEqual from "fast-deep-equal";

import useRenderCount from "../../useRenderCount";
import useCommitCount from "../../useCommitCount";
import {
  deliveryAtom,
  paymentsAtom,
  addItemAtom,
  updateCartAtom,
  totalAtom,
  cartItemsAtom,
  removeItemAtom,
  cartItemIdsAtom
} from "./cartAtom";
import Toasts, { useAddToast } from "./Toasts";

const CartItem = ({ id }) => {
  const [, removeItem] = useAtom(removeItemAtom);
  const [{ title, price }] = useAtom(
    useMemo(() => {
      return selectAtom(
        cartItemsAtom,
        (cartItems) => cartItems.find((item) => item.id === id),
        deepEqual
      );
    }, [])
  );
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();
  console.log("[Jotai CartItem Render]", title);
  return (
    <div>
      <span>
        {title}, price: {price}, [render/commit: {renderCount}/{commitCount}]
      </span>
      <button onClick={() => removeItem(id)}>Delete</button>
    </div>
  );
};

const AddItemButton = () => {
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();
  const addToast = useAddToast();
  const [, addItem] = useAtom(addItemAtom);
  return (
    <button
      onClick={() => {
        addItem();
        addToast("Item Added");
      }}
    >
      Add Items [render/commit: {renderCount}/{commitCount}]
    </button>
  );
};

function CartItems() {
  const [carItemIds] = useAtom(cartItemIdsAtom);
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();
  console.log("[Jotai CartItems Render]");
  return (
    <div className="main-section">
      <div>
        {carItemIds.map((id) => {
          return <CartItem key={id} id={id} />;
        })}
        [render/commit: {renderCount}/{commitCount}]
      </div>
    </div>
  );
}
function Deliveries() {
  console.log("[Jotai Deliveries Render]");
  const [items] = useAtom(deliveryAtom);
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();

  return (
    <div className="main-section">
      <select>
        {items.map((item) => (
          <option key={item.id}>{item.title}</option>
        ))}
      </select>
      [render/commit: {renderCount}/{commitCount}]
    </div>
  );
}

function Payments() {
  console.log("[Jotai Payments Render]");
  const [items] = useAtom(paymentsAtom);
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();

  return (
    <div className="main-section">
      <select>
        {items.map((item) => (
          <option key={item.id}>{item.title}</option>
        ))}
      </select>
      [render/commit: {renderCount}/{commitCount}]
    </div>
  );
}

const BeMember = () => {
  console.log("[Jotai BeMember Render]");
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();

  return (
    <div className="main-section">
      成為會員吧 [render/commit: {renderCount}/{commitCount}]
    </div>
  );
};

const UpdateButton = () => {
  const [, updateCart] = useAtom(updateCartAtom);
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();

  return (
    <button onClick={updateCart}>
      Update All Cart [render/commit: {renderCount}/{commitCount}]
    </button>
  );
};

const Summary = () => {
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();
  const [total] = useAtom(totalAtom);
  return (
    <div className="main-section">
      Total Price: {total} [render/commit: {renderCount}/{commitCount}]
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>Jotai</h1>
      <BeMember />
      <AddItemButton />
      <CartItems />
      <Deliveries />
      <Payments />
      <UpdateButton />
      <Summary />
      <Toasts />
    </div>
  );
}
