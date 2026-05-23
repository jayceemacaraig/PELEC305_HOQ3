from django.urls import path
from . import views


urlpatterns = [
    path('tasks/', views.TaskListCreateView.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', views.TaskUpdateDeleteView.as_view(), name='task-update-delete'),
]