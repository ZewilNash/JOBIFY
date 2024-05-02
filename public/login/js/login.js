window.onload = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if(user){
        window.location.href = `/feed/${user.user._id}`;
    }else {

        document.querySelector("#loginbtn").addEventListener("click" , (event) => loginUser(event));

       async function loginUser(e){
           e.preventDefault();
           let email = document.querySelector("#email").value;
           let password = document.querySelector("#password").value;

           let uri = document.URL;
            uri = uri.split("login")[0];

           axios.post(String(uri) + `api/v1/auth/login`, {
            email,password
           
        }

        ).then(res => {

            console.log(res);


            const user_data = res.data.user;

            const token = res.data.token;

            console.log(user_data , token);
            


            const user_obj = {
                user: user_data,
                token:token
            }

            localStorage.setItem("user", JSON.stringify(user_obj));


            window.location.href = `/feed/${user_data._id}`;

        }).catch(err => {
            console.log(err);

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