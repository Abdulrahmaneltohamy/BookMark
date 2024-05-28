// globar var
var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkUrlInput = document.getElementById("bookmarkUrl");

var searchInput = document.getElementById("searchInput");

siteDataList = [];

if (localStorage.getItem("bookmarkDataContainer") !== null) {
    siteDataList = JSON.parse(localStorage.getItem("bookmarkDataContainer"));
    displayData();
};


// creat data & push it on array and localstorage
function addData() {
    siteData = {
        siteName: bookmarkNameInput.value,
        siteUrl: bookmarkUrlInput.value,
    }

    siteDataList.push(siteData);
    clearForm();
    displayData();
    localStorage.setItem("bookmarkDataContainer", JSON.stringify(siteDataList));
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