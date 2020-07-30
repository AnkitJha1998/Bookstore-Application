var spanTime,selector,search1,search2;
var logInTab;
var authorTable;
    
var list=[];
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

function checkList(string1,string2)
{
    for(var i=0;i<list.length;i++)
    {
        var obj=list[i];
        if(obj[0]==string1 && obj[1]==string2)
            return false;
    }
    return true;
}

function displayTable()
{
    var tableStr="<tr><th class=\"tableStyle\">Author Name</th><th class=\"tableStyle\">Books Written</th></tr>";
    for(var i=0;i<list.length;i++)
    {
        var str="<tr><td class=\"tableStyle\"><a href=\"#\" onclick=\"loadUpAuthor(" + i + ")\">"+ list[i][0]+" "+list[i][1] +"</a></td>" ;
        str+="<td class=\"tableStyle\">"+list[i][2]+"</td>";
        tableStr+=str;
    }
    authorTable.innerHTML=tableStr;
}

function loadAllAuthors()
{
    var url="http://localhost:8080/books";
    var xmlObj=createCORSRequest("GET",url);
    xmlObj.open("GET",url,true);
    xmlObj.onload=function()
    {
        if(this.readyState==4 && this.status==200 )
        {
            var jsonData=JSON.parse(this.responseText);
            for(var i=0;i<jsonData.length;i++)
            {
                var string1=jsonData[i].authorFirstName;
                var string2=jsonData[i].authorLastName;
                if(checkList(string1,string2)==true)
                {
                    var obj=[];
                    obj.push(string1);
                    obj.push(string2);
                    obj.push(1);
                    list.push(obj);
                }
                else{
                    for(var i1=0;i1<list.length;i1++)
                    {   
                        if(list[i1][0]==string1 && list[i1][1]==string2)
                        {
                            list[i1][2]+=1;
                            break;
                        }
                    }
                }
            }
            displayTable();
        }
    };
    xmlObj.onerror=function()
    {
        console.log("Server Offline or unknown error");
    }
    xmlObj.send()
}

window.onload=onPageLoadFn;
function onPageLoadFn()
{
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

    authorTable = document.getElementById("authorResults");
    loadAllAuthors();
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

function loadUpAuthor(inn)
{
    sessionStorage.setItem("authorFName",list[inn][0]);
    sessionStorage.setItem("authorLName",list[inn][1]);
    window.location.href="../HTML/AuthorInfo.html";
}