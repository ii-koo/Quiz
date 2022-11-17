from django.shortcuts import render
from django.views.generic import ListView
from .models import Quiz


# Create your views here.


class QuizesView(ListView):
    model = Quiz
    template_name = 'index.html'
    context_object_name = 'quiz'
