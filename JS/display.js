const navigate_user = () => {
    console.log(sessionStorage.getItem("cognito_url"));
    window.location.replace(sessionStorage.getItem("cognito_url"));
    // history.back();
}

const page_populate = () => {
    let ebook = {
        title: sessionStorage.getItem("title"),
        author: sessionStorage.getItem("author"),
        year: sessionStorage.getItem("year"),
        content: sessionStorage.getItem("content"),
        genre: sessionStorage.getItem("genre")
    }
    let navigate_return = document.getElementById("nav_back");
    let paragraph = document.createElement("p");
    paragraph.innerHTML = ebook.content;

    document.getElementById("title").innerHTML = `Title: ${ebook.title}`;
    document.getElementById("author").innerHTML = `Author: ${ebook.author}`;
    document.getElementById("genre").innerHTML = `Genre: ${ebook.genre}`;
    document.getElementById("year").innerHTML = `Published on: ${ebook.year}`;
    document.getElementById("ebook_contents").appendChild(paragraph);

    navigate_return.onclick = navigate_user;
    navigate_return.innerHTML = "Return";

}

const main = () => {
    page_populate();
    console.log(sessionStorage.getItem("cognito_url"));

}

main();