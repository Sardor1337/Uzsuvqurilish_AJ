from rest_framework.views import APIView
from rest_framework.response import Response
from .Models import User, MCHJ, Type, Holat, Instrument
from .serializers import UserSerializer, MCHJSerializer, TypeSerializer, HolatSerializer, InstrumentSerializer

# Users API
class UserList(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

# MCHJ API
class MCHJList(APIView):
    def get(self, request):
        mchjs = MCHJ.objects.all()
        serializer = MCHJSerializer(mchjs, many=True)
        return Response(serializer.data)

# Types API
class TypeList(APIView):
    def get(self, request):
        types = Type.objects.all()
        serializer = TypeSerializer(types, many=True)
        return Response(serializer.data)

# Holat API
class HolatList(APIView):
    def get(self, request):
        holats = Holat.objects.all()
        serializer = HolatSerializer(holats, many=True)
        return Response(serializer.data)

# Instruments API
class InstrumentList(APIView):
    def get(self, request):
        instruments = Instrument.objects.all()
        serializer = InstrumentSerializer(instruments, many=True)
        return Response(serializer.data)
