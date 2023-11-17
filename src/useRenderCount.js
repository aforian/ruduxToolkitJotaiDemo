import { useRef } from "react";

export default function useRenderCount() {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return renderCount.current;
}
