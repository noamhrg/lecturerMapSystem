function isLoggedIn() {
    isLoggedInService();
}

function login() {
    validteForm();
}

function validteForm() {
    var userEmail = DOM.username;
    var userPass = DOM.password;

    if(userEmail.val() == "") {
        userEmail.addClass("emptyField");

        setTimeout(()=> {
            userEmail.removeClass("emptyField");
        },1000)
    }
    if (userPass.val() == ""){
        userPass.addClass("emptyField");

        setTimeout(()=> {
            userPass.removeClass("emptyField");
        },1000)
    }
    else {
        let userEmail = DOM.username.val();
        let userPass = DOM.password.val();

        loginService(userEmail, userPass);
    }
}

function logOut() {
    logOutService();
}

function transfer(_where) {
    switch (_where) {
        case "main":
        window.location.href = "http://localhost:8080/lecturerMap/client/main.html";
            break;
        case "login":
        window.location.href = "http://localhost:8080/lecturerMap/index.html";
            break;
        default:
            break;
    }
    
    
}

function changeContent(_att) {
    $('.changing').fadeOut('fast').promise().done(function() {
        $('.changing[data-selector="'+_att+'"]').fadeIn('slow');
    });
}

function drawTechs(techs) {
    $("#current-signed-user").text(`${localStorage.getItem("current_user")}`);
    drawTechsInTable(techs);
    drawTechsInForm(techs);
}

function drawLecturers(_lecturers) {
    _lecturers.forEach(element => {

        let tr = document.createElement("tr");
        tr.classList.add("body-row");
        let nameTd = document.createElement("td");
        nameTd.innerText = `${element.firstName} ${element.lastName}`;
        nameTd.id = element.id;
        nameTd.classList.add("lecturer-first-name");
        tr.appendChild(nameTd);

        let tdAge = document.createElement("td");
        tdAge.classList.add("lecturer-age");
        tdAge.innerText = element.age;
        tr.appendChild(tdAge);
        let tdEmail = document.createElement("td");
        tdEmail.classList.add("lecturer-email");
        tdEmail.innerText = element.email;
        tr.appendChild(tdEmail);
        DOM.tbl_body.appendChild(tr);
    })
}

function drawAreas(_areas) {
    let lecturersRows = $(".lecturer-first-name");
    let lectAreas = "";
    lecturersRows.each(function (index) {
        _areas.forEach(element => {
            if (element.lectId == this.id) {
                lectAreas += element.value;
                lectAreas += ", ";
            }
        })
        lectAreas = lectAreas.substr(0, lectAreas.length - 2);
        let td = document.createElement("td");
        td.innerText = lectAreas
        td.classList.add("lecturer-areas");
        this.parentElement.appendChild(td);
        lectAreas = "";
    });
}

function drawTechsInTable(_techs) {
    _techs.forEach(element => {
        let th = document.createElement("th");
        th.scope = "col";
        th.innerText = element.value;
        th.id = element.id;
        th.classList.add("tech-th");
        DOM.tech_row.appendChild(th);
    });
}

function fillGradesNComments(_grades) {
    let lecturersRows = $(".lecturer-first-name");
    let techsCols = $(".tech-th");
    let emptyString = "-";
    lecturersRows.each(function (lecturer) {
        techsCols.each(function (tech) {
            let td = document.createElement("td");
                td.innerText = emptyString;
                td.classList.add("lect-grade");
            _grades.forEach(element => {
                if (lecturersRows[lecturer].id == element.lecturer_id) {
                    if (techsCols[tech].id == element.id) {
                        td.innerText = element.grade;
                    }

                }
            });
            lecturersRows[lecturer].parentElement.appendChild(td);
        });
    });
}

function drawAreasInForm(_formAreas){
    var formMultiSelect = $("#form-areas-select")[0];
    _formAreas.forEach(function(_area) {
        let option = document.createElement("option");
        option.value = _area.id;
        option.innerText = _area.value;
        formMultiSelect.append(option);
    })
}

