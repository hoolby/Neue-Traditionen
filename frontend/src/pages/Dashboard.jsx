import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
/* IMPORT AUTH STATE, DATABASE AND STORAGE INSTANCES AND LOGOUT FUNCTION */
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { auth, db, logout, storage } from "../firebase";
import "./Dashboard.css";

function Dashboard() {
  /* DEFINE STATE FOR USER NAME */
  const [name, setName] = useState("");
  /* DEFINE STATE FOR FILE UPLOAD */
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  /* DEFINE STATE FOR DOWNLOADED IMAGES */
  const [gallery, setGallery] = useState([]);
  /* LOAD AUTH STATUS */
  const [user, loading, error] = useAuthState(auth); // eslint-disable-line
  const navigate = useNavigate();
  /* FETCH USER NAME FROM FIRESTORE */
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err); // eslint-disable-line
      console.log("An error occured while fetching user data"); // eslint-disable-line
    }
  };
  /* FETCH ALL IMAGES UPLOADED BY USER */
  const fetchImages = async () => {
    const storageRef = ref(storage, `${user.uid}`);
    listAll(storageRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(ref(storage, itemRef)).then((downloadURL) => {
            setGallery((previousState) => {
              return [...previousState, downloadURL];
            });
          });
        });
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line
        // Uh-oh, an error occurred!
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];

    if (!file) return;

    const storageRef = ref(storage, `${user.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (err) => {
        alert(err); // eslint-disable-line
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    fetchUserName();
    fetchImages();
    /* console.log(user); */
  }, [user, loading]);

  return (
    <div className="dashboard">
      {/* CURRENT USER */}
      <h2>Current user</h2>
      <div className="dashboard__container">
        Logged in as
        <span>
          {name} - {user?.email}
        </span>
        <button
          type="button"
          className="dashboard__btn"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
      {/* UPLOAD FILES */}
      <h2>Uploaded new image</h2>
      <div className="dashboard__container">
        <form onSubmit={handleSubmit} className="form">
          <input type="file" />
          <button type="submit">Upload</button>
        </form>
        {!imgUrl && <span>{progresspercent}%</span>}
      </div>
      {/* UPLOADED IMAGES */}
      <h2>Uploaded images</h2>
      <div className="dashboard__container" style={{ flexDirection: "row" }}>
        {imgUrl && <img src={imgUrl} alt="uploaded file" />}
        {Object.keys(gallery).map((i) => (
          <img src={gallery[i]} alt="gallery" key={`${i}`} />
        ))}
      </div>
    </div>
  );
}
export default Dashboard;
