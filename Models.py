from django.db import models

class User(models.Model):
    name = models.CharField(max_length=255)
    userrole = models.CharField(max_length=100)
    password = models.CharField(max_length=100)


    def __str__(self):
        return self.name

class MCHJ(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Type(models.Model):
    type_name = models.CharField(max_length=255)

    def __str__(self):
        return self.type_name

class Holat(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Instrument(models.Model):
    type = models.ForeignKey(Type, on_delete=models.CASCADE)
    texnika_turi = models.CharField(max_length=255)
    rusumi = models.CharField(max_length=255)
    zavod_raqami = models.CharField(max_length=255)
    davlat_raqami = models.CharField(max_length=255)
    sana = models.DateField()
    soni = models.IntegerField()
    texnik_holati = models.ForeignKey(Holat, on_delete=models.CASCADE)
    mchj = models.ForeignKey(MCHJ, on_delete=models.CASCADE)

    def __str__(self):
        return self.texnika_turi