function createEditDelBtns() {
    let delEditBtns =   
    `
        <button id="lec-edit-btn" class="btn btn-info  "> <i class="far fa-edit"></i>  </button>
        <button id="lec-del-btn" class="btn btn-danger "> <i class="far fa-trash-alt"></i>  </button>
    `;
    $("#buttons-div").append(delEditBtns);
    $("#lec-edit-btn").click(function() {
        editLecturer();
    })
    $("#lec-del-btn").click(function() {
        let selectedUserId = $(".selected.lecturer-first-name").prop('id');
        let selectedRow = $(".selected").parent();
        let message = confirm(`Are You Sure You Want To Delete ${$(".selected.lecturer-first-name").text()} ${$(".selected.last-name").text()} ?`);
        if(message) {
            lecturerDeleteDB(selectedUserId, selectedRow);
        }
    })
}

const columnFilter = () => {
    let columnFilterDiv = document.createElement("div");
    columnFilterDiv.classList.add("column-filter-div");
    let columnsLabel = document.createElement("label");
    columnsLabel.classList.add("search-label");
    columnsLabel.addEventListener("mouseover", function() {
        this.style.cursor = "pointer";
    })
    columnsLabel.innerText = "Skills Filter: ";
    columnFilterDiv.append(columnsLabel);
    let userInput = $('<input/>').attr({ type: 'text', id: "column-filter-input", name: 'test', id:"filter-input"});
    userInput.on("input", () => {
        columnFilterAction();
    })
    userInput.appendTo(columnsLabel);
    columnFilterDiv.append(columnsLabel);
    $("#search-div").prepend(columnFilterDiv);
    lecturerSearchInput();
}

const lecturerSearchInput = () => {
    let lecturerFilterDiv = document.createElement("div");
    lecturerFilterDiv.classList.add("lecturer-filter-div");
    let lecturerLabel = document.createElement("label");
    lecturerLabel.classList.add("search-label");
    lecturerLabel.addEventListener("mouseover", function() {
        this.style.cursor = "pointer";
    })
    lecturerLabel.innerText = "Search Lecturer: ";
    let userInput = $('<input/>').attr({ type: 'text', id: "lecturer-filter-input", id:"lecturer-input"});
    userInput.on("input", () => {
        lecturerFilterAction();
    })
    userInput.appendTo(lecturerLabel);
    lecturerFilterDiv.append(lecturerLabel);
    $("#search-div").prepend(lecturerFilterDiv);
}

const lecturerFilterAction = () => {
    if($("#lecturer-input").val() == "") {
        $(".lecturer-first-name").parent().css("display", "table-row");
    }
    else {
        $.each($(".lecturer-first-name"), (index, element) => {
            if((element.innerText.toLowerCase().includes($("#lecturer-input").val().toLowerCase()))) {
                element.parentNode.style.display = "table-row";
            }
            else { 
                element.parentNode.style.display = "none";
            }
        })
    }
}

const columnFilterAction = () => {
    let lecturerTable = $('.lecturer-table');
    if($("#filter-input").val() == "") {
        $(".lecturer-table th , .lecturer-table td").css("display", "table-cell");
    }
    else {
        $.each($('.tech-th'), (index, element) => {
            let elementIndex = $('.lecturer-table th').slice(4).index(element);
            if(!(element.innerText.toLowerCase().includes($("#filter-input").val().toLowerCase()))) {
                element.style.display = "none";
                $('.lecturer-table').find('.body-row').each(function() { 
                    $(this).find('.lect-grade').eq(index).css('display' , 'none');
                })
            }
            else {
                element.style.display = "table-cell";
                $('.lecturer-table').find('.body-row').each(function() {
                    $(this).find('.lect-grade').eq(index).css('display' , 'table-cell');
                })
            }
        })
    }
}

function drawTechsInForm(_techs) {
    let skillsSelect = $("#skills-ul");
    _techs.forEach(function(skill) {
        let skillLi = $("<li>");
        skillLi.addClass("list-group-item");
        skillLi[0].id = skill.id;
        let checkBox = $('<input type="checkbox"/>');
        checkBox[0].id = skill.id;
        checkBox.addClass("form-checkbox");
        checkBox.css("margin-left", "5px");
        checkBox.change(function() {
            if(this.checked) {
                this.parentNode.nextSibling.disabled = false;
            }
            else {
                this.parentNode.nextSibling.disabled = true;
            }
        })
        let skillLabel = $("<label/>")
        skillLabel[0].innerText = skill.value;
        skillLabel.css("font-size", "17px");
        skillLabel[0].append(checkBox[0]);
        let gradeOptionSelect = $("<select/>");
        gradeOptionSelect[0].name = skill.value;
        gradeOptionSelect[0].id = skill.id;
        gradeOptionSelect[0].disabled = true;
        gradeOptionSelect.addClass("grade-select");
        for (let index = 0; index <= 10 ; index++) {
            let option = document.createElement("option");
            option.innerText = index;
            option.value = index;
            gradeOptionSelect.append(option);
        }
        skillLi.append(skillLabel);
        skillLi.append(gradeOptionSelect);
        skillsSelect.append(skillLi);
    })
}

