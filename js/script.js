// globar var
var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkUrlInput = document.getElementById("bookmarkUrl");

var searchInput = document.getElementById("searchInput");

siteDataList = [];

if (localStorage.getItem("bookmarkDataContainer") !== null) {
    siteDataList = JSON.parse(localStorage.getItem("bookmarkDataContainer"));
    displayData();
};



// creat data & push it on array and localstorage & validation input
function addData() {
    if (
        validateName() == true &&
        validateUrl() == true
    ) {
        siteData = {
            siteName: bookmarkNameInput.value,
            siteUrl: bookmarkUrlInput.value,
        }

        siteDataList.push(siteData);
        clearForm();
        displayData();
        localStorage.setItem("bookmarkDataContainer", JSON.stringify(siteDataList));

        document.getElementById("messageSubmit").innerHTML = "";
    }
    else {
        document.getElementById("messageSubmit").innerHTML = "please Fill out the fields correctly"
    }
};

// clear form
function clearForm() {
    bookmarkNameInput.value = null;
    bookmarkUrlInput.value = null;
};

// display data
function displayData() {
    var cartona = "";
    for (var i = 0; i < siteDataList.length; i++) {
        cartona += `<tr>
        <td>${i + 1}</td>
        <td>${siteDataList[i].siteName}</td>
        <td><a class="btn btn-success px-4" id="btnVisit" target="_blank" href="${siteDataList[i].siteUrl}">
        Visit</a>
        </td>
        <td><button onclick="delteData(${i})" class="btn btn-danger" id="btnDelete">
        Delete</button></td>
      </tr>`
    }
    document.getElementById("tableData").innerHTML = cartona;
};

// delete data
function delteData(dataIndex) {
    siteDataList.splice(dataIndex, 1);
    displayData();
    localStorage.setItem("bookmarkDataContainer", JSON.stringify(siteDataList));
};

// seach data
function searchData() {
    var term = searchInput.value;
    var cartona = "";

    for (var i = 0; i < siteDataList.length; i++) {
        if (siteDataList[i].siteName.toLowerCase().includes(term.toLowerCase()) == true) {
            cartona += `<tr>
            <td>${i + 1}</td>
            <td>${siteDataList[i].siteName}</td>
            <td><a class="btn btn-success px-4" id="btnVisit" target="_blank" href="${siteDataList[i].siteUrl}">
            Visit</a>
            </td>
            <td><button onclick="delteData(${i})" class="btn btn-danger" id="btnDelete">
            Delete</button></td>
            </tr>`
        }
    }
    document.getElementById("tableData").innerHTML = cartona;
}




// validation input

function validateName() {
    var text = bookmarkNameInput.value;
    var regex = /^[A-Z]{3,20}$/i

    var messageInputName = document.getElementById("messageName")

    if (regex.test(text) == true) {
        bookmarkNameInput.classList.remove("is-invalid");
        bookmarkNameInput.classList.add("is-valid");
        messageInputName.classList.add("d-none");
        return true;
    }
    else {
        bookmarkNameInput.classList.add("is-invalid");
        bookmarkNameInput.classList.remove("is-valid");
        messageInputName.classList.remove("d-none");
        return false;
    }
}


function validateUrl() {
    var text = bookmarkUrlInput.value;
    var regex = /^https?:\/\/(www\.)[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/i;

    var messageInputUrl = document.getElementById("messageUrl");

    if (regex.test(text) == true) {
        bookmarkUrlInput.classList.remove("is-invalid");
        bookmarkUrlInput.classList.add("is-valid");
        messageInputUrl.classList.add("d-none");
        return true;
    }
    else {
        bookmarkUrlInput.classList.add("is-invalid");
        bookmarkUrlInput.classList.remove("is-valid");
        messageInputUrl.classList.remove("d-none");
        return false;
    }
}