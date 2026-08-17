from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import Expense
from .serializers import ExpenseSerializer


class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    filterset_fields = ['category']
    search_fields = ['description']
    ordering_fields = ['amount', 'created_at']

    def get_queryset(self):
        return Expense.objects.filter(owner=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
