var username,password,formEle,stat;


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
        signInUser();
    }
}

function onLoadFunction()
{
    formEle=document.forms["logInForm"];
    username=formEle["username"];
    password=formEle["password"];


    document.getElementById("username").addEventListener("keyup",enterKeyPressed);
    document.getElementById("password").addEventListener("keyup",enterKeyPressed);
    stat=document.getElementById("stat");
    stat.innerHTML="";
}

window.onload=onLoadFunction;


function validate()
{
    stat.innerHTML="";
    stat.style.fontWeight="normal";
    if(username.value=="" || password.value=="")
    {
        window.alert("Fields Empty");
        return false;
    }
    return true;
}


function signInUser()
{
    if(validate()==false)
        return;
    
        console.log("Validation Done");
        var url="http://localhost:8080/user/authenticate";
        var url1="http://localhost:8080/users";
        var xmlObj=createCORSRequest("POST",url);
        xmlObj.setRequestHeader("Content-type","application/json");
        xmlObj.onload=function()
        {
            if(this.readyState==4)
                if(this.status==401)
                {
                    stat.style.fontWeight="bold";
                    stat.innerHTML=this.responseText;
                    password.value="";
                    return;
                }
                else if(this.status==202)
                {
                    stat.style.fontWeight="normal";
                    stat.innerHTML="Welcome, "+this.responseText;
                    sessionStorage.setItem("userName",username.value);
                    sessionStorage.setItem("personName",this.responseText);
                    username.value="";
                    password.value="";
                    window.location.href="../HTML/Home.html";
                }
        }
        xmlObj.onerror = function()
        {
            console.log("Error");
            stat.innerHTML="Server Offline";
        }
        var jsonData=JSON.stringify({
            "username" : username.value ,
            "password" : password.value
        });
        console.log(jsonData);
        xmlObj.send(jsonData);
    
}
