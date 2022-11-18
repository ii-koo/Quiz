const url = window.location.href;
const quizBox = document.getElementById('quiz-box');

$.ajax({
    type:'GET',
    url: 'question',
    success: function(response){
        const data = response.data;
        data.forEach(dat =>{
            for(const[question, answers] of Object.entries(dat)){
                quizBox.innerHTML += '<hr>'+
                '<div class="mb-2">'+
                    '<b>'+question+'</b>'+
                '</div>'
                answers.forEach(answer=>{
                quizBox.innerHTML +='<div>'+
                '<input type="radio" class="q_ans mx-1 mb-1" id="'+question+'-'+answer+'" name="'+question+'" value="'+answer+'">'+
                '<label for="'+question+'">'+answer+'</label>'
                '</div>'
                });
            }
        });
    },
    error: function(error){
        console.log(error);
    }
});

const quizForm = document.getElementById('quiz-form');
const csrf = document.getElementsByName('csrfmiddlewaretoken');

const sendData=()=>{
    const data = {};
    const elements = [...document.getElementsByClassName('q_ans')];
    data['csrfmiddlewaretoken'] = csrf[0].value

    // Check if radiobutton is clicked
    elements.forEach(dat=>{
        if(dat.checked){
            data[dat.name] = dat.value;
        }else{
            if(!data[dat.name]){
                data[dat.name] = null;
            }
        }
    });

    $.ajax({
        type: 'POST',
        url: 'save/',
        data: data,
        success: function(response){
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    });
}

quizForm.addEventListener('submit', res=>{
    res.preventDefault();
    sendData();
});