function showSuccessMsg() {
    msg = sessionStorage.getItem("successMsg");
    if(msg) {
        $("#success-msg-txt").text(msg);
        $("#success-msg").fadeIn(500).promise().done(function() {
            setTimeout(function() {
                $("#success-msg").fadeOut();
            }, 1000)
        })
    }
    sessionStorage.removeItem("successMsg");
}

function lectFormSubmit() {
    lectFormSubmitService();
}

function userControllButon(){
    var li = document.createElement("li");
    li.classList.add("nav-item");
    let a = document.createElement("a");
    let btn = document.createElement("button");
    btn.classList.add("btn","btn-secondary", "nav-btn");
    btn.innerText = "User Control";
    a.classList.add("nav-link");
    a.classList.add("active");
    a.setAttribute("data-selector", "user-control-table");
    a.addEventListener("click",function(){
        changeContent("user-control-table");
        userService()
    })
    a.appendChild(btn);
    li.appendChild(a);
    DOM.navBar .appendChild(li);
}

function areaSkillsControllButon(){
    var li = document.createElement("li");
    li.classList.add("nav-item");
    let a = document.createElement("a");
    let btn = document.createElement("button");
    btn.classList.add("btn","btn-secondary", "nav-btn");
    btn.innerText = "Area & Skills controller";
    a.classList.add("nav-link");
    a.classList.add("active");
    a.setAttribute("data-selector", "areaAndSkill-control-table");
    a.addEventListener("click",function(){
        changeContent("areaAndSkill-control-table");
        areaAndSkillService();
    })
    a.appendChild(btn);
    li.appendChild(a);
    DOM.navBar .appendChild(li);
}

function drawUsers(_users) {
    DOM.tbl_bodyU.innerText="";
    
    _users.forEach(element => {
        let tr = document.createElement("tr");
        tr.classList.add("alex-body-row");
        let tdFirst = document.createElement("td");
        tdFirst.innerText = element.first_name;
        tdFirst.id = element.id;
        tdFirst.classList.add("lecturer-first-name");
        tr.appendChild(tdFirst);
        let tdLast = document.createElement("td");
        tdLast.innerText = element.last_name;
        tr.appendChild(tdLast);
        let tdEmail = document.createElement("td");
        tdEmail.innerText = element.email;
        tr.appendChild(tdEmail);
        let tdRole = document.createElement("td");
        tdRole.innerText = element.role;
        tr.appendChild(tdRole);
        let tdCdate = document.createElement("td");
        tdCdate.innerText = element.date_created;
        tr.appendChild(tdCdate);
        let tdDdate = document.createElement("td");
        if(element.date_deleted==null){
            tdDdate.innerText ="AVALABLE";

        }else{
            tdDdate.innerText = element.date_deleted;
        }
        tr.appendChild(tdDdate);
        DOM.tbl_bodyU.appendChild(tr);
    })
    $('#userTable').DataTable();
}

function openAddModal(){
    $("#addUserModal").modal()
   userModal.addName.value="";
   userModal.addLname.value="";
   userModal.addEmail.value="";
   userModal.addPass.value="";
   userModal.addrole.value="";
};

function openEditModal(){
    let selected= $("#userTable .selected");
    if (selected.length>0){
        $("#editUserModal").modal()
        let uid=selected[0].id
        let uname = userModal.editName
        let ulname=  userModal.editLname
        let uemail= userModal.editEmail
        let upass= userModal.editPass
        let urole = userModal.editrole
        uname.value=selected[0].innerText;
        ulname.value=selected[1].innerText;
        uemail.value=selected[2].innerText;
        upass.value="";
        document.getElementById("emodalBtn").addEventListener("click",function(){
            if(uname.value&&uname.value!=""&& ulname.value&& ulname.value!=""&&uemail.value&&uemail.value!=""&&urole.value&&urole.value!=""){
               if( uemail.value.includes("@")){
                editUserDB(uid,uname.value, ulname.value, uemail.value,upass.value,urole.value);
               }else{  alert("enter valid email")}
            }else{
                alert("you must insert all the categories");
            }
    })
    }else{
        alert("you need to choose user")
    }
};

