const toUpload = () => {
    window.location.replace("./upload.html");
}

const toUser = () => {
    window.location.replace("./account.html");
}

const navigate_ebook = () => {
    window.location.replace("./display.html");
}

const parseParameter = (url, param) => {
    let urlSplit = url.split("&");
    let returnValue;
    for (let i = 0; i < urlSplit.length; i++) {
        let urlParam = urlSplit[i];
        let index = urlParam.toString().indexOf("=");
        urlParam = urlParam.substring(0, index + 1);
        if (param === urlParam) {
            returnValue = urlSplit[i].replace(param, "");
            i = urlSplit.length; // exits for loop
        }
    }
    return returnValue;
}

const access_token = () => {
    let current_url = window.location.href;
    sessionStorage.setItem("coginito_url", current_url);
    current_url = current_url.toString();
    let index = current_url.indexOf("#");

    let parameters = current_url.substring(index + 1);

    let token = parseParameter(parameters, "id_token=");
    let access = parseParameter(parameters, "access_token=");

    return token;
}

const display_results = (data) => {
    for (let i = 0; i < data.length; i++) {
        let button = document.createElement("button");
        let new_div = document.createElement("div");
        let ebook =  data[i];
        button.innerHTML = ebook.title;
        button.onclick = () => {
            // document.getElementById("STitle").innerHTML = `Title: ${ebook.title}`;
            // document.getElementById("SAuthor").innerHTML = `Author: ${ebook.author}`;
            // document.getElementById("SGenre").innerHTML = `Genre: ${ebook.genre}`;
            // document.getElementById("SYear").innerHTML = `Publication Year: ${ebook.year}`;
            // document.getElementById("SContent").innerHTML = `Contents:\n${ebook.content}`;
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
    let token = access_token();
    axios({
        method: 'GET',
        url: `${BASE_URL}/prod/ebooks/title/${title}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.message)
    })
}

const search_by_genre = (genre) => {
    let token = access_token();
    axios({
        method: 'GET',
        url: `${BASE_URL}/prod/ebooks/genre/${genre}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.message)
    })
}

const search_by_author = (author) => {
    let token = access_token();
    axios({
        method: 'GET',
        url: `${BASE_URL}/prod/ebooks/author/${author}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.message)
    })
}

const search_by_year = (year) => {
    let token = access_token();
    axios({
        method: 'GET',
        url: `${BASE_URL}/prod/ebooks/year/${year}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.message)
    })
}

const search_by_user = () => {
    let parent = document.getElementById("search_results");
    while(parent.firstChild) {
        parent.firstChild.remove();
    }
    let token = access_token();
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
        display_results(response.data);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.message)
    })
}

const search_by_specific_user = (specific_user) => {
    let token = access_token();
    axios({
        method: 'GET',
        url: `${BASE_URL}/prod/ebooks/author/${specific_user}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(response.data);
        display_results(response.data);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.message);
    })
}

const search_function = () => {
    let parent = document.getElementById("search_results");
    while(parent.firstChild) {
        parent.firstChild.remove();
    }
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

let upload_file = async (data) => {
    let file;
    let reader;
    let contents;

    try {
        file = document.getElementById("eBook").files[0];
        reader = new FileReader();
        let promise = new Promise((resolve, reject) => {
            reader.onload = () => {
                contents = reader.result;
                data["content"] = contents;
                resolve(contents);
            }
            reader.readAsText(file);
        });
        await promise;
    } catch(err) {
        document.getElementById("error").innerHTML = "Cannot upload without choosing an appropriate file!";
        Promise.reject();
    }
}

let upload_title = (data) => {
    try {
        let title = document.getElementById("title").value.toLowerCase();
        if (title === "") {
            throw "Empty";
        }
        data["title"] = title;
    } catch(err) {
        document.getElementById("error").innerHTML = "Cannot upload without a title!";
    }
}

let upload_author = (data) => {
    try {
        let author = document.getElementById("author").value.toLowerCase();
        if (author === "") {
            throw "Empty";
        }
        data["author"] = author;
    } catch(err) {
        document.getElementById("error").innerHTML = "Cannot upload without an author!";
    }
}

let upload_year = (data) => {
    try {
        let year = parseInt(document.getElementById("year").value);
        if (year === null) {
            throw "Empty";
        }
        data["year"] = year;
    } catch(err) {
        document.getElementById("error").innerHTML = "Cannot upload without a publication year!";
    }
}

let upload_genre = (data) => {
    try {
        let genre = document.getElementById("genre").value.toLowerCase();
        if (genre === "") {
            throw "Empty";
        }
        data["genre"] = genre;
    } catch(err) {
        document.getElementById("error").innerHTML = "Cannot upload without an genre!";
    }
}

let check_values = (data) => {
    if (data["title"] === "" || data["author"] === "" || data["year"] === "" || data["contents"] ==="") {
        return false;
    } else {
        return true;
    }
}

let upload_function = async () => {
    let data = {
        title: "", 
        author: "", 
        year: null, 
        content: "",
        genre: ""};
    upload_title(data);
    upload_author(data);
    upload_year(data);
    upload_genre(data);
    await upload_file(data);
    if (check_values(data)) {
        // testing();
        uploadEBookToDB(data);
        // upload_call(data);
    }
    
}

const uploadEBookToDB = (body) => {
    let token = access_token();
    // const header = {
    //     'Content-Type': 'application/json',
    //     'x-access-token': token
    // }
    console.log(body);
    axios({
        method: 'POST',
        url: "https://khfd4o04tl.execute-api.us-west-2.amazonaws.com/prod/ebooks/add",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        data: body
    })
    // axios.post("http://localhost:8080/api/eBookAdd", body, header)
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        window.alert("EBook Successfully Uploaded!");
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.message)
    })
}

const pageNavigation = () => {
    let submit = document.getElementById("eb_submit");
    let user_search = document.getElementById("eb_user_search");
    let button = document.getElementById("submit_book");

    button.innerHTML = "Submit";
    button.onclick = upload_function;

    submit.onclick = search_function;
    user_search.onclick = search_by_user;
}

const signOut = () => {
    sessionStorage.clear();
    redirectToHome();
}

const token = getToken();

const main = () => {
    if (!checkURLForToken(token)) {
        redirectToHome();
    }
    pageNavigation();
}

main();