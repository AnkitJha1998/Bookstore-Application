var fName,lName,userName,pass,confPass;
var stat;
var formEle;
var addr;

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

function enterKeyPressed(event)
{
    if(event.keyCode==13)
    {
        event.preventDefault();
        signUpUser();
    }
}

function onLoadFunction()
{
    formEle=document.forms["signUpForm"];
    fName=formEle["fName"];
    lName=formEle["lName"];
    userName=formEle["userName"];
    pass=formEle["pass"];
    confPass=formEle["confPass"];
    stat=document.getElementById("stat");
    addr=formEle["addr"];

    document.getElementById("fName").addEventListener("keyup",enterKeyPressed);
    document.getElementById("lName").addEventListener("keyup",enterKeyPressed);
    document.getElementById("userName").addEventListener("keyup",enterKeyPressed);
    document.getElementById("pass").addEventListener("keyup",enterKeyPressed);
    document.getElementById("confPass").addEventListener("keyup",enterKeyPressed);
    document.getElementById("addr").addEventListener("keyup",enterKeyPressed);
}

window.onload=onLoadFunction;

function validate()
{
    stat.innerHTML="";
    stat.style.fontWeight="normal";
    if(fName.value=="" || lName.value==""||userName.value==""||pass.value==""||confPass.value=="")
    {
        window.alert("Fields Empty");
        return false;
    }
    if(pass.value!=confPass.value){
        stat.innerHTML="Passwords don't Match";
        return false;
    }
    return true;
}

function signUpUser()
{
    if(this.readyState==4)
    {
        if(this.status==201)
        {    
            var url="http://localhost:8080/employee";
            var xmlObj=createCORSRequest("POST" , url );
            xmlObj.setRequestHeader("Content-type","application/json");
            xmlObj.onload=function()
            {
                if(this.readyState==4)
                    if(this.status==201)
                    {
                        stat.innerHTML=this.responseText;
                        window.location.href="../HTML/EmployeeLogin.html";
                    }
            };

            xmlObj.onerror = function()
            {
                console.log("Error");
                stat.innerHTML="Server Offline";
            }
            var jsonData=JSON.stringify({
                "empFirstName" : fName.value,
                "empLastName" : lName.value,
                "empUser" : userName.value,
                "empAddress" : addr.value
            }

            );
            xmlObj.send(jsonData);
        }
        else if(this.status==409)
        {
            window.alert(this.responseText);
        }
    }
}

function addUser()
{
    if(validate()==false)
    return;
    console.log("Validation Done");
    var urlCred="http://localhost:8080/username/add";
    var xmlObj=createCORSRequest("POST",urlCred);
    xmlObj.setRequestHeader("Content-type","application/json");
    xmlObj.onload=signUpUser;
    xmlObj.onerror=function()
    {
        window.alert("Server Offline");
    }
    var data1=JSON.stringify({"username": userName.value,"password": confPass.value});
    
    xmlObj.send(data1);

}
