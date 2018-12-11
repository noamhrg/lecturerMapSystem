// DOM configurations will be here
let API = function() {
    return {
        baseUrl: "http://localhost:8080/lecturerMap/",
        loginUrl: "server/login/login.php",
        logout: "server/login/logout.php",
        restrict: "server/restrictions/restrict.php",
        permissions: "server/restrictions/permissions.php",
        main: "client/main.html",
        phpIndex: "server/index.php?",
        htmlIndex: "index.html",
        lecturerController: "controller=lecturerForm",
        homeController: "controller=home",
        usersController: "controller=user",
        areaAndSkillController: "controller=areaAndSkill"
    }
}();

let Actions = function() {
    return {
        formSubmitAction: "lectFormSubmit",
        lecturerEditAction: "lectEditSubmit",
        getFormAreas: "&action=getFormAreas",
        getTechs: "&action=getTech",
        getLecturers: "&action=getLecturers",
        getAreas: "&action=getAreas",
        getGrades: "&action=techGrades",
        delLect: "&action=deleteLecturer",
        getUsers: "&action=getUsers",
        addUser: "&action=addUser",
        delUser: "&action=deleteUser",
        editUser: "&action=editUser",
        getLecturerDetails: "&action=getLecturerDetails",
        getAreasAndSkills: "&action=getareaAndSkill",
        addArea: "&action=addArea",
        addSkill: "&action=addSkill",
        delSkill: "&action=delSkill",
        delArea: "&action=delArea",
        editArea: "&action=editArea",
        editSkill: "&action=editSkill"

    }
}();

var DOM = function() {
    return {
        username: $("#user-email"),
        password: $("#password"),
        form: $(".form-group"),
        tech_row: $("#thead-row")[0],
        tbl_body: $("#table-body")[0],
        tech_rowU: $("#thead-rowU")[0], // for user table 
        tbl_bodyU: $("#table-bodyU")[0],// for users table 
        successMsg: "Lecturer Added",
        editMsg: "Lecturer Edited",
        userSuccessMsg: "User Added",
        userEditMsg: "User Edited",
        userDelMsg: "User Deleted",
        loggedInUser: "",
        navBar: $("#navBar")[0],
        areaTable: $("#table-bodyArea")[0], // AAS= AREA AND SKILL
        skillTable: $("#table-bodySkill")[0], // AAS= AREA AND SKILL

    }
}();

var formFields = function() {
    return {
        firstNameField: $("#lect-form-first"),
        lastNameField: $("#lect-form-last"),
        ageField: $("#lect-form-age"),
        emailField: $("#lect-form-email"),
        areasMultiSelect: $("#form-areas-select"),
        editMode: false
    }
}();
var userModal = function() {
    return {
        addName: $("#arecipient-Fname")[0],
        addLname: $("#arecipient-Lname")[0],
        addEmail: $("#arecipient-Email")[0],
        addPass: $("#arecipient-Pass")[0],
        addrole: $("#arole-Select")[0],
        editName: $("#erecipient-Fname")[0],
        editLname: $("#erecipient-Lname")[0],
        editEmail: $("#erecipient-Email")[0],
        editPass: $("#erecipient-Pass")[0],
        editrole: $("#erole-Select")[0],
    }
}();
var areaAndskillFields = function() {
    return {
        aasArr:[],
    }
}();

$(function() {  // JQUERY Document Ready Configs
    $('#main-nav').fadeIn(700).css("display", "flex");
    $('table').fadeIn(700);

    $('.nav-link, .close, .navbar-brand').click(function(){
        changeContent($(this).attr('data-selector'));
    });

    $("#lect-form-submit").click(function() {
        $('input,select,textarea', 'fieldset:hidden').attr('disabled', 'disabled');
        if($(".form-checkbox:checked").length == 0) {
            $("#skills-ul" , "fieldset:visible").addClass('error shake animated ');
            setTimeout(() => {;
                $("#skills-ul" , "fieldset:visible").removeClass('error shake animated');
            },1000)
            return false
        }
        else {
            lectFormSubmit();
        }
    })

    $("#lect-table-id td").hover(function() {
        $(this).parent().children().css("color", "#e74c3c");
    }, function() {
        $(this).parent().children().css("color", "rgb(0,0,0)");
    })

    $("#add-lect-btn").click(function() {
        formFields.editMode = false;
        cleanForm();
    })

})