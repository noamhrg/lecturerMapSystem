function loginService(_email, _pass) {
  $.ajax({
    url: `${API.baseUrl}${API.loginUrl}`,
    method: "POST",
    data: { email: _email, password: _pass },
    success: function(response) {
      let current = `${response.first_name} ${response.last_name}`;
      localStorage.setItem("current_user", current);
      transfer("main");
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function isLoggedInService() {
  $.ajax({
    method: "GET",
    url: `${API.baseUrl}${API.restrict}`,
    success: function(response) {
      if (window.location.href != `${API.baseUrl}${API.main}`) {
        transfer("main");
      } else {
        console.log(response);
      }
    },
    error: function(error) {
      if (
        window.location.href == `${API.baseUrl}` ||
        window.location.href == `${API.baseUrl}${API.htmlIndex}`
      ) {
        return;
      } else {
        transfer("login");
      }
    }
  });
}

function checkPermService() {
  $.ajax({
    url: `${API.baseUrl}${API.permissions}`,
    method: "GET",
    success: function(response) {
      userControllButon();
      areaSkillsControllButon();
    },
    error: function(error) {
      console.log("error with checkPermService");
    }
  });
}

function logOutService() {
  $.ajax({
    method: "GET",
    url: `${API.baseUrl}${API.logout}`,
    success: function(response) {
      localStorage.removeItem("current_user");
      transfer("login");
    },
    error: function(error) {
      transfer("login");
    }
  });
}

function techsService() {
  $.ajax({
    method: "GET",
    url: `${API.baseUrl}${API.phpIndex}${API.homeController}${
      Actions.getTechs
    }`,
    success: function(response) {
      drawTechs(response);
      lecturerService();
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function lecturerService() {
  $.ajax({
    method: "GET",
    url: `${API.baseUrl}${API.phpIndex}${API.homeController}${
      Actions.getLecturers
    }`,
    success: function(response) {
      drawLecturers(response);
      areasService();
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function areasService() {
  $.ajax({
    method: "GET",
    url: `${API.baseUrl}${API.phpIndex}${API.homeController}${
      Actions.getAreas
    }`,
    success: function(response) {
      drawAreas(response);
      techGradesNCommentsService();
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function techGradesNCommentsService() {
  $.ajax({
    method: "GET",
    url: `${API.baseUrl}${API.phpIndex}${API.homeController}${
      Actions.getGrades
    }`,
    success: function(response) {
      fillGradesNComments(response);
      createEditDelBtns();
      columnFilter();
      selectRow();
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function stepsFormAreas() {
  $.ajax({
    url: `${API.baseUrl}${API.phpIndex}${API.lecturerController}${
      Actions.getFormAreas
    }`,
    method: "GET",
    success: function(response) {
      drawAreasInForm(response);
    },
    error: function(error) {
      console.log("Error stepsFormAreas");
    }
  });
}

function lectFormSubmitService() {
  let skillsSelected = $("#skills-ul select:enabled");
  let skillsGradesArray = [];
  var submitAction = Actions.formSubmitAction;
  var successMsg = DOM.successMsg;

  $.each(skillsSelected, function(index, item) {
    let skillObj = {};
    skillObj.skillId = item.id;
    skillObj.skillName = item.name;
    skillObj.skillGrade = item.value;
    skillsGradesArray.push(skillObj);
  });

  if (formFields.editMode) {
    submitAction = Actions.lecturerEditAction;
    successMsg = DOM.editMsg;
  }
  $.ajax({
    url: `${API.baseUrl}${API.phpIndex}${
      API.lecturerController
    }&action=${submitAction}`,
    method: "POST",
    data: {
      lecturerId: $(".lecturer-first-name.selected").attr("id"),
      firstName: formFields.firstNameField.val(),
      lastName: formFields.lastNameField.val(),
      age: formFields.ageField.val(),
      email: formFields.emailField.val(),
      areas: formFields.areasMultiSelect.val(),
      skills: skillsGradesArray
    },
    success: function(response) {
      sessionStorage.setItem("successMsg", successMsg);
      formFields.editMode = false;
      location.reload();
    },
    error: function(error) {
      console.log("error");
      console.log(error);
    }
  });
}

function lecturerDeleteDB(_id, _userRow) {
  // sending the id of the lecturer to delete it

  $.ajax({
    url: `${API.baseUrl}${API.phpIndex}${API.homeController}${Actions.delLect}`,
    method: "POST",
    data: { id: _id },
    success: function(response) {
      _userRow.fadeOut();
    },
    error: function(error) {
      console.log("error :");
      console.log(error);
    }
  });
}

function userService() {
  $.ajax({
    method: "GET",
    url: `${API.baseUrl}${API.phpIndex}${API.usersController}${
      Actions.getUsers
    }`,
    success: function(response) {
      drawUsers(response);
      selectUserRow();
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function addUserService(_fname, _lname, _email, _pass, _role) {
  // adding usrer
  var successMsg = DOM.userSuccessMsg;

  $.ajax({
    url: `${API.baseUrl}${API.phpIndex}${API.usersController}${
      Actions.addUser
    }`,
    method: "POST",
    data: {
      UFname: _fname,
      ULname: _lname,
      Uemail: _email,
      Upassword: _pass,
      Urole: _role
    },
    success: function(response) {
      sessionStorage.setItem("successMsg", successMsg);
      $("#addUserModal").modal("toggle");
      $("#userTable td").remove();
      userService();
      showSuccessMsg();
    },
    error: function(error) {
      console.log("error with adding user");
      console.log(error);
    }
  });
}

function userDeleteDB() {
  // delete user ### not sure why allways go to error
  var successMsg = DOM.userDelMsg;

  let selected = $("#userTable .selected");
  if (selected.length > 0) {
    var result = confirm("sure you want to delete this user?");
    if (result) {
      let _id = parseInt($("#userTable .selected")[0].id);
      $.ajax({
        url: `${API.baseUrl}${API.phpIndex}${API.usersController}${
          Actions.delUser
        }`,
        method: "POST",
        data: { Uid: _id },
        success: function(response) {
          $("#userTable td").remove();
          sessionStorage.setItem("successMsg", successMsg);
          userService();
          showSuccessMsg();
        },
        error: function(error) {
          console.log("error with userDeleteDB");
          console.log(error);
        }
      });
    }
  } else {
    alert("you must select user first");
  }
}
function editUserDB(_id, _fname, _Lname, _Email, _Pass, _Role) {
  // edit usrer
  var successMsg = DOM.userEditMsg;
  $.ajax({
    url: `${API.baseUrl}${API.phpIndex}${API.usersController}${
      Actions.editUser
    }`,
    method: "POST",
    data: {
      Uid: _id,
      UFname: _fname,
      ULname: _Lname,
      Uemail: _Email,
      Upassword: _Pass,
      Urole: _Role
    },
    success: function(response) {
      $("#editUserModal").modal("toggle");
      $("#userTable td").remove();
      sessionStorage.setItem("successMsg", successMsg);
      userService();
      showSuccessMsg();
    },
    error: function(error) {
      console.log("error with editUserDB");
      console.log(error);
    }
  });
}

function getLecturerEditService(_id) {
  $.ajax({
    method: "GET",
    url: `${API.baseUrl}${API.phpIndex}${API.lecturerController}${
      Actions.getLecturerDetails
    }&lectId=${_id}`,
    success: function(response) {
      formFields.editMode = true;
      fillForm(response);
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function areaAndSkillService() {
  $.ajax({
    method: "GET",
    url: `${API.baseUrl}${API.phpIndex}${API.areaAndSkillController}${
      Actions.getAreasAndSkills
    }`,
    success: function(response) {
      drawAreasAndSkill(response);
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function addAreaDB(_area) {
  let successMsg = "Area Added";
  $.ajax({
    method: "POST",
    url: `${API.baseUrl}${API.phpIndex}${API.areaAndSkillController}${
      Actions.addArea
    }`,
    data: { Area: _area },
    success: function(response) {
      sessionStorage.setItem("successMsg", successMsg);
      areaAndSkillService();
      showSuccessMsg();
      reDraw();
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function addSkillDB(_skill) {
  let successMsg = "Skill Added";
  $.ajax({
    method: "POST",
    url: `${API.baseUrl}${API.phpIndex}${API.areaAndSkillController}${
      Actions.addSkill
    }`,
    data: { Skill: _skill },
    success: function(response) {
      sessionStorage.setItem("successMsg", successMsg);
      areaAndSkillService();
      showSuccessMsg();
      reDraw();
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function del_Skill(_id) {
  let successMsg = "Skill Deleted";
  $.ajax({
    method: "POST",
    url: `${API.baseUrl}${API.phpIndex}${API.areaAndSkillController}${
      Actions.delSkill
    }`,
    data: { skillId: _id },
    success: function(response) {
      sessionStorage.setItem("successMsg", successMsg);
      areaAndSkillService();
      showSuccessMsg();
      reDraw();
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function del_Area(_id) {
  let successMsg = "Area Deleted";

  $.ajax({
    method: "POST",
    url: `${API.baseUrl}${API.phpIndex}${API.areaAndSkillController}${
      Actions.delArea
    }`,
    data: { areaId: _id },
    success: function(response) {
      sessionStorage.setItem("successMsg", successMsg);
      areaAndSkillService();
      showSuccessMsg();
      reDraw();
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function edit_Area(_id, _editedArea) {
  let successMsg = "Area Edited";

  $.ajax({
    method: "POST",
    url: `${API.baseUrl}${API.phpIndex}${API.areaAndSkillController}${
      Actions.editArea
    }`,
    data: { editareaId: _id, editedArea: _editedArea },
    success: function(response) {
      sessionStorage.setItem("successMsg", successMsg);
      areaAndSkillService();
      showSuccessMsg();
      reDraw();
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function edit_skill(_id, _editedSkill) {
  let successMsg = "Skill Edited";

  $.ajax({
    method: "POST",
    url: `${API.baseUrl}${API.phpIndex}${API.areaAndSkillController}${
      Actions.editSkill
    }`,
    data: { editedSkillId: _id, editedSkill: _editedSkill },
    success: function(response) {
      sessionStorage.setItem("successMsg", successMsg);
      areaAndSkillService();
      showSuccessMsg();
      reDraw();
    },
    error: function(error) {
      console.log(error);
    }
  });
}
