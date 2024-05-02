window.onload = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if(user){
        window.location.href = `/feed/${user.user._id}`;
    }
}