function addUser(){
    let fname=  userModal.addName.value;
    let Lname=  userModal.addLname.value;
    let Email= userModal.addEmail.value;
    let Pass=  userModal.addPass.value;
    let Role= userModal.addrole.value;
    if(fname&&fname!=""&&Lname&&Lname!=""&&Email&&Email!=""&&Pass&&Pass!=""&&Role&&Role!=""){
        if( Email.includes("@")){
            addUserService(fname,Lname,Email,Pass,Role); 
           }else{  alert("enter valid email")}
    }else{
        alert("you must insert all the categories")
    };
}


function selectRow() {
    $("#lect-table-id td").hover(function() {
        $(this).parent().children().css("color", "#e74c3c");
    }, function() {
        $(this).parent().children().css("color", "rgb(0,0,0)");
    })

    $("#lect-table-id td").click(function() {
        let thisRow = $(this).parent().children();
        let allRows = $("#lect-table-id td");
        if(thisRow.hasClass("selected")) {
            thisRow.removeClass("selected");
            return;
        }
        else {
            allRows.removeClass("selected");
            thisRow.addClass("selected");
            return;
        }
    })
}

function cleanForm() {  
    $('#msform').find("input[type=text], input[type=email] ").val("");
    $("#form-areas-select option:selected").prop("selected", false);
    // $.each($("#form-areas-select")[0], function(key,value) { 
    //     value.select = false;
    // })
    $("#skills-ul li input[type='checkbox']").prop('checked', false);
    $("#skills-ul").find("select").val(0);
    $("#skills-ul").find("select").attr("disabled", true);
}

function editLecturer() {
    let selectedUserId = $(".selected.lecturer-first-name").prop('id')
    if($(".selected").length == 0) {
        alert("Please pick a lecturer");
    }
    else {
        cleanForm();
        getLecturerEditService(selectedUserId);
        changeContent("add_lec");
    }
}

function fillForm(_lectInfoObject) {
    formFields.firstNameField.val(_lectInfoObject.lectInfo[0].firstName);
    formFields.lastNameField.val(_lectInfoObject.lectInfo[0].lastName);
    formFields.ageField.val(_lectInfoObject.lectInfo[0].age);
    formFields.emailField.val(_lectInfoObject.lectInfo[0].email);

    let lecturerAreasArray = _lectInfoObject.lectAreas;
    insertAreasToEdit(lecturerAreasArray);
    let lecturerSkillsArray = _lectInfoObject.lectSkills; 
    insertSkillsToEdit(lecturerSkillsArray);

}

function insertAreasToEdit(_areasArray) {
    $.each($("#form-areas-select option"), function(key, formOption) {
        _areasArray.forEach(function(value, index) {
            if(formOption.value == value.area_id) {
                formOption.selected = true;
            }
        })
    })
}

function insertSkillsToEdit(lecturerSkills) {
    let skillsSelectList = $("#skills-ul").children();
    $.each(skillsSelectList, (key, li) => {
        lecturerSkills.forEach((skill, index) => {
            if(li.id == skill.tech_id) {
                li.lastChild.value = skill.grade;
                $(li).find('input').prop('checked', 'true');
                $(li).find('select').removeAttr("disabled");
            }
        })
    })
}

function selectUserRow() {
    $("#userTable td").hover(function() {
        $(this).parent().children().css("color", "#e74c3c");
    }, function() {
        $(this).parent().children().css("color", "rgb(0,0,0)");
    })

    $("#userTable td").click(function() {
        ($(this).parent().children())
        let thisRow = $(this).parent().children();
        let allRows = $("td");
        if(thisRow.hasClass("selected")) {
            thisRow.removeClass("selected");
            return;
        }
        else {
            allRows.removeClass("selected");
            thisRow.addClass("selected");
            return;
        }
    })
}


