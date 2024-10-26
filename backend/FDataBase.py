import mysql.connector

class FDataBase:
    def __init__(self, db):
        self.db = db
        self.__cur = db.cursor()

    def getMenu(self):
        sql = "SELECT * FROM mainmenu"
        try:
            self.__cur.execute(sql)
            res = self.__cur.fetchall()
            if res: return res
        except:
            print("Ошибка чтения из Базы Данных")
        return []
    
    def addUser(self, name, surname, patronymic, progress, login, password, role, avatar=None, achivmnet_avatar=None):
        try:
            self.__cur.execute("SELECT COUNT(*) FROM users WHERE login=%s", (login,))
            res_login = self.__cur.fetchone()
            if res_login[0] > 0:
                print("Пользователь с таким login уже зарегистрирован")
                return False


            self.__cur.execute(
                """
                INSERT INTO users (id, name, surname, patronymic, progress, login, password, role, avatar, achivmnet_avatar)
                VALUES (NULL, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """,
                (name, surname, patronymic, progress, login, password, role, avatar, achivmnet_avatar)
            )


            self.db.commit()
        except mysql.connector.Error as e:
            print("Ошибка при добавлении пользователя:" + str(e))
            return False

        return True

    def getUser(self, user_id):
        try:
            self.__cur.execute("SELECT * FROM users WHERE id = %s LIMIT 1", (user_id,))
            res = self.__cur.fetchone()
            if not res:
                print("Пользователь не найден")
                return None

            return res
        except mysql.connector.Error as e:
            print("Ошибка получения данных из БД: " + str(e))

        return False

    def getUserByLogin(self, login):
        try:
            self.__cur.execute("SELECT * FROM users WHERE login = %s LIMIT 1", (login,))
            res = self.__cur.fetchone()
            if not res:
                print("Пользователь не найден")
                return False

            return res
        except mysql.connector.Error as e:
            print("Ошибка получения данных из БД: " + str(e))

        return False    
    
    def update_avatar(self, user_id, avatar_data):
        try:
            sql = "UPDATE users SET avatar=%s WHERE id=%s"
            self.__cur.execute(sql, (avatar_data, user_id))
            self.db.commit()
        except mysql.connector.Error as e:
            print(f"Ошибка при обновлении аватара: {e}")

    def get_avatar(self, user_id):
        try:
            sql = "SELECT avatar FROM users WHERE id=%s"
            self.__cur.execute(sql, (user_id,))
            result = self.__cur.fetchone()
            return result[0] if result else None
        except mysql.connector.Error as e:
            print(f"Ошибка при получении аватара: {e}")
            return None
        
    def getAllUsers(self):
        """Получает всех пользователей из базы данных."""
        try:
            self.__cur.execute("SELECT * FROM users")
            users = self.__cur.fetchall()
            return users
        except mysql.connector.Error as e:
            print("Ошибка при получении пользователей:" + str(e))
        return []
    
    def update_user(self, user_id, name, surname, patronymic, login, role, progress):
        query = '''UPDATE users 
                SET name=%s, surname=%s, patronymic=%s, login=%s, role=%s, progress=%s 
                WHERE id=%s'''
        try:
            self.__cur.execute(query, (name, surname, patronymic, login, role, progress, user_id))
            self.db.commit()
            return True
        except mysql.connector.Error as e:
            print(f"Ошибка при обновлении данных пользователя: {e}")
            return False
        
    def delete_user(self, user_id):
        query = '''DELETE FROM users WHERE id=%s'''
        try:
            self.__cur.execute(query, (user_id,))
            self.db.commit()
            return True
        except mysql.connector.Error as e:
            print(f"Ошибка при удалении пользователя: {e}")
            return False

    def get_assigned_courses(self, user_id):
        query = """
            SELECT c.id, c.name, c.theme, c.points
            FROM courses c
            JOIN user_opencourse uo ON uo.course_id = c.id
            WHERE uo.user_id = %s
        """
        self.__cur.execute(query, (user_id,))
        results = self.__cur.fetchall()
        # Преобразуем кортежи в словари
        courses = [{"id": row[0], "name": row[1], "theme": row[2], "points": row[3]} for row in results]
        return courses


    def get_completed_courses(self, user_id):
        query = """
            SELECT c.name, c.theme, c.points
            FROM courses c
            JOIN users_courses uc ON uc.course_id = c.id
            WHERE uc.user_id = %s
        """
        self.__cur.execute(query, (user_id,))
        return self.__cur.fetchall()
    
    def assign_course_to_user(self, user_id, course_id):
        query = """
            INSERT INTO user_opencourse (user_id, course_id) 
            VALUES (%s, %s)
        """
        self.__cur.execute(query, (user_id, course_id))
        self.db.commit()

    def get_available_courses(self, user_id):
        query = """
            SELECT c.id, c.name, c.theme
            FROM courses c
            LEFT JOIN user_opencourse uo ON uo.course_id = c.id AND uo.user_id = %s
            WHERE uo.course_id IS NULL
        """
        self.__cur.execute(query, (user_id,))
        return self.__cur.fetchall()
    
    def get_user_courses(self, user_id):
        query = """
            SELECT c.id, c.name
            FROM courses c
            JOIN user_opencourse uo ON uo.course_id = c.id
            WHERE uo.user_id = %s
        """
        self.__cur.execute(query, (user_id,))
        return self.__cur.fetchall()
    
    def get_course_details(self, course_id):
        query = """
            SELECT *
            FROM courses
            WHERE id = %s
        """
        self.__cur.execute(query, (course_id,))
        return self.__cur.fetchone()

    def get_all_courses(self):
      self.__cur.execute("""
            SELECT *
            FROM courses
        """)

      return self.__cur.fetchall()
    
    def addCourses (self, name_course, theme_course, points_course):
        try:
            self.__cur.execute(
                '''
                INSERT INTO courses (id, name, theme, points)
                VALUES (NULL, %s, %s, %s)
                ''',
                (name_course, theme_course, points_course)
            )
            self.db.commit()
        except mysql.connector.Error as e:
            print("Ошибка при добавлении пользователя: " + str(e))
            return False
        return True
        