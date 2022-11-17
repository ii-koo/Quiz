from django.urls import path
from quizes.views import QuizesView

urlpatterns = [
    path('', QuizesView.as_view(), name='index')
]