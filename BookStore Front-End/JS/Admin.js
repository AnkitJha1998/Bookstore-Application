var bookName,bookCategory,authorFname,authorLname,price;
function createCORSRequest(method,url)
{
    var xhr = new XMLHttpRequest;
    if("withCredentials" in xhr){
        xhr.open(method,url,true);
    }
    else if(typeof XDomainRequest != "undefined")
    {
        xhr = new XDomainRequest();
        xhr.open(method,url);
    }
    else{
        xhr=null;
    }
    return xhr;
}

function enterKeyPressed()
{
    if(event.keyCode==13)
    {
        event.preventDefault();
        addBook();
    }
}


window.onload=function()
{
    var form=document.forms["bookEntry"];
    bookName=form["bName"];
    bookCategory=form["bookCategory"];
    authorFname=form["bAuthorFname"];
    authorLname=form["bAuthorLname"];
    price=form["bPrice"];

    document.getElementById("bName").addEventListener("keyup",enterKeyPressed);
    document.getElementById("bAuthorFname").addEventListener("keyup",enterKeyPressed);
    document.getElementById("bAuthorLname").addEventListener("keyup",enterKeyPressed);
    document.getElementById("bPrice").addEventListener("keyup",enterKeyPressed);
    
    var adminUser=sessionStorage.getItem("username");
    if(adminUser==null)
    {
        window.location.href="../HTML/EmployeeLogin.html";
    }


}

function validate()
{
    if(bookName.value=="" ) 
    {
        window.alert("Mention Book Name");
        return false;
    }
    else if(authorFname.value=="")
    {
        window.alert("Mention Author First Name");
        return false;
    }
    else if(authorLname.value=="")
    {
        window.alert("Mention author Last Name");
        return false;
    }
    else if(bPrice.value=="")
    {
        window.alert("Mention Book Price");
        return false;
    }
    return true;
}

function addBook()
{
    if(validate()==false)
    {
        window.alert("Enter All fields");
        return;
    }
    var url="http://localhost:8080/books";
    var xmlObj=createCORSRequest("POST",url);
    xmlObj.setRequestHeader("Content-type","application/json");
    xmlObj.onload=function()
    {
        if(this.readyState==4)
        {
            if(this.status==201)
            {
                bookName.value="";
                authorFname.value="";
                authorLname.value="";
                bPrice.value="";
                window.alert(this.responseText);
            }
        }
    }
    xmlObj.onerror = function()
    {
        window.alert("Server not Available");
        return;
    }
    var jsonStr=JSON.stringify({
        "bookName" : bookName.value,
        "bookCategory" : bookCategory.value,
        "authorFirstName" : authorFname.value,
        "authorLastName" : authorLname.value,
        "price" : bPrice.value
    });

    xmlObj.send(jsonStr);
}

function signOut()
{
    sessionStorage.clear("username");
    window.location.href="../HTML/EmployeeLogin.html";
}