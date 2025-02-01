from rest_framework import serializers
from .Models import User, MCHJ, Type, Holat, Instrument

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class MCHJSerializer(serializers.ModelSerializer):
    class Meta:
        model = MCHJ
        fields = '__all__'

class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'

class HolatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Holat
        fields = '__all__'

class InstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instrument
        fields = '__all__'
