import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    songName: "",
    songDuration: "",
    albumName: "",
    songType: "",
    songLyrics: "",
    songDate: "",
    pic: "",
    audio: "",
  });
  const [songsList, setSongsList] = useState([]);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUploadPic = async (event) => {
    const fileUploaded = event.target.files[0];
    const formData = new FormData();
    formData.append("image", fileUploaded);
    setFormData((prevFormData) => ({
      ...prevFormData,
      pic: fileUploaded,
    }));
    console.log("test formData fileUploaded", fileUploaded, formData);
  };
  const handleUploadAudio = async (event) => {
    const fileUploaded = event.target.files[0];

    setFormData((prevFormData) => ({
      ...prevFormData,
      audio: fileUploaded,
    }));
    console.log("test formData fileUploaded", fileUploaded);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.songName);
    form.append("audioTime", formData.songDuration);
    form.append("artistName", formData.name);
    form.append("category", formData.songType);
    form.append("releasedDate", formData.songDate);
    form.append("audioWords", formData.songLyrics);
    form.append("image", formData.pic);
    form.append("audio", formData.audio);
    console.log("test formData", form.get("name"), form, formData);
    axios
      .post("https://spotiphy-back.herokuapp.com/audio", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("res test", res);
        setSongsList(res.data.audoes);
        setFormData({
          name: "",
          songName: "",
          songDuration: "",
          albumName: "",
          songType: "",
          songLyrics: "",
          songDate: "",
          pic: "",
          audio: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("https://spotiphy-back.herokuapp.com/audio")
      .then((res) => {
        console.log("res test", res);
        setSongsList(res.data.audio);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <form className="App" onSubmit={handleSubmit}>
        <div>
          <label>صورة الاغنية</label>
          <input type="file" accept="image/*" onChange={handleUploadPic} />
        </div>
        <div>
          <label>اسم المغني</label>
          <input
            onChange={handleChange}
            value={formData.name}
            name="name"
            placeholder="اسم المغني"
          />
        </div>
        <div>
          <label>اسم الاغنية</label>
          <input
            onChange={handleChange}
            value={formData.songName}
            name="songName"
            placeholder="اسم الاغنية"
          />
        </div>
        <div>
          <label>الاغنية</label>
          <input type="file" accept="audio/*" onChange={handleUploadAudio} />
        </div>
        <div>
          <label>طول الاغنية</label>
          <input
            onChange={handleChange}
            value={formData.songDuration}
            name="songDuration"
            placeholder="طولها"
          />
        </div>
        <div>
          <label>اسم الالبوم</label>
          <input
            onChange={handleChange}
            value={formData.albumName}
            name="albumName"
            placeholder="اسم الالبوم"
          />
        </div>
        <div>
          <label>نوع الاغنية</label>
          <input
            onChange={handleChange}
            value={formData.songType}
            name="songType"
            placeholder="نوعها"
          />
        </div>
        <div>
          <label>كلمات الاغنية</label>
          <textarea
            onChange={handleChange}
            value={formData.songLyrics}
            name="songLyrics"
            placeholder="كلمات الاغنية"
          />
        </div>
        <div>
          <label>تاريخ الاغنية</label>
          <input
            onChange={handleChange}
            value={formData.songDate}
            name="songDate"
            placeholder="تاريخ الاغنية"
          />
        </div>
        <input type="submit" />
      </form>
      <div>
        {songsList.map((song) => (
          <div
            key={song._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
            }}
          >
            <div>
              <span>Artist Name</span> {song.artistName}
            </div>
            <div>
              <span>Song Name</span> {song.name}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
