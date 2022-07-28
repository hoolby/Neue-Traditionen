import React, { useEffect, useState } from "react";
import CheckListItem from "@components/checkList/CheckListItem";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CheckList.css";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";

function CheckList() {
  const [data, setData] = useState([]);
  const fetchList = async () => {
    try {
      const q = query(collection(db, "checklist"));
      const docs = await getDocs(q);
      const temp = [];
      docs.forEach((doc) => {
        temp.push({ id: doc.id, ...doc.data() });
      });
      setData(temp);
    } catch (err) {
      console.error(err); // eslint-disable-line
      console.warn("An error occured while fetching list data"); // eslint-disable-line
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="table-container">
      {data && <CheckListItem list={data} key={data.id} />}
    </div>
  );
}

export default CheckList;
