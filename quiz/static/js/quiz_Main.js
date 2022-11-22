const url = window.location.href;
const quizBox = document.getElementById('quiz-box');
const timerBox = document.getElementById('timer-box');

function stopInterval(timer){
    countdown(0);
    clearInterval(timer);
}

const countdown = (time) =>{
        if(time.toString().length < 2){
            timerBox.innerHTML = `<b>0${time}:00<b>`
        }else{
            timerBox.innerHTML = `<b>${time}:00<b>`
        }

        let min = time - 1;
        let sec = 60;
        let displaySec;
        let displayMin;

        const timer = setInterval(()=>{
            sec --
            if(sec < 0){
                sec = 59;
                min --
            }
            if(min.toString().length < 2){
                displayMin = '0'+min;
            }else{
                displayMin = min;
            }

            if(sec.toString().length < 2){
                displaySec = '0'+sec;
            }else{
                displaySec = sec;
            }

            if(min==0 && sec==0){
                timerBox.innerHTML = "<b>00:00</b>";
                setTimeout(()=>{
                    clearInterval(timer);
                    alert('Time Over');
                    sendData();
                }, 500);
            }
            timerBox.innerHTML = `<b>${displayMin}:${displaySec}</b>`
        }, 1000);
        document.getElementById('btn-submit').addEventListener('click', ()=>stopInterval(timer));
};

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
        countdown(response.time);
        });
    },
    error: function(error){
        console.log(error);
    },
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
            const scoreBox = document.getElementById('score-box');
            const resultBox = document.getElementById('result-box');
            const results = response.results;

            quizForm.classList.add('not-visible');
            scoreBox.innerHTML = ` ${response.passed ? 'Congratulations! ': 'Sorry: '}Your result is ${response.score.toFixed(2)}`

            results.forEach(res=>{
                const resDiv = document.createElement("div");
                for (const [question, resp] of Object.entries(res)){

                    resDiv.innerHTML += question;
                    const cls = ['container', 'p-3', 'text-light', 'h6'];
                    resDiv.classList.add(...cls);

                    if (resp=='not answered') {
                        resDiv.innerHTML += '- not answered'
                        resDiv.classList.add('bg-danger');
                    }
                    else {
                        const answer = resp['answered'];
                        const correct = resp['correct_answer'];

                        if (answer == correct) {
                            resDiv.classList.add('bg-success');
                            resDiv.innerHTML += 'answered: ' +answer;
                        } else {
                            resDiv.classList.add('bg-danger')
                            resDiv.innerHTML += '| correct answer: '+correct;
                            resDiv.innerHTML += '| answered: '+ answer;
                        }
                    }
                }
                resultBox.append(resDiv);
            });

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