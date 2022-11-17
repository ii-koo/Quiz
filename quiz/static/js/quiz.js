const btn_modals = [...document.getElementsByClassName('modal-button')]
const body_modal = document.getElementById('modal-body-confirm');

btn_modals.forEach(btn_modal=> btn_modal.addEventListener('click',()=>{
    const pk = btn_modal.getAttribute('data-pk');
    const name = btn_modal.getAttribute('data-quiz');
    const numQuestions = btn_modal.getAttribute('data-questions');
    const difficulty = btn_modal.getAttribute('data-difficulty');
    const scoreToPass = btn_modal.getAttribute('data-pass');
    const time = btn_modal.getAttribute('data-time');

    body_modal.innerHTML =
    '<div class="h5 mb-3">Start the quiz "<b>'+name+
    '</b>"</div><div class="text-muted"><ul><li>Difficulty: <b>'+difficulty+
    '</b></li><li>Number of questions: <b>'+numQuestions+
    '</b></li><li>Score to pass: <b>'+scoreToPass+
    ' or above</b></li><li>Time: <b>'+time+' min</b></li></ul></div>'
}));