window.onload = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "/login";
    } else {
        let user = JSON.parse(localStorage.getItem("user")) || [];
        let token = user.token;

        console.log(token);


        user = user.user;


        async function getUsers(value) {
            document.querySelector("#result").innerHTML = "";
            let uri = document.URL;
            uri = uri.split("feed")[0];
            const data = await axios.get(uri + `api/v1/auth/users/${user.role === "worker" ? "customer" : "worker"}/${value}`, {
                headers: { 'Authorization': 'Bearer ' + token }
            });

            let users = data.data.users;


            users.forEach(user => {
                
                
                let container = document.createElement("div");
                container.setAttribute("id" , `${user._id}`);
                container.setAttribute("class" , "main");

                let HTML = `
                <a href="/user/${user._id}" data-user-id="${user._id}" id="user_link">
                <input id="hidden" hidden value="${user.email}" />    
                <div data-user-id="${user._id}" class="col-md-4 card-container">
                        <img data-user-id="${user._id}" src="${user.image}" />
                        <p data-user-id="${user._id}">${user.fullname}</p>
                        <p data-user-id="${user._id}">${user.profession}</p>
                        <p data-user-id="${user._id}">${user.role}</p>
                </div>
                </a>
                `;

                container.innerHTML = HTML;

                document.querySelector("#result").appendChild(container);

                var id_count = $(`[id=${user._id}]`);
                if (id_count.length > 1){
                    $(`[id=${user._id}]`).remove();
                }
                
                console.log(id_count);

            });

            document.querySelector("#user_link").addEventListener("click", (e) => {
                let { userId } = e.target.dataset;
                window.location.href = `/user/${userId}`;

            })
        }


        async function getRoleUsers() {
            document.querySelector("#result").innerHTML = "";
            let uri = document.URL;
            uri = uri.split("feed")[0];
            const data = await axios.get(uri + `api/v1/auth/users/${user.role === "worker" ? "customer" : "worker"}`, {
                headers: { 'Authorization': 'Bearer ' + token }
            });



            let users = data.data.users;

    
            

            users.forEach(user => {
     

                let container = document.createElement("div");
                container.setAttribute("id" , `${user._id}`);
                container.setAttribute("class" , "main");

                let HTML = `
                <a href="/user/${user._id}" data-user-id="${user._id}" id="user_link">
                <input id="hidden" hidden value="${user.email}" />    
                <div data-user-id="${user._id}" class="col-md-4 card-container">
                        <img data-user-id="${user._id}" src="${user.image}" />
                        <p data-user-id="${user._id}">${user.fullname}</p>
                        <p data-user-id="${user._id}">${user.profession}</p>
                        <p data-user-id="${user._id}">${user.role}</p>
                </div>
                </a>
                `;

                container.innerHTML = HTML;

                document.querySelector("#result").appendChild(container);
                
                var id_count = $(`[id=${user._id}]`);
                console.log(id_count);
                
                if (id_count.length > 1){
                    $(`[id=${user._id}]`).remove();
                }
                

            });


            document.querySelector("#user_link").addEventListener("click", (e) => {
                let { userId } = e.target.dataset;
                window.location.href = `/user/${userId}`;

            })


        }


        document.querySelector("#logout").addEventListener("click", () => {
            localStorage.clear();
            window.location.href = "/login";
        });


        document.querySelector("#search").addEventListener("input", (e) => {
            document.querySelector("#result").innerHTML = "";
            if (e.target.value) {
                document.querySelector("#result").innerHTML = "";
                getUsers(e.target.value);
            } else {
                document.querySelector("#result").innerHTML = "";
                getRoleUsers();
            }


        })

    }



}






