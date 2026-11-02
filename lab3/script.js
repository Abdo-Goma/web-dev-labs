
function addname() {
    let name = document.getElementById("tf").value;

    if (name == "") {
        return;
    }

    document.getElementById("header").innerHTML =
        "welcome " + name;

    let btn = document.createElement("button");
    btn.textContent = name;

    btn.onclick = function() {
        document.getElementById("header").innerHTML =
            "goodbye " + name;

        btn.remove();
    };

    document.getElementById("list").appendChild(btn);

    document.getElementById("tf").value = "";
}
