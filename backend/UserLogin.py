class UserLogin():
    def fromDB(self, user_id, db):
        self.__user = db.getUser(user_id)
        return self
 
    def create(self, user):
        self.__user = user
        return self
    def is_authenticated(self):
        return True
    def is_active(self):
        return True
    def is_anonymous(self):
        return False
    def get_id(self):
        return str(self.__user[0])
    def get_name(self):
        return str(self.__user[1])
    def get_surname(self):
        return str(self.__user[2])
    def get_patronymic(self):
        return str(self.__user[3])
    def get_role(self):
        return str(self.__user[7])
