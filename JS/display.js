const page_populate = () => {
    let ebook = {
        title: sessionStorage.getItem("title"),
        author: sessionStorage.getItem("author"),
        year: sessionStorage.getItem("year"),
        content: sessionStorage.getItem("content"),
        genre: sessionStorage.getItem("genre")
    }
    let navigate_return = document.getElementById("nav_back");

    document.getElementById("title").innerHTML = `Title: ${ebook.title}`;
    document.getElementById("author").innerHTML = `Author: ${ebook.author}`;
    document.getElementById("genre").innerHTML = `Genre: ${ebook.genre}`;
    document.getElementById("year").innerHTML = `Published on: ${ebook.year}`;
    document.getElementById("ebook_contents").innerHTML = ebook.content;

    navigate_return.onclick = navigate_user;
    navigate_return.innerHTML = "Return";

}

const main = () => {
    page_populate();
}

main();