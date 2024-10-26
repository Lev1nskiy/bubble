import mysql.connector
from collections import namedtuple
import os
import re
import io
import base64
import jwt
import datetime
from math import *
from flask import Flask, render_template, url_for,  request, flash, session, redirect, abort, g
from flask import send_from_directory, jsonify, make_response
from FDataBase import FDataBase
from UserLogin import UserLogin
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, login_user, login_required, current_user, logout_user
from flask_login import UserMixin, login_user
from flask_cors import CORS
from werkzeug.utils import secure_filename
from io import BytesIO
from PIL import Image

app = Flask(__name__, static_folder='static', static_url_path='/static')
CORS(app)
app.config['SECRET_KEY'] ='dsajlsahds78dasda54cf'
SECRET_KEY = 'dsajlsahds78dasda54cf'
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads') 

login_manager = LoginManager(app)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

@login_manager.user_loader
def load_user(user_id):
    return UserLogin().fromDB(user_id, dbase)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ['jpg', 'jpeg', 'png']

def get_users_sorted_by_progress():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users ORDER BY progress DESC")
    users = cursor.fetchall()
    return users



#========================= База Данных MySQL ==============================

def connect_db():
    conn = mysql.connector.connect(
        host="127.0.0.1",
        user="root",
        password="admin_sfedu",
        database="g-portal",
        auth_plugin='caching_sha2_password',
        autocommit=True
    )
    conn.row_factory = lambda cursor, row: namedtuple('Row', [x[0] for x in cursor.description])(*row)
    return conn

