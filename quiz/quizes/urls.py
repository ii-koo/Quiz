from django.urls import path
from .views import (QuizesView, quizView, quizDataView, quizSaveView)

urlpatterns = [
    path('', QuizesView.as_view(), name='index'),
    path('<int:pk>/', quizView, name='quiz-main'),
    path('<int:pk>/question/', quizDataView, name='quiz-data'),
    path('<int:pk>/save/', quizSaveView, name='quiz-save'),
]