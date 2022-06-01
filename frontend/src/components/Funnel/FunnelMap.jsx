import FunnelCard from "./FunnelCard";
import testDBArray from "./testDB";
import "./FunnelCard.css";
// import data from "./testDB";

function FunnelMap() {
  return (
    //    map over array of DB, key/value pairs, set a Key and passed array as prop
    <section className="card-list">
      {testDBArray.map((testArray) => {
        return <FunnelCard key={testArray.id} testArray={testArray} />;
      })}
    </section>
  );
}

export default FunnelMap;
