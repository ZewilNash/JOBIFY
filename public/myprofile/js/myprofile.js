




window.onload = () => {

    const user = JSON.parse(localStorage.getItem("user")) || [];
    console.log(user.user._id);

    if (!user) {
        window.location.href = "/login";
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

        document.querySelector(".update").addEventListener("click", (event) => updateUser(event))
        document.querySelector(".extra-btn").addEventListener("click", (event) => createExtra(event))


        async function createExtra(e) {
            e.preventDefault();
            const facebook = document.querySelector("#facebook").value;

            const instagram = document.querySelector("#instagram").value;


            const youtube = document.querySelector("#youtube").value;

            const whatsapp = document.querySelector("#whatsapp").value;

            const telegram = document.querySelector("#telegram").value;

            let uri = document.URL;
            uri = uri.split("myprofilepage")[0];

            const user = JSON.parse(localStorage.getItem("user")) || [];


            axios.post(String(uri) + `api/v1/auth/extra/${user.user._id}`, {

                facebooklink: facebook,
                instagramlink: instagram,
                youtubelink: youtube,
                whatsappnumber: whatsapp,
                telegramnumber: telegram
            }, {
                headers: {
                    Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
                }
            }

            ).then(res => {

                // console.log(res);


                const user_data = res.data.extraData;


                const user_obj = {
                    extraData: user_data,
                }

                localStorage.setItem("extraData", JSON.stringify(user_obj));


                window.location.href = `/user/${user.user._id}`;

            }).catch(err => {
                console.log(err);

                let msg = err.response.data.msg
                console.log(msg);

                document.querySelector(".error-message-extra").style.display = "block";
                document.querySelector(".error-message-extra").innerText = msg;

                setTimeout(() => {
                    document.querySelector(".error-message-extra").style.display = "none";
                    document.querySelector(".error-message-extra").innertText = "";
                }, 3000)
            });


        }


        async function updateUser(e) {
            console.log("hello");

            e.preventDefault();
            const fullname = document.querySelector("#fullname").value;

            const email = document.querySelector("#email").value;


            const bio = document.querySelector("#bio").value;

            const about = document.querySelector("#about").value;

            const minInDoller = document.querySelector("#minInDoller").value;

            const maxInDoller = document.querySelector("#maxInDoller").value;

            const profession = document.querySelector("#profession").value;


            const image = url;


            // cloudinary upload image
            // replace with your data 👇

            let uri = document.URL;
            uri = uri.split("myprofilepage")[0];



            const user = JSON.parse(localStorage.getItem("user")) || [];

            axios.patch(String(uri) + `api/v1/auth/users/${user.user._id}`, {
                fullname,
                email,
                bio,
                about,
                minInDoller,
                maxInDoller,
                profession,
                image,
            }, {
                headers: {
                    Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
                }
            }

            ).then(res => {

                // console.log(res);


                const user_data = res.data.user;
                const token = user.token;

                const user_obj = {
                    user: user_data,
                    token: token
                }

                localStorage.setItem("user", JSON.stringify(user_obj));


                window.location.href = `/user/${user.user._id}`;

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

