import psycopg2

conn = psycopg2.connect(
    dbname='postgres',
    user='postgres',
    password='1234',
    host='localhost',
    port='5432'
)
conn.autocommit = True
cursor = conn.cursor()

'''
queries = [
    """
    CREATE TABLE Users (
        Id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        Userrole VARCHAR(100) NOT NULL
    );
    """,
    """
    CREATE TABLE MCHJ (
        Id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );
    """,
    """
    CREATE TABLE Types (
        Id SERIAL PRIMARY KEY,
        typeName VARCHAR(255) NOT NULL
    );
    """,
    """
    CREATE TABLE Holat (
        Id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );
    """,
    """
    CREATE TABLE Instruments (
        Id SERIAL PRIMARY KEY,
        Types_Id INT NOT NULL,
        "Texnika turi" VARCHAR(255) NOT NULL,
        Rusumi VARCHAR(255) NOT NULL,
        "Zavod raqami" VARCHAR(255) NOT NULL,
        "Davlat raqami" VARCHAR(255) NOT NULL,
        Sana DATE NOT NULL,
        Soni INT NOT NULL,
        "Texnik holati_id" INT NOT NULL,
        MCHJ_Id INT NOT NULL,
        FOREIGN KEY (Types_Id) REFERENCES Types(Id),
        FOREIGN KEY ("Texnik holati_id") REFERENCES Holat(Id),
        FOREIGN KEY (MCHJ_Id) REFERENCES MCHJ(Id)
    );
    """
]



# Har bir SQL so'rovini bajarish
for query in queries:
    cursor.execute(query)


print("Jadvallar yaratildi!")
'''


'''
cursor.execute("""
        INSERT INTO Users (name, Userrole) VALUES
        ('Ali Valiyev', 'Admin'),
        ('Madina Karimova', 'Operator'),
        ('Hasanov Javohir', 'User')
    """)

# MCHJ jadvali uchun ma'lumotlar
cursor.execute("""
        INSERT INTO MCHJ (name) VALUES
        ('MCHJ Toshkent Trans'),
        ('MCHJ Samarkand Logistika'),
        ('MCHJ Buxoro Avto')
    """)

# Types jadvali uchun ma'lumotlar
cursor.execute("""
        INSERT INTO Types (typeName) VALUES
        ('Yuk mashinasi'),
        ('Avtobus'),
        ('Traktor')
    """)

# Holat jadvali uchun ma'lumotlar
cursor.execute("""
        INSERT INTO Holat (name) VALUES
        ('Yangi'),
        ('Ishlatilgan'),
        ('Ta’mir talab')
    """)



# Instruments jadvali uchun ma'lumotlar
cursor.execute("""
        INSERT INTO Instruments (Types_Id, texnika_turi, Rusumi, zavod_raqami, davlat_raqami, Sana, Soni, texnik_holati_id, MCHJ_Id) VALUES
        (1, 'Volvo FH16', '2023', '12345', '01A123AA', '2024-01-15', 3, 1, 1),
        (2, 'Mercedes Sprinter', '2018', '67890', '02B456BB', '2020-05-20', 2, 2, 2),
        (3, 'Belarus 82.1', '2015', '54321', '03C789CC', '2019-09-10', 5, 3, 3)
    """)

# O'zgarishlarni saqlash
conn.commit()
print("Ma'lumotlar muvaffaqiyatli qo'shildi!")
'''


cursor.close()
conn.close()
