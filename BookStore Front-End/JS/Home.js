var imgCounter;
var img;
var logInTab;
var spanTime,selector,search1,search2;
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

function ssHandler()
{
    img=document.getElementsByClassName("slideShow");
    for(var i=0;i<img.length;i++)
        img[i].style.display="none";
    imgCounter++;
    if(imgCounter>img.length)
        imgCounter=1;
    img[imgCounter-1].style.display="block";
    setTimeout(ssHandler,5000);
}

function nextOrPrev(input)
{
    for(var i=0;i<img.length;i++)
        img[i].style.display="none";
    if(input<0)
    {
        imgCounter--;
        if(imgCounter<1)
            imgCounter=4;
        img[imgCounter-1].style.display="block";
    }
    else
    {
        imgCounter++;
        if(imgCounter>4)
            imgCounter=1;
        img[imgCounter-1].style.display="block"
    }

}

function addComBoBox()
{
    var prepStr="<select name=\"bookCategory\" id=\"bookCategory\" class=\"curvedInput\" style=\"width:60%\"><option value=\"ACTION_ADVENTURE\">Action Adventure</option>";
    prepStr+="<option value=\"ANTHOLOGY\">Anthology</option><option value=\"CLASSIC\">Classic</option>";
    prepStr+="<option value=\"COMIC_NOVEL\">Comic Novel</option>";
    prepStr+="<option value=\"CRIME_DETECTIVE\">Crime Detective</option><option value=\"DRAMA\">Drama</option>";
    prepStr+="<option value=\"FABLE\">Fable</option><option value=\"FAIRY_TALE\">Fairy Tale</option>";
    prepStr+="<option value=\"FAN_FICTION\">Fan Fiction</option>";
    prepStr+="<option value=\"FANTASY\">Fantasy</option>";
    prepStr+="<option value=\"HISTORICAL_FICTION\">Historical Fiction</option>";
    prepStr+="<option value=\"HORROR\">Horror</option>";
    prepStr+="<option value=\"HUMOR\">Humor</option>";
    prepStr+="<option value=\"LEGEND\">Legend</option>";
    prepStr+="<option value=\"MAGICAL_REALISM\">Magical Realism</option>";
    prepStr+="<option value=\"MYSTERY\">Mystery</option>";
    prepStr+="<option value=\"MYTHOLOGY\">Mythology</option>";
    prepStr+="<option value=\"ROMANCE\">Romance</option>";
    prepStr+="<option value=\"SCIENCE_FICTION\">Science Fiction</option><option value=\"SUSPENSE_THRILLER\">Suspense Thriller</option>";
    prepStr+="<option value=\"SOCIAL_COMMENTARY\">Social Commentary</option></select>";
    return prepStr;
}



function selectSet(item)
{
    if(item=="Name")
    {
        spanTime.innerHTML="<input type=\"text\" placeholder=\"Book Name\" id=\"search1\" style=\"width: 60%;\">";
        search1=document.getElementById("search1");
    }
    else if(item=="Author")
    {
        spanTime.innerHTML="<input type=\"text\" placeholder=\"Author First Name\" id=\"search1\" style=\"width: 30%;\"><input type=\"text\" placeholder=\"Author Last Name\" id=\"search2\" style=\"width: 30%;\">"
        search1=document.getElementById("search1");
        search2=document.getElementById("search2");
    }
    else if(item=="Category")
    {
        spanTime.innerHTML=addComBoBox();
        search1=document.getElementById("bookCategory");
    }
}





window.onload=onPageLoadFn;
function onPageLoadFn()
{
    imgCounter=0;
    ssHandler();
    logInTab = document.getElementById("userTab");
    var userName=sessionStorage.getItem("userName");
    var fullName=sessionStorage.getItem("personName");

    if(userName==null)
    {
        logInTab.innerHTML="Sign In your Account";
        logInTab.href="Login.html";
    }
    else
    {
        logInTab.innerHTML="Welcome "+fullName+", Your Profile";
        logInTab.href="../HTML/Profile.html";
    }

    spanTime=document.getElementById("inpBoxes");
    selector=document.getElementById("option");
    selectSet(selector.value);
}


function onSearchData()
{
    if(selector.value=="Name")
    {
        if(search1.value=="")
        {
            window.alert("Enter some Book Name keywords");
            return;
        }
        sessionStorage.setItem("searchBy","Name");
        sessionStorage.setItem("search1",search1.value);
        window.location.href="../HTML/SearchResult.html";
    }
    else if(selector.value=="Category")
    {
        sessionStorage.setItem("searchBy","Category");
        sessionStorage.setItem("search1",search1.value);
        window.location.href="../HTML/SearchResult.html";
    }
    else if(selector.value=="Author")
    {
        sessionStorage.setItem("searchBy","Author");
        sessionStorage.setItem("search1",search1.value);
        sessionStorage.setItem("search2",search2.value);
        window.location.href="../HTML/SearchResult.html";
    }
}