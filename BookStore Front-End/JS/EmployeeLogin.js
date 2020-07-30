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
    
    
        var url="http://localhost:8080/credential";
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
                    var url1="http://localhost:8080/employee/username/"+username.value;
                    var httpObj=createCORSRequest("GET",url);
                    httpObj.open("GET",url1,true);
                    httpObj.onload=function()
                    {
                        if(this.readyState==4 && this.status==200)
                        {
                            var jsonData=JSON.parse(this.responseText);
                            if(jsonData==null)
                            {
                                sessionStorage.setItem("username","Admin");
                                console.log("Setting Value");
                                window.location.href="../HTML/Admin.html";
                                return;
                            }
                            else if(jsonData.length==0)
                            {
                                sessionStorage.setItem("username","Admin");
                                console.log("Setting Value");
                                window.location.href="../HTML/Admin.html";
                                return;
                            }

                            sessionStorage.setItem("username",username.value);
                            window.location.href="../HTML/Employee.html"
                        }
                    }
                    httpObj.send();
                    //window.location.href="../HTML/Home.html";
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
        xmlObj.send(jsonData);
    
}
