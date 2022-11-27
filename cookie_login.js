// (function login_after() {
//     var cookie = ("is_logined");
//     const header_login_b = document.querySelector(".login_b");
//     const header_login_a = document.querySelector(".login_a");

//     document.cookie;

//     if (cookie == true) {
//         header_login_b.style.display = "none";
//         header_login_a.style.display = "block";
//     } else {
//         header_login_b.style.display = "block";
//         header_login_a.style.display = "none";
//     }
// })();

const getCookieValue = (key) => {
    let cookieKey = key + "=";
    let result = "";
    const cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
        if (cookieArr[i][0] === " ") {
            cookieArr[i] = cookieArr[i].substring(1);
        }

        if (cookieArr[i].indexOf(cookieKey) === 0) {
            result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
            return result;
        }
    }
    return result;
}
