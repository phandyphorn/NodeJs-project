// import function hide, show

import { hide, show } from "../Utils/hide_show.js";
// const url = "http://localhost:"
const main_container = document.querySelector(".home_page");
const add_container = document.querySelector(".container1");
const container2 = document.querySelector(".container2");
const container_3 = document.querySelector(".container3");
const heading_3 = document.querySelector(".heading-3");
const paragraph = document.querySelector(".paragraph");
const btn_add_play = document.querySelector(".btn_add_play");
const modal_header = document.querySelector(".modal-header");
const modal_title = document.querySelector(".modal-title");
const all_input_question = document.getElementsByClassName("input");
const all_input_radio = document.getElementsByName("input");
const score_of_question = document.querySelector("#score_input");
const start_quiz = document.getElementById("start")
const dom_quiz = document.getElementById("quiz");

const btn_register = document.querySelector("#register");
const btn_login = document.querySelector("#login");
const dom_question = document.getElementById("question")
let to_edit_questions = null;
let question = document.querySelector("#input_question");
let answers = document.querySelectorAll(".input");
let answers1 = document.getElementsByName("input");
let answers2 = document.getElementsByClassName("input");
let score_display = document.getElementById("score_p");
let dom_score = document.querySelector("#score_display");
let btn_logout = document.querySelector(".btn_nav_logout");

let scores = document.querySelector("#score_input");
let all_answers = [];
let current_question_index = 0;
let score = 0;
let btn_nav_play = document.querySelector(".btn_nav_play");
let view_list_question = document.querySelector(".view_list_question");
let show_good_bad_answers = document.querySelector(".show_good_answers");
let show_correct_answers = document.querySelector(".correct_answer")
let show_incorrect_answers = document.querySelector(".incorrect_answer");
let container_4 = document.querySelector(".container_4");
let main_container_4 = document.querySelector(".main_container_4");
let temp_correct_answers = [];

console.log(sessionStorage.user_id)
    // if (sessionStorage.getItem("user_id") == null) {
    //     // location.replace = 'http://localhost:1000/views/register.html'
    //     location.href = "http://localhost:1000/views/register.html";
    // }
    // function to add question
