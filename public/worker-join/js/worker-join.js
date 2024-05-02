window.onload = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    window.location.href = `/feed/${user.user._id}`;
  } else {
    const cloud_name = "futuretodosod";
    const upload_preset = "uwpmv7sg";

    let url = "";


    const myWidget = cloudinary.createUploadWidget(
      {
        cloudName: cloud_name,
        uploadPreset: upload_preset,

      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);

          url = result.info.secure_url;
        }
      }
    );


    document.querySelector(".upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );

    document.querySelector(".create").addEventListener("click", (event) => createWorker(event))

    async function createWorker(e) {
      console.log("hello");

      e.preventDefault();
      const fullname = document.querySelector("#fullname").value;

      const email = document.querySelector("#email").value;

      const password = document.querySelector("#password").value;

      const bio = document.querySelector("#bio").value;

      const about = document.querySelector("#about").value;

      const minInDoller = document.querySelector("#minInDoller").value;

      const maxInDoller = document.querySelector("#maxInDoller").value;

      const profession = document.querySelector("#profession").value;


      const image = url;


      // cloudinary upload image
      // replace with your data 👇

      let uri = document.URL;
      uri = uri.split("worker-join")[0];





      axios.post(String(uri) + "api/v1/auth/create", {
        fullname,
        email,
        password,
        bio,
        about,
        minInDoller,
        maxInDoller,
        profession,
        image,
        role: "worker"
      }).then(res => {

        // console.log(res);


        const user = res.data.user;
        const token = res.data.token;

        const user_obj = {
          user: user,
          token: token
        }

        localStorage.setItem("user", JSON.stringify(user_obj));


        window.location.href = `/feed/${user._id}`;

      }).catch(err => {
        console.log(err);

        let msg = err.response.data.msg
        console.log(msg);

        document.querySelector(".error-message").style.display = "block";
        document.querySelector(".error-message").innerText = msg;

        setTimeout(() => {
          document.querySelector(".error-message").style.display = "none";
          document.querySelector(".error-message").innertText = "";
        }, 3000)
      });

    }
  }
}

