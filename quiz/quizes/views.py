from django.shortcuts import render
from django.views.generic import ListView
from django.http import JsonResponse
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