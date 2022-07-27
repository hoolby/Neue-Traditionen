/* eslint-disable */
/* eslint-disable react/prop-types */

import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import InvitCard from "@components/invitCard";

function CostOverview() {
  const [data, setData] = useState(null);
  const fetchTalker = async () => {
    try {
      const q = query(collection(db, "user"));
      const docs = await getDocs(q);
      const temp = [];
      docs.forEach((doc) => {
        temp.push({ id: doc.id, ...doc.data() });
      });
      setData(temp);
    } catch (err) {
      console.error(err);
      console.log("An error occured while fetching talker data");
    }
  };

  useEffect(() => {
    fetchTalker();
  }, []);

  return <>{data ? <div>Got data</div> : <div>didn't get data</div>}</>;
}

export default CostOverview;
