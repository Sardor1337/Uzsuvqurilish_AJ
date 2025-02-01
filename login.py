import psycopg2
import bcrypt

# Ma'lumotlar bazasiga ulanish
conn = psycopg2.connect(
    dbname='postgres',
    user='postgres',
    password='1234',
    host='localhost',
    port='5432'
)
cursor = conn.cursor()

# Foydalanuvchi login funksiyasi
def login(username, password):
    # Foydalanuvchini topish
    cursor.execute("SELECT id, password, userrole FROM Users WHERE name = %s", (username,))
    user = cursor.fetchone()

    if user:
        user_id, hashed_password, role = user

        # Parolni tekshirish
        if bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
            print(f"Kirish muvaffaqiyatli! Xush kelibsiz, {username}. Rol: {role}")
            return {"id": user_id, "name": username, "userrole": role}
        else:
            print("Xato parol. Qayta urinib ko'ring.")
    else:
        print("Bunday foydalanuvchi topilmadi.")

    return None





# Misol uchun test
username = input("Foydalanuvchi nomi: ")
password = input("Parol: ")
login(username, password)
