"use strict";

import { useEffect, useRef, useState } from "react";
import { Peer } from "peerjs";

const usePeer = (onCall) => {
  const [peerInstance, setPeerInstance] = useState();
  const callRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!peerInstance) {
      setPeerInstance(new Peer());
      setLoading(true);
    }

    if (peerInstance) {
      peerInstance.on("open", (id) => {
        setLoading(false);
      });
    }

    return () => {
      if (peerInstance) {
        peerInstance.destroy();
      }
    };
  }, [peerInstance]);

  useEffect(() => {
    if (peerInstance) {
      peerInstance.on("call", onCall);
    }
  }, [peerInstance, onCall]);

  return [peerInstance, loading];
};

export default usePeer;
