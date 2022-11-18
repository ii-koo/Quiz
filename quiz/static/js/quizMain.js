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
                '<input type="radio" class="mx-1 mb-1" id="'+question+'-'+answer+'" name="'+question+'" value="'+answer+'">'+
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