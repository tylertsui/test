const toUpload = () => {
    window.location.replace("./upload.html");
}

const toUser = () => {
    window.location.replace("./account.html");
}

const navigate_ebook = () => {
    window.location.replace("./display.html");
}
const access_token = () => {
    var current_url = window.location.href;
    console.log("current url: " + current_url + "\n");
    current_url = current_url.toString();
    console.log("CURRENT URL: " + current_url + "\n");
    var index = current_url.indexOf("#");
    console.log("INDEX: " + index + "\n");

    var parameters = current_url.substring(index + 1);
    console.log("url parameters: " + parameters + "\n");

    var token = getParameter(parameters, "id_token=");
    var access = getParameter(parameters, "access_token=");

    console.log("token: " + token + "\n");
    console.log("access: " + access + "\n");
    return parameters;
}

const display_results = (data) => {
    for (let i = 0; i < data.length; i++) {
        let button = document.createElement("button");
        let new_div = document.createElement("div");
        let ebook =  data[i];
        button.innerHTML = ebook.title;
        button.onclick = () => {
            sessionStorage.setItem("title", ebook.title);
            sessionStorage.setItem("author", ebook.author);
            sessionStorage.setItem("year", ebook.year);
            sessionStorage.setItem("content", ebook.content);
            sessionStorage.setItem("genre", ebook.genre);
            sessionStorage.setItem("bookID", ebook.id);
            navigate_ebook();
        }
        new_div.appendChild(button);
        document.getElementById("search_results").appendChild(new_div);
    }
}

const search_by_title = (title) => {
    let token = sessionStorage.getItem("token");
    axios({
        method: 'GET',
        url: `${BASE_URL}/api/ebooks/title/${title}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data.msg);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
    })
}

const search_by_genre = (genre) => {
    let token = sessionStorage.getItem("token");
    axios({
        method: 'GET',
        url: `${BASE_URL}/api/ebooks/genre/${genre}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data.msg);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
    })
}

const search_by_author = (author) => {
    let token = sessionStorage.getItem("token");
    axios({
        method: 'GET',
        url: `${BASE_URL}/api/ebooks/author/${author}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data.msg);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
    })
}

const search_by_year = (year) => {
    let token = sessionStorage.getItem("token");
    axios({
        method: 'GET',
        url: `${BASE_URL}/api/ebooks/year/${year}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data.msg);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
    })
}

const search_by_user = () => {
    access_token();
    let token = sessionStorage.getItem("token");
    axios({
        method: 'GET',
        url: `${BASE_URL}/prod/ebooks`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data.msg);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
    })
}

const search_by_specific_user = (specific_user) => {
    let token = sessionStorage.getItem("token");
    axios({
        method: 'GET',
        url: `${BASE_URL}/api/ebooks/uploader/${specific_user}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data.msg);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
    })
}

const search_function = () => {
    let search = document.getElementById("eb_search").value;
    let search_choice = document.getElementById("search_o");
    let search_option;

    for (let i = 0; i < search_choice.length; i++) {
        if (search_choice[i].checked) {
            search_option = search_choice[i].value;
            break;
        }
    }
    console.log(search_option);
    if (search_option == "title") {
        search_by_title(search.toLowerCase());
    } else if (search_option == "genre") {
        search_by_genre(search.toLowerCase());
    } else if (search_option == "author") {
        search_by_author(search.toLowerCase());
    } else if (search_option == "year") {
        search_by_year(search);
    } else if (search_option == "user") {
        search_by_specific_user(search.toLowerCase());
    }
}

const pageNavigation = () => {
    let upload = document.getElementById("eb_upload");
    let user = document.getElementById("user_info_settings");
    let submit = document.getElementById("eb_submit");
    let user_search = document.getElementById("eb_user_search");

    upload.onclick = toUpload;
    user.onclick = toUser;
    submit.onclick = search_function;
    user_search.onclick = search_by_user;
}

const signOut = () => {
    sessionStorage.clear();
    redirectToHome();
}

const token = getToken();

const main = () => {
    console.log("TOKEN::::" + token);
    if (!checkURLForToken(token)) {
        redirectToHome();
    }
    pageNavigation();
}

main();