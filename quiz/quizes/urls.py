from django.urls import path
from .views import (QuizesView, quizView, quizDataView)

urlpatterns = [
    path('', QuizesView.as_view(), name='index'),
    path('<int:pk>/', quizView, name='quiz-main'),
    path('<int:pk>/question/', quizDataView, name='quiz-data'),
]