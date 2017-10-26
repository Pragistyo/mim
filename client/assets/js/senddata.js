function senddata () {

    axios.post('http://localhost:3000/users', {
        accessToken: localStorage.getItem("fbaccesstoken"),
        userdata: localStorage.getItem("userdata")
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })

}
