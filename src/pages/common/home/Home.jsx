import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../../components/component/Card";
import "./Home.scss";
import { width } from "@mui/system";

function Home() {
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get("/api/blog/getAll/rent")
      .then((res) => {
        if (res.data.isSuccess === true) {
          const data = res.data.data;
          setBlogs(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // upload 1 img
  const [hospitalImage, setHospitalImage] = useState({
    file: "",
    base64: "",
  });

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const convertImage = (e) => {
    const file = e.target.files?.[0];
    getBase64(file).then((res) => {
      setHospitalImage({
        file: file,
        base64: res,
      });
    });
  };
  const submit = async (e) => {
    e.preventDefault();
    const formImage = new FormData();
    formImage.append("file", hospitalImage.file);
    if (hospitalImage.file.name) {
      await axios
        .post(`api/upload/file`, formImage)
        .then(async (res) => {
          console.log("res", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return console.log("Ảnh bệnh viện không được để trống", 1);
    }
  };

  // upload nhiều img
  const [hospitalImages, setHospitalImages] = useState([]);
  const getBase64Multiple = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const convertMultipleImage = (e) => {
    const files = e.target.files;
    const promises = Array.from(files).map((file) => getBase64Multiple(file));

    Promise.all(promises)
      .then((base64Results) => {
        const newImages = base64Results.map((base64, index) => ({
          file: files[index],
          base64: base64,
        }));
        setHospitalImages((prevImages) => [...prevImages, ...newImages]);
      })
      .catch((error) => {
        console.error("Error converting images to base64:", error);
      });
  };

  const submitMultipleImg = async (e) => {
    e.preventDefault();
    const formImage = new FormData();
    hospitalImages.forEach((image) => {
      formImage.append("files", image.file);
    });
    if (formImage) {
      await axios
        .post(`api/upload/files`, formImage)
        .then(async (res) => {
          console.log("res", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return console.log("Ảnh bệnh viện không được để trống");
    }
  };
  return (
    <>
      <div className="listCard">
        {blogs?.map((blog) => {
          return <Card blog={blog} key={blog?._id} />;
        })}
        <Card />
      </div>
      <form onSubmit={submit}>
        <input
          type="file"
          className="hospitalImage absolute bottom-0 right-0 w-8 h-8 rounded-[50%] cursor-pointer opacity-0"
          onChange={(e) => {
            convertImage(e);
          }}
          name="file"
        />
        <img src={hospitalImage.base64} alt="abc" width={100} height={100} />
        <button type="submit">Submit</button>
      </form>

      <form onSubmit={submitMultipleImg}>
        <input
          type="file"
          multiple="true"
          className="hospitalImage absolute bottom-0 right-0 w-8 h-8 rounded-[50%] cursor-pointer opacity-0"
          onChange={(e) => {
            convertMultipleImage(e);
          }}
          name="files"
        />
        {hospitalImages.map((img) => {
          return <img src={img.base64} alt="abc" width={100} height={100} />;
        })}
        <button type="submit">Submit nhiều ảnh</button>
      </form>
    </>
  );
}

export default Home;
