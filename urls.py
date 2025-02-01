from django.urls import path
from .Views import UserList, MCHJList, TypeList, HolatList, InstrumentList

urlpatterns = [
    path('api/users/', UserList.as_view(), name='user-list'),
    path('api/mchj/', MCHJList.as_view(), name='mchj-list'),
    path('api/types/', TypeList.as_view(), name='type-list'),
    path('api/holat/', HolatList.as_view(), name='holat-list'),
    path('api/instruments/', InstrumentList.as_view(), name='instrument-list'),
]