function add_question(e) {
    e.preventDefault(e);
    let score_input = scores.value
    let question_text = question.value;
    let body = { question: question_text, answers: all_answers, score: score_input };
    answers.forEach(answer => {
        let object_answers = {}
        object_answers.answer = answer.value;
        let radio = answer.previousElementSibling;
        if (radio.checked) {
            object_answers.correct_answer = true;
        }
        all_answers.push(object_answers);
    })


    if (question.value !== "" && all_answers !== "") {
        axios.post("/questions/create", body)
            .then((result) => {
                console.log(result)
                display_question()
            })
    } else if (question.value == "" || all_answers[i] == "") {
        alert("You must fill all fields! So please click on button create again!!")
    }

};
// function to show add question
function refresh_question(all_data) {
    while (container2.firstChild) {
        container2.removeChild(container2.lastChild);
    }
    for (let i = 0; i < all_data.length; i++) {
        let main_container = document.createElement('div');
        main_container.className = 'main_container1';
        let question_and_button = document.createElement('div');
        question_and_button.className = 'question_and_button';
        let question = document.createElement('div');
        question.className = 'question';
        question.textContent = all_data[i].question;
        let score_show = document.createElement('p');
        score_show.textContent = all_data[i].score + "pts";
        let answer = document.createElement('div');
        answer.className = 'answer_to_display';
        let answer_1 = document.createElement('div');
        answer_1.className = 'answer_1';

        answer_1.textContent = all_data[i].answers[0].answer;
        if (all_data[i].answers[0].correct_answer == true) {
            answer_1.style.background = "blue";
        } else {
            answer_1.style.background = "red";
        }
        let answer_2 = document.createElement('div');
        answer_2.className = 'answer_2';
        answer_2.textContent = all_data[i].answers[1].answer;
        if (all_data[i].answers[1].correct_answer == true) {
            answer_2.style.background = "blue";
        } else {
            answer_2.style.background = "red";
        }
        let answer_3 = document.createElement('div');
        answer_3.className = 'answer_3';
        answer_3.textContent = all_data[i].answers[2].answer;
        if (all_data[i].answers[2].correct_answer == true) {
            answer_3.style.background = "blue";
        } else {
            answer_3.style.background = "red";
        }
        let answer_4 = document.createElement('div');
        answer_4.className = 'answer_4';
        answer_4.textContent = all_data[i].answers[3].answer;
        if (all_data[i].answers[3].correct_answer == true) {
            answer_4.style.background = "blue";
        } else {
            answer_4.style.background = "red";
        }
        answer.append(answer_1);
        answer.append(answer_2);
        answer.append(answer_3);
        answer.append(answer_4);
        let div_button = document.createElement('div');
        div_button.className = 'button';
        let button1 = document.createElement('button');
        let button2 = document.createElement('button');

        let button_edit = document.createElement('div');
        button_edit.id = all_data[i]._id;
        button_edit.className = 'btn_edit';
        let img_edit = document.createElement('i');
        img_edit.className = 'fa fa-edit';
        img_edit.setAttribute("data-toggle", "modal");
        img_edit.setAttribute("data-target", "#myModal");
        img_edit.addEventListener("click", click_on_edit_question);

        img_edit.id = all_data[i]._id;
        button_edit.appendChild(img_edit);

        let button_delete = document.createElement('div');
        button_delete.id = all_data[i]._id
        button_delete.className = 'btn_delete';
        let img_delete = document.createElement('i');
        img_delete.className = "fa fa-trash-o ";
        button_delete.appendChild(img_delete);
        button1.appendChild(button_edit);
        button2.appendChild(button_delete);
        div_button.appendChild(button1);
        div_button.appendChild(button2);
        div_button.appendChild(score_show)
        question_and_button.appendChild(question);
        question_and_button.appendChild(div_button);
        main_container.appendChild(question_and_button);
        main_container.appendChild(answer);
        container2.append(main_container);
    }
    container2.parentElement.appendChild(container2)
};
// function to display the question
function display_question(e) {
    hide(heading_3);
    hide(paragraph);
    hide(btn_add_play);
    hide(main_container)
    axios.get("/questions/").then((result) => {

        refresh_question(result.data);
    })
    show(btn_nav_play);
    show(container2);
    hide(btn_nav_view)
}
// function view list the questions 
function view_list_of_questions(e) {
    axios.get("/questions/").then((all_data) => {

        for (let i = 0; i < all_data.data.length; i++) {
            let main_container = document.createElement('div');
            main_container.className = 'main_container1';
            let question_and_button = document.createElement('div');
            question_and_button.className = 'question_and_button';
            let question = document.createElement('div');
            question.className = 'question';
            question.textContent = all_data.data[i].question;
            let score_show = document.createElement('p');
            score_show.textContent = all_data.data[i].score + "pts";
            let answer = document.createElement('div');
            answer.className = 'answer_to_display';
            let answer_1 = document.createElement('div');
            answer_1.className = 'answer_1';
            answer_1.textContent = all_data.data[i].answers[0].answer;
            if (all_data.data[i].answers[0].correct_answer == true) {
                answer_1.style.background = "blue";
            } else {
                answer_1.style.background = "red";
            }
            let answer_2 = document.createElement('div');
            answer_2.className = 'answer_2';
            answer_2.textContent = all_data.data[i].answers[1].answer;
            if (all_data.data[i].answers[1].correct_answer == true) {
                answer_2.style.background = "blue";
            } else {
                answer_2.style.background = "red";
            }
            let answer_3 = document.createElement('div');
            answer_3.className = 'answer_3';
            answer_3.textContent = all_data.data[i].answers[2].answer;
            if (all_data.data[i].answers[2].correct_answer == true) {
                answer_3.style.background = "blue";
            } else {
                answer_3.style.background = "red";
            }
            let answer_4 = document.createElement('div');
            answer_4.className = 'answer_4';
            answer_4.textContent = all_data.data[i].answers[3].answer;
            if (all_data.data[i].answers[3].correct_answer == true) {
                answer_4.style.background = "blue";
            } else {
                answer_4.style.background = "red";
            }
            answer.append(answer_1);
            answer.append(answer_2);
            answer.append(answer_3);
            answer.append(answer_4);
            let div_button = document.createElement('div');
            div_button.className = 'button';

            div_button.appendChild(score_show)
            question_and_button.appendChild(question);
            question_and_button.appendChild(div_button);
            main_container.appendChild(question_and_button);
            main_container.appendChild(answer);
            view_list_question.append(main_container);
        }
    })

    hide(main_container);
    hide(container_3)
    hide(btn_nav_view)
    show(btn_nav_play)

};
// function to edit question
function click_on_edit_question(e) {
    modal_title.textContent = "Edit question";
    modal_header.style.background = "#00bfff";
    to_edit_questions = e.target.parentElement.id;
    if (to_edit_questions !== null) {
        axios.get("/questions/").then((result) => {
            let all_questions = result.data;
            for (let data_all_question of all_questions) {
                // to check if id of  button edit equal to id of question
                if (to_edit_questions == data_all_question._id) {
                    document.querySelector("#input_question").value = data_all_question.question
                    for (let k = 0; k < all_input_question.length; k++) {
                        all_input_question[k].value = data_all_question.answers[k].answer;
                    }
                    for (let t = 0; t < all_input_radio.length; t++) {
                        if (data_all_question.answers[t].correct_answer == true) {
                            all_input_radio[t].checked = true;
                        }
                    }

                    score_of_question.value = data_all_question.score;
                }
            }
        })
    }
};

