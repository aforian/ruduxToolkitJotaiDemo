import { useState, memo, useMemo } from "react";
import { cloneDeep } from "lodash-es";
import useRenderCount from "../../useRenderCount";
import useCommitCount from "../../useCommitCount";
import cartJson from "../../cart.json";

const CartItem = ({ title }) => {
  console.log("[CartItem Render]", title);
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();
  return (
    <div>
      {title}[render/commit: {renderCount}/{commitCount}]
    </div>
  );
};

const AddItemButton = ({ onClick }) => {
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();
  return (
    <button onClick={onClick}>
      Add Items[render/commit: {renderCount}/{commitCount}]
    </button>
  );
};

function CartItems({ items }) {
  console.log("[CartItems Render]");
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();

  return (
    <div>
      <div>
        {items.map((item) => (
          <CartItem key={item.id} title={item.title} />
        ))}
      </div>
      [render/commit: {renderCount}/{commitCount}]
    </div>
  );
}
function Deliveries({ items }) {
  console.log("[Deliveries Render]");
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();

  return (
    <div>
      <select>
        {items.map((item) => (
          <option key={item.id}>{item.title}</option>
        ))}
      </select>
      [render/commit: {renderCount}/{commitCount}]
    </div>
  );
}

function Payments({ items }) {
  console.log("[Payments Render]");
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();

  return (
    <div>
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
  console.log("[BeMember Render]");
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();

  return (
    <div className="main-section">
      成為會員吧[render/commit: {renderCount}/{commitCount}]
    </div>
  );
};

const UpdateButton = ({ onClick }) => {
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();

  return (
    <button onClick={onClick}>
      Update All Cart[render/commit: {renderCount}/{commitCount}]
    </button>
  );
};

const Summary = ({ total }) => {
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();
  return (
    <div className="main-section">
      Total Price: {total} [render/commit: {renderCount}/{commitCount}]
    </div>
  );
};

export default function App() {
  const [state, setState] = useState(cloneDeep(cartJson));
  const total = useMemo(() => {
    return state.cartItems.reduce((acc, cur) => {
      return acc + cur.price * cur.amount;
    }, 0);
  }, [state.cartItems]);
  return (
    <div className="App">
      <h1>React useState Only</h1>
      <BeMember />
      <AddItemButton
        onClick={() => {
          setState((prev) => {
            const newState = cloneDeep(prev);
            const prevCartItems = prev.cartItems;
            const lastItem = prevCartItems[prevCartItems.length - 1];
            const newCartItems = prevCartItems.concat({
              id: lastItem.id + 1,
              title: `cart-items title ${lastItem.id + 1}`,
              amount: 5,
              price: 100
            });
            newState.cartItems = newCartItems;
            return newState;
          });
        }}
      />
      <CartItems items={state.cartItems} />
      <Deliveries items={state.deliveries} />
      <Payments items={state.payments} />
      <UpdateButton onClick={() => setState((prev) => cloneDeep(prev))} />
      <Summary total={total} />
    </div>
  );
}
