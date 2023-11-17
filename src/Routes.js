import { useState } from "react";
import "./styles.css";
import { DevTools } from "jotai-devtools";
import PropsDrilling from "./pages/state/PropsDrilling";
import ReduxToolKit from "./pages/redux-toolkit";
import Jotai from "./pages/jotai";

function showPage(route, target) {
  return route === "All" || route === target;
}

function getPage() {
  const { search } = new URL(window.location?.href);
  const params = new URLSearchParams(search);
  const page = params.get("page");
  const allPage = ["All", "Props", "Redux", "Jotai"];
  return allPage.includes(page) ? page : "All";
}
const Routes = () => {
  const [route, setRoute] = useState(getPage());
  function configureRoute(targetRoute) {
    const { search } = new URL(window.location?.origin);
    const params = new URLSearchParams(search);
    params.set("page", targetRoute);
    const newUrl = window.location.origin + "?" + params.toString();
    window.history.pushState({ path: newUrl }, "", newUrl);
    setRoute(targetRoute);
  }
  return (
    <main className="routes">
      <div className="route">
        <button
          onClick={(e) => {
            configureRoute("All");
          }}
        >
          All
        </button>
        <button
          onClick={(e) => {
            configureRoute("Props");
          }}
        >
          Props Drilling
        </button>
        <button
          onClick={(e) => {
            configureRoute("Redux");
          }}
        >
          Redux Toolkit
        </button>
        <button
          onClick={(e) => {
            configureRoute("Jotai");
          }}
        >
          Jotai
        </button>
      </div>
      <div className="route-page">
        {showPage(route, "Props") && (
          <>
            <PropsDrilling />
            <hr />
          </>
        )}

        {showPage(route, "Redux") && (
          <>
            <ReduxToolKit />
            <hr />
          </>
        )}

        {showPage(route, "Jotai") && <Jotai />}
      </div>
      {showPage(route, "Jotai") && <DevTools />}
    </main>
  );
};

export default Routes;