function edit_question(e) {
    let body = { question: question.value, answers: all_answers, score: scores.value };
    e.preventDefault();
    // to check the form
    for (let k = 0; k < all_answers.length; k++) {
        all_answers[k].answer = answers2[k].value;
        if (answers1[k].checked) {
            all_answers[k].correct_answer = true;
        } else {
            all_answers[k].correct_answer = false;
        }
    }
    axios.put('/questions/update/' + to_edit_questions, body).then((result) =>
        display_question())
};

function is_submitted(e) {
    if (to_edit_questions == null) {
        add_question(e)
    } else {
        edit_question(e)
    }
};
// function to delete a question
function click_delete(e) {
    e.preventDefault();
    let id = e.target.parentElement.id;
    if (e.target.parentElement.className == "btn_delete") {
        let isExecuted = confirm("Are you sure to delete this task?");
        if (isExecuted) {
            axios.delete("/questions/delete/" + id).then(display_question())
        }
    }
}
// function play quiz
function play_quiz() {
    show(container_3);
    hide(main_container);
    hide(btn_nav_view);
    show(add_container);
    hide(container2);
    hide(btn_nav_play);
    hide(view_list_question);
};
//render question
function render_question() {

    axios.get("/questions/").then((result) => {

        let data_1 = result.data[current_question_index];
        while (dom_quiz.firstChild) {
            dom_quiz.removeChild(dom_quiz.lastChild)
        }

        if (current_question_index < result.data.length) {
            dom_question.textContent = data_1.question;
            dom_quiz.appendChild(dom_question)
            const choice = document.createElement("div");
            choice.id = "choices";
            for (let i = 0; i < data_1.answers.length; i++) {
                let button_answer = document.createElement('button');
                if (data_1.answers[i].correct_answer == true) {
                    button_answer.id = "true";
                } else {
                    button_answer.id = "false";
                }
                button_answer.textContent = data_1.answers[i].answer
                button_answer.addEventListener("click", return_the_value)
                choice.appendChild(button_answer)
                dom_quiz.appendChild(choice)
            }
            let dom_num_of_question = document.createElement("div");
            let num_of_questions_bar = current_question_index + 1 + "/" + result.data.length + "questions"
            dom_num_of_question.textContent = num_of_questions_bar;
            dom_quiz.appendChild(dom_num_of_question)
        } else {
            hide(dom_quiz)
        }
    })
};
// function_click_start
if (start_quiz) {
    start_quiz.addEventListener("click", (event) => {
        hide(start_quiz);
        show(dom_quiz);

        // 2- Reset the question index to 0
        current_question_index = 0;

        // 3 - Render the first question
        render_question();
    });
}
// return_the_value
function return_the_value(e) {
    check_all_answer(e.target.textContent)
};
// check_answer
function check_all_answer(answer) {
    axios.get("/questions/").then((result) => {
        let data = result.data[current_question_index].answers;
        let data_questions = result.data[current_question_index].question;
        let obj_temp_correct_answer = {};

        for (let k = 0; k < data.length; k++) {
            if (data[k].correct_answer == true) {
                if (data[k].answer == answer) {

                    obj_temp_correct_answer['correct_answer'] = (data[k].answer);
                    obj_temp_correct_answer['question'] = (data_questions);
                    score += result.data[current_question_index].score;
                } else {

                    obj_temp_correct_answer['incorrect_answer'] = (data[k].answer)
                    obj_temp_correct_answer['question'] = (data_questions);
                }
            }
        }
        if (obj_temp_correct_answer !== null) {
            temp_correct_answers.push(obj_temp_correct_answer);

        }
        if (current_question_index < result.data.length - 1) {
            current_question_index += 1;
            render_question();
        } else {
            view_score()
        }
    })
};
// function to show good and bad answers
function show_good_bad_answer() {

    hide(container_3)
    show(container_4)

    for (let all_of_answers of temp_correct_answers) {
        if (all_of_answers.correct_answer) {

            let dom_answer = document.createElement("p");
            let dom_question = document.createElement("li");
            dom_question.textContent = all_of_answers.question
            dom_answer.textContent = "Your answer is:   " + all_of_answers.correct_answer
            show_correct_answers.appendChild(dom_question);
            show_correct_answers.appendChild(dom_answer);
        } else if (all_of_answers.incorrect_answer) {
            let dom_question = document.createElement("li");
            dom_question.textContent = all_of_answers.question
            let dom_answer = document.createElement("p");
            dom_answer.textContent = "Your answer is:   " + all_of_answers.incorrect_answer;
            show_incorrect_answers.appendChild(dom_question);
            show_incorrect_answers.appendChild(dom_answer);
        }
        main_container_4.appendChild(show_correct_answers);
        main_container_4.appendChild(show_incorrect_answers);
        container_4.appendChild(main_container_4)
    }
};
// function view score
function view_score() {
    hide(dom_quiz);
    show(dom_score);
    axios.get("/questions/").then((result) => {
        score_display.textContent = "Your scores" + " : " + score + "pts";
    })


};

