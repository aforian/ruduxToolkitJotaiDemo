import { useEffect, useRef } from "react";

export default function useCommitCount() {
  const commitCount = useRef(0);
  useEffect(() => {
    commitCount.current += 1;
  });
  return commitCount.current;
}
