const getToken = () => {
    // let user = {
    //     userID: sessionStorage.getItem("userID"),
    //     username: sessionStorage.getItem("username"),
    //     email: sessionStorage.getItem("email"),
    //     token: sessionStorage.getItem("token"),
    //     password: sessionStorage.getItem("password")
    // }
    let token = window.location.href;
    return token;
}

const checkURLForToken = (url) => {
    let hasToken = false;
    if (url.includes("id_token")) {
        hasToken = true;
    }
    return hasToken;
}

const redirectToHome = () => {
    window.location.replace("https://ebooks-example.auth.us-west-2.amazoncognito.com/signup?client_id=1pcuginu18b171s6j4u7r0l4s1&response_type=token&scope=email+openid&redirect_uri=https://master.d2iiabk636d3yd.amplifyapp.com/");
}