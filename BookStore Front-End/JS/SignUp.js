var fName,lName,userName,pass,confPass;
var stat;
var formEle;

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

    document.getElementById("fName").addEventListener("keyup",enterKeyPressed);
    document.getElementById("lName").addEventListener("keyup",enterKeyPressed);
    document.getElementById("userName").addEventListener("keyup",enterKeyPressed);
    document.getElementById("pass").addEventListener("keyup",enterKeyPressed);
    document.getElementById("confPass").addEventListener("keyup",enterKeyPressed);
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
    if(validate()==false)
        return;
        
    console.log("Validation Done");
    var url="http://localhost:8080/users";
    var xmlObj=createCORSRequest("POST" , url );
    xmlObj.setRequestHeader("Content-type","application/json");
    xmlObj.onload=function()
    {
        if(this.readyState==4)
            if(this.status==204)
            {
                stat.innerHTML=this.responseText;
                return;
            }
            else if(this.status==226)
            {
                stat.innerHTML=this.responseText;
                stat.style.fontWeight="bold";
                return;
            }
            else if(this.status==201)
            {
                stat.innerHTML=this.responseText;
                window.location.href="../HTML/Login.html";
            }
        
    };

    xmlObj.onerror = function()
    {
        console.log("Error");
        stat.innerHTML="Server Offline";
    }
    var jsonData=JSON.stringify({
        "userFirstName" : fName.value,
        "userLastName" : lName.value,
        "credUser" : userName.value,
        "credPass" : pass.value
    }

    );
    xmlObj.send(jsonData);

}