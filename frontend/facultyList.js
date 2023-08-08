// var deptName = localStorage.getItem("deptName");
var deptName = localStorage.getItem("deptName");

const background=`<h1>WELCOME TO<br>DEPARTMENT OF ${deptName}</h1>`;
document.querySelector(".background").innerHTML = background;

const facultylist = "<hr><h2>Faculty List</h2><hr>";
document.getElementById("faculty").innerHTML = facultylist;

console.log(deptName);
// var name = JSON.parse(localStorage.getItem(linkId));
fetch("https://cuet-teachers-portfolio-zvxe.onrender.com/api/v1/depts/" + deptName)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    console.log(data.deptname);
    var mainDiv = document.querySelector(".allTeacher");
    var count = data.teachers.length;
    console.log(count);
    var myName = "prantiq";
    for (var i = 0; i < count; ++i) {
      var teacherInfo = data.teachers[i];
      var elementDiv = document.createElement("div");
      elementDiv.classList.add("dept-teacher");

      var elementImage = document.createElement("div");
      elementImage.classList.add("image");

      var newImage = document.createElement('img');
      newImage.src=`./image/${teacherInfo.img}`;
      console.log(teacherInfo.img);
      elementImage.appendChild(newImage);


      elementDiv.appendChild(elementImage);
      var elementName = document.createTextNode(teacherInfo.name);
      var elementPosition = document.createTextNode(teacherInfo.post);
      var elementEmail = document.createTextNode(teacherInfo.mail);
      var elementPhno = document.createTextNode(teacherInfo.phno);
      var elementInfo = document.createElement("div");
      elementInfo.classList.add("teacherInfo");
      elementInfo.appendChild(elementName);
      elementInfo.appendChild(document.createElement("br"));
      elementInfo.appendChild(elementPosition);
      elementInfo.appendChild(document.createElement("br"));
      elementInfo.appendChild(elementEmail);
      elementInfo.appendChild(document.createElement("br"));
      elementInfo.appendChild(elementPhno);
      elementDiv.appendChild(elementInfo);
     

      //adding view details button
      var elementButton = document.createElement('button');
      elementButton.setAttribute('type','button');
      elementButton.setAttribute('class','buttonDetails');
      elementButton.setAttribute('id',teacherInfo._id);
      elementButton.setAttribute('onclick','handleLinkClick(this)');
      elementButton.textContent = 'view details';
      elementDiv.appendChild(elementButton);

      mainDiv.appendChild(elementDiv);

    }
  })
  .catch((error) => console.log(error));

  function handleLinkClick(clickedLink) {
    const linkId = clickedLink.id;
    console.log(`Clicked link ID: ${linkId}`);
    console.log(typeof linkId);

    var obj = {
      islogged: false
    };
    const tech_by_mail ={
      _id: linkId
    }
    obj.tech_by_mail=tech_by_mail;
    console.log(obj);
    localStorage.setItem('obj',JSON.stringify(obj));
    window.location.href = '/frontend/teacher.html';
    // localStorage.setItem('deptName',linkId);
    // window.location.href = '/frontend/facultyList.html';
    // Do other actions with the link ID as needed

      
  }