def create_database():
    db = connect_db()
    with app.open_resource('sq_db.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()
    db.close()

def get_db():
    if not hasattr(g,'link_db'):
        g.link_db = connect_db()
    return g.link_db

dbase = None
@app.before_request
def before_request():
    global dbase
    db = get_db()
    dbase = FDataBase(db)

@app.teardown_appcontext
def close_db(error):
    if hasattr(g,'link_db'):
        g.link_db.close()

#============================================================================


#========================Проверка данных регистрации=========================
def is_valid_name(name):

    pattern = r"^[A-ZА-ЯЁ]+[\sa-zA-Zа-яёА-ЯЁ]+$"
    return bool(re.match(pattern, name))

def is_valid_surname(surname):

    pattern = r"^[A-ZА-ЯЁ]+[\sa-zA-Zа-яёА-ЯЁ]+$"
    return bool(re.match(pattern, surname))

def is_valid_patronymic(patronymic):

    pattern = r"^[A-ZА-ЯЁ]+[\sa-zA-Zа-яёА-ЯЁ]+$"
    return bool(re.match(pattern, patronymic))

def is_valid_login(login):

    pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return bool(re.match(pattern, login))

def is_valid_password(password):

    min_length = 8

    has_number = any(char.isdigit() for char in password)

    has_lowercase = any(char.islower() for char in password)

    has_uppercase = any(char.isupper() for char in password)

    has_special_char = any(char in "!@#$%^&*()" for char in password)

    return len(password) >= min_length and has_number and has_lowercase and has_uppercase and has_special_char
#============================================================================


#======================= Структура меню навигации ===========================

menu = [
    {
        'name': 'Главная',
        'url': 'index',
    },
    {
        'name': 'Таблица рейтинга',
        'url': 'leaderboard',
    },

    {
        'name': 'Все курсы',
        'url': 'contest',
    },
    {
        'name': 'Авторизация',
        'url': 'login',
    },
]

#============================================================================


#===============================Страницы сайта===============================


# ============================= Главная странца =============================
@app.route('/index', methods=['POST', 'GET'])
@app.route('/', methods=['POST', 'GET'])
def index():
    try:
        user_id = request.json.get('user_id')
        
        if not user_id:
            return jsonify({"error": "User ID not provided"}), 400

        user_data = dbase.getUser(user_id)
        if not user_data:
            return jsonify({"error": "User not found"}), 404

        user_profile = {
            'login': user_data[5],
            'name': user_data[1],
            'surname': user_data[2],
            'patronymic': user_data[3],
            'progress': user_data[4],
            'role': user_data[7]
        }

        photo_data = user_data[8]
        photo_url = "data:image/jpeg;base64," + base64.b64encode(photo_data).decode('utf-8')

        user_courses = dbase.get_user_courses(user_id)
        serializable_courses = [
            {
                'course_id': course[0],
                'course_name': course[1],
            } for course in user_courses
        ]

        response_data = {
            'user_data': user_profile,
            'photo_url': photo_url,
            'courses': serializable_courses,
        }
        
        return jsonify(response_data)

    except Exception as e:
        return jsonify({"error": "An error occurred while retrieving profile data."}), 500

# ======================== Страница таблицы рейтинга =========================

@app.route('/leaderboard', methods=['POST', 'GET'])
def leaderboard():
    try:
        active_user_id = request.json.get('active_user_id')
        
        users = get_users_sorted_by_progress()
        if not users:
            return jsonify({"error": "No users found"}), 404
        
        serializable_users = []
        photo_url = []

        for user in users:
            photo_data = user[8]
            if photo_data:
                photo_url.append("data:image/jpeg;base64," + base64.b64encode(photo_data).decode('utf-8'))
            else:
                photo_url.append(None)

            serializable_user = {
                'login': user[5],
                'name': user[1],
                'surname': user[2],
                'patronic': user[3],
                'progress': user[4],
            }
            serializable_users.append(serializable_user)

        active_user = None
        active_user_position = None

        if active_user_id:
            active_user_data = dbase.getUser(active_user_id)
            if active_user_data:
                active_user = {
                    'login': active_user_data[5],
                    'name': active_user_data[1],
                    'surname': active_user_data[2],
                    'patronic': active_user_data[3],
                    'progress': active_user_data[4],
                }

                active_user_login = active_user['login']
                active_user_position = next(
                    (idx for idx, user in enumerate(users, start=1) if user[5] == active_user_login),
                    None
                )

        response_data = {
            'users': serializable_users,
            'photo_url': photo_url,
            'active_user': active_user,
            'active_user_position': active_user_position,
        }
        
        return jsonify(response_data)

    except Exception as e:
        return jsonify({"error": "An error occurred while retrieving leaderboard data."}), 500





# ============================ Страница курсов ==============================
@app.route('/contest')
def contest():
    return render_template('contest.html', title = 'Курсы', menu = get_menu())

# @app.route('/course/<int:course_id>')
# @login_required
# def course_detail(course_id):
#     db = FDataBase(connect_db())
#     course = db.get_course_details(course_id)

#     if course:
#         return render_template('course_detail.html', course=course, menu=get_menu())
#     else:
#         return "Курс не найден", 404

# ========================== Страница авторизации ============================

@app.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        user = dbase.getUserByLogin(request.form.get('login'))
        if user and check_password_hash(user[6], request.form['psw']):
            userlogin = UserLogin().create(user)
            login_user(userlogin)

            user_id = str(user[0])
            print(f'User ID logged in: {user_id}')

            response = make_response(jsonify({
                'message': 'Login successful',
                'user': {
                    'id': user[0],
                    'login': user[5],
                    'name': user[1],
                    'surname': user[2],
                    'patronic': user[3],
                    'role': user[7]
                },
                'debug': {
                    'cookie_set': True,
                    'cookies': request.cookies
                }
            }))

            response.set_cookie('user_id', str(user[0]))
            response.set_cookie('user_role', str(user[7]))

            return response
        else:
            return jsonify({'message': 'Invalid login/password'}), 401
        
# ======================== Страница после выхода ============================
@app.route('/logout', methods=["POST"])
def logout():
    logout_user()
    response = make_response(jsonify({'message': 'Logout successful'}))
    response.delete_cookie('user_id')

    return response

# ========================== Страница профиля ===============================
@app.route('/profile', methods=['POST', 'GET'])
def profile():
    try:
        user_id = request.json.get('user_id')
        
        if not user_id:
            return jsonify({"error": "User ID not provided"}), 400
        user_courses = dbase.get_assigned_courses(user_id)
        user_data = dbase.getUser(user_id)
        if not user_data:
            return jsonify({"error": "User not found"}), 404
        user_profile = {
            'login': user_data[5],
            'name': user_data[1],
            'surname': user_data[2],
            'patronymic': user_data[3],
            'progress': user_data[4],
            'role': user_data[7]
        }
        photo_data = user_data[8]
        if (photo_data):
            photo_url = "data:image/jpeg;base64," + base64.b64encode(photo_data).decode('utf-8')
        else:
            photo_url = None
        user_courses = dbase.get_user_courses(user_id)
        serializable_courses = [
            {
                'course_id': course[0],
                'course_name': course[1],
            } for course in user_courses
        ]
        response_data = {
            'user_data': user_profile,
            'photo_url': photo_url,
            'courses': serializable_courses,
        }
        return jsonify(response_data)

    except Exception as e:
        return jsonify({"error": "An error occurred while retrieving profile data."}), 500

@app.route('/profile/add_courses', methods=['POST', 'GET'])
def add_courses():
    if request.method == 'POST':
        try:
            data_courses = request.json
            name_courses = data_courses.get('name')
            theme_courses = data_courses.get('theme')
            points_courses = data_courses.get('points')

            res_courses = dbase.addCourses(name_courses, theme_courses, points_courses)
            if res_courses:
                return jsonify({"message": "Courese successfully addication"}), 200
        
        except Exception as e:
            return jsonify({"error": "Internal server error"}), 500

@app.route("/profile/add_user", methods=['POST'])
def add_user():
    if request.method == 'POST':
        try:
            if not request.is_json:
                return jsonify({"error": "Request must be in JSON format"}), 400
            
            data = request.json
            if not data:
                return jsonify({"error": "No data provided"}), 400

            name = data.get('name')
            surname = data.get('surname')
            patronymic = data.get('patronymic')
            login = data.get('login')
            psw1 = data.get('password1')
            psw2 = data.get('password2')
            role = data.get('role')

            if None in [name, surname, patronymic, login, psw1, psw2, role]:
                return jsonify({"error": "Some required fields are missing"}), 400

            if (role == "Администратор"):
                role = 'admin'
            elif (role == "Менеджер"):
                role = 'manager'
            else:
                role = 'user'
            if is_valid_name(name) and is_valid_surname(surname) and is_valid_patronymic(patronymic) and is_valid_login(login) and is_valid_password(psw1) and psw1 == psw2:
                hash = generate_password_hash(psw1)
                res = dbase.addUser(name, surname, patronymic, 0, login, hash, role)
                if res:
                    return jsonify({"message": "User successfully registered"}), 200
                else:
                    return jsonify({"error": "User with this login already exists"}), 400
            else:
                return jsonify({"error": "Invalid data provided"}), 400

        except Exception as e:
            return jsonify({"error": "Internal server error"}), 500

    return jsonify({"error": "Invalid request method"}), 405





@app.route('/profile/view_users', methods=['GET', 'POST'])
def view_users():
    
    sorted_users = get_users_sorted_by_progress()
    if request.method == 'POST':
        user_id = request.form.get('user_id')
        if 'update_user' in request.form:
            name = request.form.get('name')
            surname = request.form.get('surname')
            patronymic = request.form.get('patronymic')
            login = request.form.get('login')
            role = request.form.get('role')
            progress = request.form.get('progress')
            
            dbase.update_user(user_id, name, surname, patronymic, login, role, progress)
            flash('Информация о пользователе обновлена', 'success')
        elif 'delete_user' in request.form:
            dbase.delete_user(user_id)
            flash('Пользователь удалён', 'success')

        return redirect(url_for('view_users'))

    return render_template('view_users.html', title='Пользователи', menu=get_menu(), users=sorted_users)

@app.route('/user_profile/<int:user_id>')
def view_user_profile(user_id):
    db = FDataBase(connect_db())
    user_login = UserLogin()
    
    user_login.fromDB(user_id, db)
    user_details = user_login.get_user_details(db)


    # photo_data = current_user.get_avatar()
    # if photo_data:
    #     import base64
    #     photo_url = "data:image/jpeg;base64," + base64.b64encode(photo_data).decode('utf-8')
    # else:
    #     photo_url = None

    assigned_courses = db.get_assigned_courses(user_id)

    completed_courses = db.get_completed_courses(user_id)

    available_courses = db.get_available_courses(user_id)

    if user_details:
        return render_template('user_profile.html', user=user_details, assigned_courses=assigned_courses, completed_courses=completed_courses, available_courses=available_courses)
    else:
        return "Пользователь не найден", 404
    
@app.route('/user_profile/<int:user_id>/add_course', methods=['POST'])
def add_course_to_user(user_id):
    course_id = request.form.get('course_id')

    if course_id:
        db = FDataBase(connect_db())
        db.assign_course_to_user(user_id, course_id)
    
    return redirect(url_for('view_user_profile', user_id=user_id))



@app.errorhandler(404)
def page_not_found(error):
    return render_template('page404.html', title = 'Страница не найдена', menu = get_menu()), 404
@app.errorhandler(401)
def unauthorized(error):
    return render_template('page401.html', title = 'Вы не авторизованы', menu = get_menu()), 401
#============================================================================

def get_user_info():
    if current_user.is_authenticated:
        return current_user.get_name(), current_user.get_surname()
    else:
        return None
    
def get_menu():
    new_menu = menu[:-1].copy()
    user_info = get_user_info()
    if user_info:
        new_menu.append({
            'name': f'{user_info[0]} {user_info[1]}',
            'url': 'profile',
        })
    else:
        new_menu.append({
            'name': 'Авторизация',
            'url': 'login',
        })
    return new_menu

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/uploads/<filename>')
def uploads(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/user_courses', methods=['GET'])
def get_user_courses():
    user_id = request.args.get('user_id')
    user_courses = dbase.get_assigned_courses(user_id)

    return jsonify(user_courses)


#=========================== Получение всех курсов ==========================
@app.route('/courses', methods=['GET'])
def get_courses():
    try:
        res = dbase.get_all_courses()

        courses = serialize_courses(dbase.get_all_courses())

    
        if courses:
            print (courses)
            return jsonify(courses)

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

def serialize_courses(courses):
    serializable_courses =  [
        {
        'id': course[0],
        'title': course[1],
        "type": course[2]
        }  for course in courses
    ]
    
    return serializable_courses

#=========================== Получение одного курса ==========================
@app.route('/course/<int:course_id>', methods = ['GET'])
def get_course(course_id):
    try:
      course = dbase.get_course_details(course_id)
    #   print(f'{course}')
      if course:
         serializable_course = {
            "title": course[1],
            "type": course[2],
            "steps": [],
         }
         
         return jsonify(serializable_course)

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500



#=========================== Запуск веб-приложения ==========================

if __name__ == '__main__':
    app.run(debug=True, port=5000)
    
#============================================================================