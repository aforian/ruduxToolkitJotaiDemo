import { Provider, shallowEqual } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { store } from "./store";
import { addItem, removeItem, updateAllCart } from "./cart";
import { addToast } from "./toast";
import useRenderCount from "../../useRenderCount";
import useCommitCount from "../../useCommitCount";
import Toasts from "./Toasts";

const CartItem = ({ id }) => {
  const dispatch = useDispatch();
  const { title, price } = useSelector(
    (state) => state.cart.cartItems.find((item) => item.id === id),
    shallowEqual
  );
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();
  console.log("[Redux-Toolkit CartItem Render]", title);
  return (
    <div>
      <span>
        {title}, price: {price}, [render/commit: {renderCount}/{commitCount}]
      </span>
      <button onClick={() => dispatch(removeItem(id))}>Delete</button>
    </div>
  );
};

const AddItemButton = () => {
  const dispatch = useDispatch();
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();

  return (
    <button
      onClick={() => {
        dispatch(addItem());
        dispatch(addToast("Item Added"));
      }}
    >
      Add Items[render/commit: {renderCount}/{commitCount}]
    </button>
  );
};

function CartItems() {
  const itemIds = useSelector(
    (state) => state.cart.cartItems.map((item) => item.id),
    shallowEqual
  );
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();

  console.log("[Redux-Toolkit CartItems Render]");
  return (
    <div className="main-section">
      <div>
        {itemIds.map((id) => (
          <CartItem key={id} id={id} />
        ))}
        [render/commit: {renderCount}/{commitCount}]
      </div>
    </div>
  );
}
function Deliveries() {
  console.log("[Redux-Toolkit Deliveries Render]");
  const items = useSelector((state) => state.cart.deliveries);
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
  console.log("[Redux-Toolkit Payments Render]");
  const items = useSelector((state) => state.cart.payments);
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
  console.log("[Redux-Toolkit BeMember Render]");
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();

  return (
    <div className="main-section">
      成為會員吧[render/commit: {renderCount}/{commitCount}]
    </div>
  );
};

const UpdateButton = () => {
  const dispatch = useDispatch();
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();

  return (
    <button onClick={() => dispatch(updateAllCart())}>
      Update All Cart[render/commit: {renderCount}/{commitCount}]
    </button>
  );
};

const Summary = () => {
  const renderCount = useRenderCount();
  const commitCount = useCommitCount();
  const total = useSelector((state) => {
    const total = state.cart.cartItems.reduce((acc, cur) => {
      return acc + cur.price * cur.amount;
    }, 0);
    return total;
  });
  return (
    <div className="main-section">
      Total Price: {total} [render/commit: {renderCount}/{commitCount}]
    </div>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Redux ToolKit</h1>
        <BeMember />
        <AddItemButton />
        <CartItems />
        <Deliveries />
        <Payments />
        <UpdateButton />
        <Summary />
        <Toasts />
      </div>
    </Provider>
  );
}