function drawAreasAndSkill(areaORskill){
    DOM.areaTable.innerText="";
    DOM.skillTable.innerText="";
    areaORskill.forEach(element => {
        let tr = document.createElement("tr");
    tr.classList.add("alex-body-row");
    let tdFirst = document.createElement("td");
    tdFirst.innerText = element.value;
    areaAndskillFields.aasArr.push(element.value.toLowerCase())
    tdFirst.id = element.id;
    tr.appendChild(tdFirst);



        if(element.list_id==1){
          
            DOM.areaTable.appendChild(tr);
        }else{
        
            DOM.skillTable.appendChild(tr);

        }
       

    })
    
    selectAreaRow() 
    selectSkillRow()
}

function selectAreaRow() {
    $("#areaTable td").hover(function() {
        $(this).parent().children().css("color", "#e74c3c");
    }, function() {
        $(this).parent().children().css("color", "rgb(0,0,0)");
    })

    $("#areaTable td").click(function() {
        ($(this).parent()[0].innerText)
        let thisRow = $(this).parent().children();
        let allRows = $("td");
        if(thisRow.hasClass("selected")) {
            thisRow.removeClass("selected");
            return;
        }
        else {
            allRows.removeClass("selected");
            thisRow.addClass("selected");
            return;
        }
    })
}
function selectSkillRow() {
    $("#skillTable td").hover(function() {
        $(this).parent().children().css("color", "#e74c3c");
    }, function() {
        $(this).parent().children().css("color", "rgb(0,0,0)");
    })

    $("#skillTable td").click(function() {
        ($(this).parent()[0].innerText)
        let thisRow = $(this).parent().children();
        let allRows = $("td");
        if(thisRow.hasClass("selected")) {
            thisRow.removeClass("selected");
            return;
        }
        else {
            allRows.removeClass("selected");
            thisRow.addClass("selected");
            return;
        }
    })
}


function addSkill(){

    let skillToAdd=prompt("what Skill you would like to add","");
    if( areaAndskillFields.aasArr.includes(skillToAdd.toLowerCase())){

        alert("this Area already exist");
    }else{
        addSkillDB(skillToAdd);
    }
}

function addArea(){
    let areaToAdd=prompt("what Area you would like to add","");
    if( areaAndskillFields.aasArr.includes(areaToAdd.toLowerCase())){

        alert("this Area already exist");
    }else{
        addAreaDB(areaToAdd);
    }
}

function delArea() {

    let selectedArea= $("#areaTable .selected");
   
    if (selectedArea.length>0){
        
        var result = confirm("sure you want to delete" +selectedArea[0].innerText+"?");
    if (result) {
        let _id= parseInt($("#areaTable .selected")[0].id);
        (_id)
        del_Area(_id);
    } 
    }else{
        alert("you must select area first");
    }  
}

function delSkill() {

    let selectedSkill= $("#skillTable .selected");
   
    if (selectedSkill.length>0){
        
        var result = confirm("sure you want to delete "+ selectedSkill[0].innerText+ "?");
    if (result) {
        let _id= parseInt($("#skillTable .selected")[0].id);
        (_id)
        del_Skill(_id);
    } 
    } else{
        alert("you must select area first");
    }  
}

function editArea(){

    let selectedArea= $("#areaTable .selected");
    (selectedArea)
   
    if (selectedArea.length>0){
        
        var result = prompt("edit " +selectedArea[0].innerText+" to","");
    if (result) {
        let _id= parseInt($("#areaTable .selected")[0].id);
        (_id)
        edit_Area(_id,result);
        
    } 
    }else{
        alert("you must select area first");
    }  

}
function editSkill(){

    let selectedSkill= $("#skillTable .selected");
    (selectedSkill)
   
    if (selectedSkill.length>0){
        
        var result = prompt("edit " +selectedSkill[0].innerText+" to","");
    if (result) {
        let _id= parseInt($("#skillTable .selected")[0].id);
        (_id)
        edit_skill(_id,result);
        
    } 
    }else{
        alert("you must select skill first");
    }  
}

const reDraw = () => {
$('#search-div , #buttons-div , #table-body ,#form-areas-select , #skills-ul, #table-bodyU').html('');
$('.tech-th').remove();
    techsService(); // Load Technologies
    stepsFormAreas() // Load Form Fields
}