// login ==============================================================
function login(e) {
    e.preventDefault();
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");

    let email_value = email.value;
    let password_value = password.value;

    if (email_value != "" && password_value != "") {
        axios.post("/users/login")
            .then((result) => {

                let users = result.data;
                for (let i = 0; i < users.length; i++) {
                    var email_db = users[i].email;
                    var password_db = users[i].password;

                    sessionStorage.setItem("user_id", users[i]._id);
                    sessionStorage.setItem("user_email", users[i].email);
                    sessionStorage.setItem("user_password", users[i].password);
                    sessionStorage.setItem("user_username", users[i].username);

                    var email_db = sessionStorage.getItem("user_email");
                    var password_db = sessionStorage.getItem("user_password");

                    if ((email_db == email_value) && (password_db == password_value)) {
                        alert("Successful")
                        window.location.href = 'views/main.html';
                    }
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
};
if (btn_login) {
    btn_login.addEventListener("click", login);
};

// register============================================
function register(e) {
    e.preventDefault();
    let email = document.querySelector("#user_email");
    let password = document.querySelector("#user_password");
    let username = document.querySelector("#user_name");
    let email_value = email.value;
    let password_value = password.value;
    let username_value = username.value;



    var email_db = sessionStorage.getItem("user_email");
    var password_db = sessionStorage.getItem("user_password");
    console.log(email_value);
    console.log(password_value);
    console.log(username_value);

    if ((email_value != "" && password_value != "" && username_value != "")) {
        let user_register = {
            "username": username_value,
            "email": email_value,
            "password": password_value
        };
        axios.post("/users/create_user", user_register)
            .then((result) => {})
            .catch((error) => {

                console.log(error)
            })
        alert("Register successfully!")

        window.location.href = '../index.html';
    } else {
        alert("Please register again!")
    }
};

if (btn_register) {
    btn_register.addEventListener("click", register);
}

// Logout========================================================
function logout(e) {
    e.preventDefault();
    var id_user = sessionStorage.getItem("user_id");
    axios.delete("/users/delete/" + id_user)
}

if (btn_logout) {
    btn_logout.addEventListener("click", logout);
}
let btn_add_questions = document.querySelector("#add_questions");
if (btn_add_questions) {
    btn_add_questions.addEventListener("click", is_submitted);
}
let btn_play_quiz = document.querySelector("#play_quiz");
if (btn_play_quiz) {
    btn_play_quiz.addEventListener("click", play_quiz);
}
if (btn_nav_play) {
    btn_nav_play.addEventListener("click", play_quiz);
}
if (show_good_bad_answers) {
    show_good_bad_answers.addEventListener("click", show_good_bad_answer)
}
let btn_nav_view = document.querySelector(".btn_nav_view");
if (btn_nav_view) {
    btn_nav_view.addEventListener("click", view_list_of_questions)
}
if (btn_nav_play) {
    btn_nav_play.addEventListener("click", play_quiz)
}
if (container2) {
    container2.addEventListener("click", click_delete);
}
if (container2) {
    container2.addEventListener("click", click_delete);
}