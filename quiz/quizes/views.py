from django.shortcuts import render
from django.views.generic import ListView
from django.http import JsonResponse
from questions.models import Question, Answer
from results.models import Result
from .models import Quiz


class QuizesView(ListView):
    model = Quiz
    template_name = 'quizList.html'
    context_object_name = 'quiz'


def quizView(request, pk):
    quiz = Quiz.objects.get(pk=pk)

    context = {
        'obj': quiz
    }
    return render(request, 'quiz.html', context)


def quizDataView(request, pk):
    quiz = Quiz.objects.get(pk=pk)
    questions = []

    for q in quiz.get_questions():
        answers = []
        for a in q.get_answers():
            answers.append(a.text)
        questions.append({str(q):answers})
    return JsonResponse({
        'data': questions,
        'time': quiz.time,
    })


def quizSaveView(request, pk):
    # print(request.POST)
    if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        data = request.POST
        data_ = dict(data.lists())
        data_.pop('csrfmiddlewaretoken')
        print("pop: ", data_)
        questions = []
        for res in data_.keys():
            print('key:', res)
            question = Question.objects.get(text=res)
            questions.append(question)

        user = request.user
        quiz = Quiz.objects.get(pk=pk)

        score = 0
        multiplier = 100/quiz.numbers_of_questions
        results = []
        correct_answer = None

        for q in questions:
           ans_selected = request.POST.get(q.text)
           # count correct answered
           if ans_selected != "":
               q_answers = Answer.objects.filter(question=q)
               for q_a in q_answers:
                   if ans_selected == q_a.text:
                       if q_a.correct:
                           score +=1
                           correct_answer = q_a.text
                       else:
                           if q_a.correct:
                               correct_answer = q_a.text
               results.append({str(q): {'correct_answer': correct_answer, 'Answered': ans_selected}})
           else:
               results.append({str(q): {'Not Answered'}})

        total_score = int(score * multiplier)
        Result.objects.create(quiz=quiz, user=user, score=total_score)

        if total_score >= quiz.required_score_to_pass:
            return JsonResponse({'passed': True, 'Total score': total_score, 'results': results})
        else:
            return JsonResponse({'passed': False, 'Total score': total_score, 'results': results})

    return JsonResponse({'text':'works'})